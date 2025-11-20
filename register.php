<?php
header('Content-Type: application/json');

// 1. Cấu hình Database & Kết nối CSDL
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Lỗi kết nối CSDL: ' . mysqli_connect_error()]);
    exit();
}
mysqli_set_charset($conn, "utf8mb4");

// 2. Lấy và Xử lý dữ liệu từ POST
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if (empty($data)) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu trống!']);
    mysqli_close($conn);
    exit();
}

$hoten = mysqli_real_escape_string($conn, $data['hoten']);
$sdt = mysqli_real_escape_string($conn, $data['sdt']);
$email = mysqli_real_escape_string($conn, $data['email']);
$gioitinh = mysqli_real_escape_string($conn, $data['gioitinh']);
$matkhau = mysqli_real_escape_string($conn, $data['matkhau']); 

// Tự động tạo memberId (Thay vì idaccount)
$memberId = 'MEM' . str_pad(rand(1, 99999999), 8, '0', STR_PAD_LEFT); 

// 3. Kiểm tra Email/SĐT đã tồn tại chưa
$check_sql = "SELECT memberId FROM Account WHERE email = '$email' OR sdt = '$sdt'";
$check_result = mysqli_query($conn, $check_sql);

if (mysqli_num_rows($check_result) > 0) {
    echo json_encode(['success' => false, 'message' => 'Email hoặc Số điện thoại đã được đăng ký!']);
    mysqli_close($conn);
    exit();
}

// 4. Chuẩn bị câu lệnh INSERT
// QUAN TRỌNG: Phải INSERT vào bảng gymMembers TRƯỚC (vì Account tham chiếu đến gymMembers)
// Mặc định chưa thanh toán (0) và chưa có gói tập
$sql_member = "INSERT INTO gymMembers (id, hoten, gioitinh, sdt, email, thanhtoan) 
               VALUES ('$memberId', '$hoten', '$gioitinh', '$sdt', '$email', 0)";

if (!mysqli_query($conn, $sql_member)) {
    echo json_encode(['success' => false, 'message' => 'Lỗi khi tạo thông tin thành viên: ' . mysqli_error($conn)]);
    mysqli_close($conn);
    exit();
}

// Sau đó INSERT vào bảng Account
$sql = "INSERT INTO Account (memberId, hoten, sdt, email, gioitinh, matkhau) 
        VALUES ('$memberId', '$hoten', '$sdt', '$email', '$gioitinh', '$matkhau')";

// 5. Thực thi lệnh & Đóng kết nối
if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'message' => 'Đăng ký thành công!']);
} else {
    // Nếu lỗi insert Account, nên xóa member vừa tạo để tránh rác (Rollback thủ công)
    mysqli_query($conn, "DELETE FROM gymMembers WHERE id = '$memberId'");
    echo json_encode(['success' => false, 'message' => 'Không thể tạo tài khoản. Vui lòng kiểm tra lại. ' . mysqli_error($conn)]);
}

mysqli_close($conn);
?>