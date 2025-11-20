<?php
// Thiết lập header để trả về JSON
header('Content-Type: application/json');

// Bắt đầu session để lấy ID thành viên đăng nhập
session_start();

// Thông tin kết nối CSDL
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => "Kết nối CSDL thất bại: " . $conn->connect_error]);
    exit();
}

// Thiết lập mã hóa UTF-8
$conn->set_charset("utf8mb4");

// Lấy dữ liệu từ POST request
$hoten = $_POST['hoten'] ?? 'Khách ẩn danh';
$noidung = $_POST['noidung'] ?? '';
$sao = isset($_POST['sao']) ? intval($_POST['sao']) : 0;

// Xử lý memberId
$memberId = null;
if (isset($_SESSION['memberId']) && !empty($_SESSION['memberId'])) {
    $memberId = $_SESSION['memberId'];
}
// Nếu không có session, memberId sẽ là NULL (để tránh lỗi Foreign Key với ID rác)

// Kiểm tra dữ liệu bắt buộc
if (empty($noidung) || $sao < 1 || $sao > 5) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ. Vui lòng nhập nội dung và chọn số sao (1-5).']);
    $conn->close();
    exit();
}

// Hàm tạo ID duy nhất cho Review
function generateUniqueReviewId($conn) {
    do {
        $id = 'REV' . rand(1000, 9999); 
        $check = $conn->query("SELECT id FROM gymReviews WHERE id = '$id'");
    } while ($check->num_rows > 0);
    return $id;
}
$reviewId = generateUniqueReviewId($conn);

// Chuẩn bị câu lệnh INSERT
$sql = "INSERT INTO gymReviews (id, memberId, hoten, noidung, sao) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Lỗi chuẩn bị câu lệnh SQL: ' . $conn->error]);
    $conn->close();
    exit();
}

// Bind tham số
// ssssi: id (string), memberId (string/null), hoten (string), noidung (string), sao (int)
$stmt->bind_param("ssssi", $reviewId, $memberId, $hoten, $noidung, $sao);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Đánh giá đã được lưu thành công!']);
} else {
    // Nếu lỗi vẫn xảy ra (ví dụ memberId không được NULL), thông báo rõ
    echo json_encode(['success' => false, 'message' => 'Lỗi khi lưu đánh giá: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>