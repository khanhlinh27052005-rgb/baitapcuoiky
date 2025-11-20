<?php
// admin/load_from_mysql.php
header('Content-Type: application/json');

// Kết nối MySQL
$conn = mysqli_connect("localhost", "root", "", "GymDB");
if (!$conn) {
    echo json_encode(['error' => 'Kết nối MySQL thất bại']);
    exit;
}
mysqli_set_charset($conn, "utf8mb4");

// Danh sách các bảng cần lấy dữ liệu
$tables = [
    'gymMembers',
    'gymTrainers',
    'gymSchedules',
    'gymPackages',
    'gymReviews'
];

$result = [];

foreach ($tables as $table) {
    $sql = "SELECT * FROM `$table`";
    $query = mysqli_query($conn, $sql);
    
    $data = [];
    while ($row = mysqli_fetch_assoc($query)) {
        $data[] = $row;
    }
    
    $result[$table] = $data;
}

echo json_encode($result);
mysqli_close($conn);
?>