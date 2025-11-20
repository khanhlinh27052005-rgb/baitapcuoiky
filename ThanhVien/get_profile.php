<?php
// Bắt đầu session để truy cập/kiểm tra memberId
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Thiết lập header để trả về JSON
header('Content-Type: application/json');

// Cấu hình Database
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB";

$response = ['success' => false, 'message' => 'Lỗi không xác định', 'data' => null];

// TẠO KẾT NỐI
$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    $response['message'] = 'Kết nối thất bại: ' . $conn->connect_error;
    echo json_encode($response);
    exit;
}
$conn->set_charset("utf8mb4");

// ---------------------------------------------------------------
// CHỈ DÙNG ĐỂ TEST! CẦN XÓA KHI LÀM THẬT (Thay bằng logic Đăng nhập)
if (!isset($_SESSION['memberId'])) {
    $_SESSION['memberId'] = 'M001'; // ID thành viên ví dụ
}
// ---------------------------------------------------------------

if (!isset($_SESSION['memberId'])) {
    $response['message'] = 'Chưa đăng nhập. Vui lòng đăng nhập để xem thông tin.';
    $conn->close();
    echo json_encode($response);
    exit;
}

$memberId = $_SESSION['memberId'];

// Lấy thông tin từ bảng Account
$sql = "SELECT hoten, gioitinh, sdt, email FROM Account WHERE memberId = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    $response['message'] = 'Lỗi chuẩn bị truy vấn SQL: ' . $conn->error;
} else {
    $stmt->bind_param("s", $memberId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $profile = $result->fetch_assoc();
        $response['success'] = true;
        $response['message'] = 'Tải dữ liệu thành công.';
        $response['data'] = $profile;
    } else {
        $response['message'] = 'Không tìm thấy hồ sơ thành viên.';
    }
    $stmt->close();
}

$conn->close();
echo json_encode($response);
?>