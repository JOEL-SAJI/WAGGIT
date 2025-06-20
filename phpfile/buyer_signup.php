<?php
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

// Process signup form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $first_name = $_POST["first_name"];
    $last_name = $_POST["last_name"];
    $email = $_POST["email"];
    $username = $_POST["username"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    $user_type = "buyer"; // Hardcoded user type for buyer registration
    
    // Validate input
    if (empty($username) || empty($password) || empty($confirm_password) || empty($email) || empty($first_name) || empty($last_name)) {
        header("Location: buyer_signup.html?error=Please fill in all fields");
        exit();
    }
    
    // Check if passwords match
    if ($password !== $confirm_password) {
        header("Location: buyer_signup.html?error=Passwords do not match");
        exit();
    }
    
    // Check if username already exists
    $check_stmt = $conn->prepare("SELECT Username FROM Users WHERE Username = ?");
    $check_stmt->bind_param("s", $username);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows > 0) {
        header("Location: buyer_signup.html?error=Username already exists");
        $check_stmt->close();
        exit();
    }
    $check_stmt->close();
    
    // Check if email already exists
    $check_email_stmt = $conn->prepare("SELECT Email FROM Users WHERE Email = ?");
    $check_email_stmt->bind_param("s", $email);
    $check_email_stmt->execute();
    $check_email_result = $check_email_stmt->get_result();
    
    if ($check_email_result->num_rows > 0) {
        header("Location: buyer_signup.html?error=Email already exists");
        $check_email_stmt->close();
        exit();
    }
    $check_email_stmt->close();
    
    // Insert new user
    $insert_stmt = $conn->prepare("INSERT INTO Users (Username, Password, Email, FirstName, LastName, UserType) VALUES (?, ?, ?, ?, ?, ?)");
    $insert_stmt->bind_param("ssssss", $username, $password, $email, $first_name, $last_name, $user_type);
    
    if ($insert_stmt->execute()) {
        // Registration successful
        header("Location: buyer_login.html?success=Account created successfully! Please login.");
        exit();
    } else {
        // Registration failed
        header("Location: buyer_signup.html?error=Registration failed. Please try again.");
        exit();
    }
    
    $insert_stmt->close();
}

$conn->close();
?>
