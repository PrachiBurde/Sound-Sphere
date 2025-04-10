<?php
// search.php - Backend search handler
// Enable CORS (for development)
header("Access-Control-Allow-Origin: *");

// Check if a file was uploaded
if (isset($_FILES['audioFile']) && $_FILES['audioFile']['error'] === UPLOAD_ERR_OK) {
    // Define upload directory
    $uploadDir = '../uploads/';
    
    // Create directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Get file info
    $fileName = basename($_FILES['audioFile']['name']);
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    // Only allow audio files
    $allowedExts = ['mp3', 'wav', 'ogg'];
    if (!in_array($fileExt, $allowedExts)) {
        echo json_encode(['success' => false, 'message' => 'Only MP3, WAV, and OGG files are allowed']);
        exit;
    }
    
    // Generate unique filename
    $newFileName = uniqid() . '.' . $fileExt;
    $uploadPath = $uploadDir . $newFileName;
    
    // Move uploaded file
    if (move_uploaded_file($_FILES['audioFile']['tmp_name'], $uploadPath)) {
        // Return success response with the file path
        echo json_encode([
            'success' => true, 
            'filePath' => 'uploads/' . $newFileName,
            'fileName' => $fileName
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No file uploaded or upload error']);
}

// Database connection
function connectToDatabase() {
    $servername = "localhost";
    $username = "your_username";
    $password = "your_password";
    $dbname = "sonicfusion";
    
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        die(json_encode([
            'error' => 'Connection failed: ' . $conn->connect_error
        ]));
    }
    
    return $conn;
}

// Process search request
function processSearch($query) {
    // Validate input
    if (empty($query) || strlen($query) < 2) {
        return json_encode([
            'error' => 'Search query too short',
            'results' => []
        ]);
    }
    
    // Connect to database
    $conn = connectToDatabase();
    
    // Prepare query (using prepared statements to prevent SQL injection)
    $stmt = $conn->prepare("SELECT id, title as name, artist, album_art as image 
                           FROM songs 
                           WHERE title LIKE ? OR artist LIKE ? 
                           ORDER BY popularity DESC 
                           LIMIT 10");
    
    // Add wildcards to search query
    $searchParam = "%" . $query . "%";
    $stmt->bind_param("ss", $searchParam, $searchParam);
    
    // Execute query
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Format results
    $searchResults = [];
    while ($row = $result->fetch_assoc()) {
        $searchResults[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'artist' => $row['artist'],
            'image' => $row['image']
        ];
    }
    
    // Close connection
    $stmt->close();
    $conn->close();
    
    // Return results as JSON
    return json_encode([
        'success' => true,
        'results' => $searchResults
    ]);
}

// Handle incoming requests
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['query'])) {
    // Set content type to JSON
    header('Content-Type: application/json');
    
    // Process search and return results
    echo processSearch($_GET['query']);
} else {
    // Invalid request
    header('HTTP/1.1 400 Bad Request');
    echo json_encode([
        'error' => 'Invalid request. Please provide a search query.'
    ]);
}
?>