<?php
header('Content-Type: application/json');

// 1. Cấu hình Database & Kết nối CSDL
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

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

// Kiểm tra dữ liệu bắt buộc từ client
if (empty($data['memberId']) || empty($data['goitap']) || !isset($data['thanhtoan']) || empty($data['ngaybatdau']) || empty($data['ngayketthuc'])) {
    http_response_code(400); // Lỗi Client Request
    echo json_encode(['success' => false, 'message' => "Thiếu dữ liệu cần thiết (memberId, goitap, thanhtoan, ngaybatdau, ngayketthuc)."]);
    mysqli_close($conn);
    exit;
}

// Gán biến và Sanitization
$memberId = mysqli_real_escape_string($conn, $data['memberId']);
$goitap = mysqli_real_escape_string($conn, $data['goitap']);
$thanhtoan = (int)$data['thanhtoan']; 
$ngaybatdau = mysqli_real_escape_string($conn, $data['ngaybatdau']);
$ngayketthuc = mysqli_real_escape_string($conn, $data['ngayketthuc']);

// 3. Kiểm tra memberId và Cập nhật vào bảng gymMembers
// Lấy tổng thanh toán hiện tại của thành viên
$sql_check = "SELECT thanhtoan FROM gymMembers WHERE id = '$memberId'"; 
$result_check = mysqli_query($conn, $sql_check);

if (mysqli_num_rows($result_check) > 0) {
    $row = mysqli_fetch_assoc($result_check);
    $old_thanhtoan = $row['thanhtoan'];
    // Cộng dồn tổng thanh toán cũ và mới
    $new_total_thanhtoan = $old_thanhtoan + $thanhtoan; 

    // UPDATE thông tin gói tập và thanh toán
    $sql = "UPDATE gymMembers SET 
            goitap = '$goitap', 
            ngaybatdau = '$ngaybatdau', 
            ngayketthuc = '$ngayketthuc', 
            thanhtoan = $new_total_thanhtoan 
            WHERE id = '$memberId'"; 
    $message_success = "Gia hạn/đăng ký gói tập thành công!";
} else {
    // Lỗi nếu thành viên đã đăng nhập nhưng không có trong DB
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => "Lỗi: Mã thành viên $memberId không tồn tại trong cơ sở dữ liệu. Vui lòng liên hệ Admin."]);
    mysqli_close($conn);
    exit();
}

// 4. Thực thi lệnh & Đóng kết nối
if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'message' => $message_success, 'memberId' => $memberId]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật gói tập: ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>