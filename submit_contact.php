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

// 2. Lấy và Xử lý dữ liệu từ POST (JSON input)
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Kiểm tra dữ liệu bắt buộc
if (empty($data['hoten']) || empty($data['sdt']) || empty($data['noidung'])) {
    http_response_code(400); // Lỗi Client Request
    echo json_encode(['success' => false, 'message' => "Vui lòng điền đầy đủ Họ tên, Số điện thoại và Nội dung."]);
    mysqli_close($conn);
    exit;
}

// Gán biến và Sanitization (tránh SQL Injection)
$hoten = mysqli_real_escape_string($conn, $data['hoten']);
$sdt = mysqli_real_escape_string($conn, $data['sdt']);
// Địa chỉ có thể NULL, nên kiểm tra trước khi sử dụng
$diachi = isset($data['diachi']) ? mysqli_real_escape_string($conn, $data['diachi']) : NULL;
$noidung = mysqli_real_escape_string($conn, $data['noidung']);

// 3. Chuẩn bị câu lệnh INSERT vào bảng gymContacts
$sql = "INSERT INTO gymContacts (hoten, sdt, diachi, noidung) 
        VALUES ('$hoten', '$sdt', ";

// Thêm diachi (NULL nếu không có, hoặc giá trị đã sanitize)
if ($diachi !== NULL && $diachi !== '') {
    $sql .= "'$diachi', ";
} else {
    $sql .= "NULL, ";
}

$sql .= "'$noidung')";


// 4. Thực thi lệnh & Đóng kết nối
if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'message' => 'Yêu cầu liên hệ của bạn đã được gửi thành công!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu thông tin liên hệ: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>