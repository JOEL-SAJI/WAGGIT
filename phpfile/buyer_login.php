<?php
// Start session
session_start();

// Database connection
$servername = "localhost";
$username = "root"; // Default MySQL username, change if needed
$password = ""; // Default MySQL password is empty, change if needed
$dbname = "Waggit";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process login form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Validate input
    if (empty($username) || empty($password)) {
        header("Location: buyer_login.html?error=Please fill in all fields");
        exit();
    }
    
    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT Username, Password, UserType FROM Users WHERE Username = ? AND UserType = 'buyer'");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        
        // Verify password (using password_verify if passwords are hashed)
        if ($password === $row["Password"]) {
            // Password is correct, create session
            $_SESSION["username"] = $username;
            $_SESSION["user_type"] = "buyer";
            
            // Redirect to buyer dashboard
            header("Location: buyer_dashboard.html");
            exit();
        } else {
            // Invalid password
            header("Location: buyer_login.html?error=Invalid username or password");
            exit();
        }
    } else {
        // User not found
        header("Location: buyer_login.html?error=Invalid username or password");
        exit();
    }
    
    $stmt->close();
}

$conn->close();
?>
