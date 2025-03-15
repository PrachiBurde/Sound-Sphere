<?php
// search.php - Backend search handler

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