<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 
$conn = mysqli_connect($host, $user, $pass, $dbname);
$memberId = 'MEM1191474';
$result = mysqli_query($conn, "SELECT * FROM gymMembers WHERE id = '$memberId'");
if ($row = mysqli_fetch_assoc($result)) {
    print_r($row);
}
mysqli_close($conn);
?>
