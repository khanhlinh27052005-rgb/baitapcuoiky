<?php
// 1. Get a valid member ID
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 
$conn = mysqli_connect($host, $user, $pass, $dbname);
$result = mysqli_query($conn, "SELECT id FROM gymMembers LIMIT 1");
$memberId = '';
if ($row = mysqli_fetch_assoc($result)) {
    $memberId = $row['id'];
}
mysqli_close($conn);

if (!$memberId) {
    die("No members found in database to test with.");
}

echo "Testing with Member ID: " . $memberId . "\n";

// 2. Call the API
$url = 'http://localhost/Gym1/ThanhVien/get_member_data.php';
$data = array('memberId' => $memberId);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    echo "Error calling API";
} else {
    echo "API Response:\n";
    echo $result;
}
?>
