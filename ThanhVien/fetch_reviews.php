<?php
// Thiết lập header để trả về JSON
header('Content-Type: application/json');

// Thông tin kết nối CSDL
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    // Trả về mảng rỗng và lỗi nếu kết nối thất bại
    // Thay vì chỉ [] nên thêm message để dễ debug
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]); 
    exit();
}

$conn->set_charset("utf8mb4");

// Truy vấn lấy tất cả đánh giá, sắp xếp theo ID giảm dần (đánh giá mới nhất lên đầu)
$sql = "SELECT hoten, noidung, sao FROM gymReviews ORDER BY id DESC";
$result = $conn->query($sql);

$reviews = [];
if ($result) {
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
} else {
    // Trường hợp truy vấn SQL thất bại (ví dụ: bảng không tồn tại)
    // Cần trả về một mảng rỗng để JS không bị lỗi JSON
    // echo json_encode(['error' => 'Query failed: ' . $conn->error]); // Dùng cho debug
}

// Trả về dữ liệu dưới dạng JSON
echo json_encode($reviews);

$conn->close();
// KHÔNG CÓ THẺ ĐÓNG ?>