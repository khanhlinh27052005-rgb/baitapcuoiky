<?php
$host = "localhost";
$user = "root";
$pass = "";

// Kết nối MySQL
$conn = mysqli_connect($host, $user, $pass);
if (!$conn) {
    die("Kết nối thất bại: " . mysqli_connect_error());
}

echo "Kết nối MySQL thành công!<br>";

// Tạo Database
$sql = "CREATE DATABASE IF NOT EXISTS GymDB";
if (mysqli_query($conn, $sql)) {
    echo "Tạo Database GymDB thành công!<br>";
} else {
    die("Lỗi tạo DB: " . mysqli_error($conn));
}

mysqli_select_db($conn, "GymDB");
mysqli_set_charset($conn, "utf8mb4");

// === TẠO BẢNG ===
$tables = "

-- Bảng Thành viên (gymMembers) - LƯU ID GỐC (PRIMARY KEY)
CREATE TABLE IF NOT EXISTS gymMembers (
    id VARCHAR(10) PRIMARY KEY,
    hoten VARCHAR(100) NOT NULL,
    gioitinh ENUM('Nam','Nữ') DEFAULT 'Nam',
    sdt VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    goitap VARCHAR(50),
    ngaybatdau DATE, -- Đã đổi sang DATE để chuẩn hóa
    ngayketthuc DATE, -- Đã đổi sang DATE để chuẩn hóa
    thanhtoan INT DEFAULT 0
);

-- Bảng HLV (gymTrainers) - Giữ nguyên
CREATE TABLE IF NOT EXISTS gymTrainers (
    id VARCHAR(10) PRIMARY KEY,
    hoten VARCHAR(100) NOT NULL,
    sdt VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    goitap VARCHAR(50),
    thu VARCHAR(20),
    ca VARCHAR(10),
    kinhnghiem TEXT,
    thanhtich TEXT
);

-- Bảng Lịch (gymSchedules) - THÊM FOREIGN KEY (memberId)
CREATE TABLE IF NOT EXISTS gymSchedules (
    id VARCHAR(10) PRIMARY KEY,
    type VARCHAR(20),
    goitap VARCHAR(50),
    thu VARCHAR(20),
    ca VARCHAR(20),
    trainerId VARCHAR(10),
    memberId VARCHAR(10),
    -- THÊM RÀNG BUỘC FOREIGN KEY
    FOREIGN KEY (memberId) REFERENCES gymMembers(id) ON DELETE CASCADE,
    FOREIGN KEY (trainerId) REFERENCES gymTrainers(id) ON DELETE SET NULL
);

-- Bảng Gói tập (gymPackages) - Giữ nguyên
CREATE TABLE IF NOT EXISTS gymPackages (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    quyenloi TEXT,
    loiich TEXT,
    hlv VARCHAR(100)
);

-- Bảng Đánh giá (gymReviews) - THÊM FOREIGN KEY (memberId)
CREATE TABLE IF NOT EXISTS gymReviews (
    id VARCHAR(10) PRIMARY KEY,
    memberId VARCHAR(10),
    hoten VARCHAR(100),
    noidung TEXT,
    sao INT CHECK (sao >= 1 AND sao <= 5),
    -- THÊM RÀNG BUỘC FOREIGN KEY
    FOREIGN KEY (memberId) REFERENCES gymMembers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS gymContacts (
    contactId INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính tự động tăng
    hoten VARCHAR(100) NOT NULL,
    sdt VARCHAR(15) NOT NULL,
    diachi VARCHAR(255) NULL,
    noidung TEXT NOT NULL,
    thoigian_gui TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Thời gian gửi
);
";
 

if (mysqli_multi_query($conn, $tables)) {
    do {
        if ($result = mysqli_store_result($conn)) {
            mysqli_free_result($result);
        }
    } while (mysqli_next_result($conn));
    echo "<strong>Tạo bảng thành công!</strong><br>";
} else {
    echo "Lỗi tạo bảng: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
