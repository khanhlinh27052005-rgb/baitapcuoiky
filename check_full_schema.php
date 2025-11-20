<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Table: gymMembers\n";
$result = mysqli_query($conn, "SHOW COLUMNS FROM gymMembers");
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo $row['Field'] . "\n";
    }
}

echo "\nTable: gymschedules\n";
$result = mysqli_query($conn, "SHOW COLUMNS FROM gymschedules");
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo $row['Field'] . "\n";
    }
}

mysqli_close($conn);
?>
