<?php
// BỘ THAM SỐ KẾT NỐI DATABASE
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

// Thiết lập header để trả về JSON
header('Content-Type: application/json');

// 1. THIẾT LẬP KẾT NỐI
$conn = mysqli_connect($host, $user, $pass, $dbname);

// Kiểm tra kết nối
if (!$conn) {
    die(json_encode([
        'success' => false, 
        'message' => "LỖI: Kết nối database thất bại: " . mysqli_connect_error()
    ]));
}

// Thiết lập mã hóa UTF-8
mysqli_set_charset($conn, "utf8mb4");

// 2. GIẢ LẬP ID THÀNH VIÊN
// SỬ DỤNG ID TỪ DỮ LIỆU CỦA BẠN ĐỂ THỬ NGHIỆM
$member_id = "AC72396475"; 

// 3. TRUY VẤN DỮ LIỆU
$sql = "
SELECT
    m.goitap AS TenGoiTap,
    m.thanhtoan AS TrangThaiThanhToanInt,
    m.ngaybatdau AS NgayBatDau,
    m.ngayketthuc AS NgayKetThuc,
    p.id AS MaGoiTap, 
    p.price AS GiaGoiTap
FROM
    gymMembers m
LEFT JOIN
    gymPackages p ON m.goitap = p.name  -- Sử dụng LEFT JOIN
WHERE
    m.id = '$member_id';
";

$result = mysqli_query($conn, $sql);

$packages_data = [];

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        
        while ($row = mysqli_fetch_assoc($result)) {
            // Xử lý giá trị NULL nếu gói tập không khớp (do LEFT JOIN)
            $maGoi = $row['MaGoiTap'] ?? 'N/A';
            $giaGoi = $row['GiaGoiTap'] ?? 0;

            // Chuyển đổi trạng thái thanh toán INT (0, 1) sang chuỗi
            $status_text = ($row['TrangThaiThanhToanInt'] == 1) ? 'Đã thanh toán' : 'Chưa thanh toán';
            
            $packages_data[] = [
                'MaGoiTap' => $maGoi,
                'TenGoiTap' => $row['TenGoiTap'],
                'GiaGoiTap' => number_format($giaGoi) . ' VNĐ',
                'NgayBatDau' => $row['NgayBatDau'],
                'NgayKetThuc' => $row['NgayKetThuc'],
                'TrangThaiThanhToan' => $status_text, 
            ];
        }
    }
    
    // Gửi dữ liệu dưới dạng JSON
    echo json_encode([
        'success' => true,
        'data' => $packages_data
    ]);

    mysqli_free_result($result);

} else {
    // Xử lý lỗi truy vấn SQL
    echo json_encode([
        'success' => false, 
        'message' => "LỖI TRUY VẤN: " . mysqli_error($conn)
    ]);
}

// 4. ĐÓNG KẾT NỐI
mysqli_close($conn);

?>