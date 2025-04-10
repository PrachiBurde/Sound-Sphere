<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
$email = $_POST['email'];
}
// Function to open a database connection
function openconnection() {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpassword = ""; // Replace with your actual DB password
    $db = "music_app";
    $conn = new mysqli($dbhost, $dbuser, $dbpassword, $db) or die("Connection Failed: " . $conn->error);
    return $conn;
}

function closeconnection($conn) {
    $conn->close();
}
$time = date("Y-m-d");
$date = date("H:i:s");

$conn = openconnection();

// Use prepared statements to prevent SQL injection
$sql = $conn->prepare("INSERT INTO `contact_form`(`E-Mail`) VALUES ('$email')");

//$sql->bind_param( $name, $email, $phone, $adress, $comment);

if ($sql->execute()) {
    echo " We'll keep you updated with the latest music news and releases.";
} else {
    echo "There is an error with the insert: " . $conn->error;
}

closeconnection($conn);
?>


