<?php
// path_to_your_php_script.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $email = $data['email'];

    // Database connection (you need to replace these with your actual database credentials)

    $conn = new mysqli('localhost', 'root', '', 'php_otp');

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    $sql = "INSERT INTO table (name, email) VALUES ('$name', '$email')";

    if ($conn->query($sql) === true) {
        echo json_encode(['message' => 'Data added successfully']);
    } else {
        echo json_encode(['message' => 'Error: ' . $sql . '<br>' . $conn->error]);
    }

    $conn->close();
}
?>
