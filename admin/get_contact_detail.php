<?php
header('Content-Type: application/json');

// 1. Cấu hình Database & Kết nối CSDL
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; // Tên Database

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    http_response_code(500); // Lỗi Server
    echo json_encode(['success' => false, 'message' => 'Lỗi kết nối CSDL: ' . mysqli_connect_error()]);
    exit();
}
mysqli_set_charset($conn, "utf8mb4");

// 2. Truy vấn dữ liệu từ bảng gymContacts
$sql = "SELECT * FROM gymContacts ORDER BY thoigian_gui DESC";
$result = mysqli_query($conn, $sql);

if ($result) {
    $contacts = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $contacts[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $contacts]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lấy danh sách liên hệ: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>
