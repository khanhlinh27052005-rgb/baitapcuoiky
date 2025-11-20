<?php
// Bắt đầu session để truy cập/kiểm tra memberId
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Cấu hình Database
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB";

// Thiết lập header để trả về JSON
header('Content-Type: application/json');
$response = ['success' => false, 'message' => 'Lỗi không xác định'];

// Kiểm tra phương thức
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Phương thức không hợp lệ.';
    echo json_encode($response);
    exit;
}

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
    $_SESSION['memberId'] = 'M001'; 
}
// ---------------------------------------------------------------

if (!isset($_SESSION['memberId'])) {
    $response['message'] = 'Chưa đăng nhập. Vui lòng đăng nhập để cập nhật.';
    $conn->close();
    echo json_encode($response);
    exit;
}

$memberId = $_SESSION['memberId'];

// Lấy dữ liệu từ form
$hoten = trim($_POST['hoten'] ?? '');
$email = trim($_POST['email'] ?? '');
$sdt = trim($_POST['sdt'] ?? '');
$gioitinh = trim($_POST['gioitinh'] ?? '');

// Kiểm tra dữ liệu đầu vào cơ bản
if (empty($hoten) || empty($email) || empty($sdt)) {
    $response['message'] = 'Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại.';
    $conn->close();
    echo json_encode($response);
    exit;
}

$conn->begin_transaction(); // Bắt đầu giao dịch để đảm bảo 2 lệnh UPDATE thành công đồng thời

try {
    // 1. Cập nhật bảng Account
    $sql_account = "UPDATE Account SET hoten = ?, email = ?, sdt = ?, gioitinh = ? WHERE memberId = ?";
    $stmt_account = $conn->prepare($sql_account);
    $stmt_account->bind_param("sssss", $hoten, $email, $sdt, $gioitinh, $memberId);
    $stmt_account->execute();
    
    // 2. Cập nhật bảng gymMembers (Đồng bộ thông tin)
    $sql_member = "UPDATE gymMembers SET hoten = ?, gioitinh = ?, sdt = ?, email = ? WHERE id = ?";
    $stmt_member = $conn->prepare($sql_member);
    $stmt_member->bind_param("sssss", $hoten, $gioitinh, $sdt, $email, $memberId);
    $stmt_member->execute();

    $conn->commit(); // Hoàn tất giao dịch
    
    $response['success'] = true;
    $response['message'] = 'Cập nhật thông tin thành công!';
    
} catch (mysqli_sql_exception $exception) {
    $conn->rollback(); // Hoàn tác nếu có lỗi xảy ra
    $response['message'] = 'Lỗi CSDL: ' . $exception->getMessage();
}

// Đóng kết nối
if (isset($stmt_account)) $stmt_account->close();
if (isset($stmt_member)) $stmt_member->close();
$conn->close();

echo json_encode($response);
?>