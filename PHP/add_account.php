<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; // Tên Database bạn đã tạo

// 1. Kết nối MySQL
$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
}

echo "Kết nối database **$dbname** thành công!<br>";

// Chọn Database và thiết lập charset
mysqli_select_db($conn, $dbname);
mysqli_set_charset($conn, "utf8mb4");

// 2. Lệnh SQL tạo bảng Account
$sql_create_account = "
-- Bảng Account - Sử dụng memberId làm PRIMARY KEY và FOREIGN KEY
CREATE TABLE IF NOT EXISTS Account (
    memberId VARCHAR(10) PRIMARY KEY,
    hoten VARCHAR(100) NOT NULL,
    sdt VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE,
    gioitinh ENUM('Nam','Nữ'),
    matkhau VARCHAR(255) NOT NULL,
    
    -- ĐỒNG NHẤT ID: memberId là khóa ngoại tham chiếu đến gymMembers(id)
    FOREIGN KEY (memberId) REFERENCES gymMembers(id) ON DELETE CASCADE
);";

// 3. Thực thi lệnh SQL
if (mysqli_query($conn, $sql_create_account)) {
    echo "<strong>Tạo bảng Account thành công!</strong><br>";
} else {
    echo "Lỗi khi tạo bảng Account: " . mysqli_error($conn);
}

// 4. Đóng kết nối
mysqli_close($conn);
?>