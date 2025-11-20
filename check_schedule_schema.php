<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$result = mysqli_query($conn, "SHOW COLUMNS FROM gymschedule");
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo $row['Field'] . "\n";
    }
} else {
    echo "Error: " . mysqli_error($conn);
}
mysqli_close($conn);
?>
