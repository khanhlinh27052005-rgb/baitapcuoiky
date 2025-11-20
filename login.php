<?php
// BƯỚC 1: KHỞI ĐỘNG SESSION
session_start();

header('Content-Type: application/json');

// 2. Cấu hình Database
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

// 3. Kết nối CSDL
$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Lỗi kết nối CSDL.']);
    exit();
}
mysqli_set_charset($conn, "utf8mb4");

// 4. Lấy dữ liệu từ POST
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if (empty($data)) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu trống.']);
    mysqli_close($conn);
    exit();
}

$id_input = mysqli_real_escape_string($conn, $data['id']); // Email hoặc SĐT
$pass_input = mysqli_real_escape_string($conn, $data['pass']); // Mật khẩu thô

// 5. Truy vấn CSDL
// LƯU Ý: HỆ THỐNG CỦA BẠN ĐANG LƯU MẬT KHẨU THÔ! ĐÂY LÀ KHÔNG AN TOÀN.
$sql = "SELECT memberId, hoten, email, matkhau FROM Account 
         WHERE (email = '$id_input' OR sdt = '$id_input') 
         AND matkhau = '$pass_input'"; 

$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) === 1) {
    // Đăng nhập thành công
    $user = mysqli_fetch_assoc($result);

    // BƯỚC 6: LƯU ID VÀO SESSION
    $_SESSION['memberId'] = $user['memberId'];
    $_SESSION['idaccount'] = $user['memberId']; // Giữ lại để tương thích ngược nếu cần
    
    // BƯỚC 7: Trả về phản hồi JSON
    unset($user['matkhau']); 

    echo json_encode([
        'success' => true,
        'message' => 'Đăng nhập thành công!',
        'user' => $user
    ]);
} else {
    // Đăng nhập thất bại
    echo json_encode([
        'success' => false,
        'message' => 'Sai Email/SĐT hoặc Mật khẩu.'
    ]);
}

// 8. Đóng kết nối
mysqli_close($conn);
?>