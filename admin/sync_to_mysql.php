<?php
// admin/sync_to_mysql.php
header('Content-Type: application/json');

// THÔNG TIN KẾT NỐI CSDL
$conn = mysqli_connect("localhost", "root", "", "GymDB");

if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Kết nối CSDL thất bại: ' . mysqli_connect_error()]);
    exit;
}
mysqli_set_charset($conn, "utf8mb4");

// Nhận dữ liệu từ JS (JSON POST body)
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'Dữ liệu nhận được không hợp lệ']);
    exit;
}

// === SỬA LỖI 1: VÔ HIỆU HÓA HOÀN TOÀN KIỂM TRA KHÓA NGOẠI TRONG PHIÊN NÀY ===
mysqli_query($conn, "SET FOREIGN_KEY_CHECKS = 0");

$tables = ['gymMembers', 'gymTrainers', 'gymSchedules', 'gymPackages', 'gymReviews'];

// === ĐỊNH NGHĨA THỨ TỰ CỘT CỐ ĐỊNH (Phải khớp với create_db.php) ===
$column_order = [
    'gymMembers' => ['id', 'hoten', 'gioitinh', 'sdt', 'email', 'goitap', 'ngaybatdau', 'ngayketthuc', 'thanhtoan'],
    'gymTrainers' => ['id', 'hoten', 'sdt', 'email', 'goitap', 'thu', 'ca', 'kinhnghiem', 'thanhtich'],
    'gymSchedules' => ['id', 'type', 'goitap', 'thu', 'ca', 'trainerId', 'memberId'],
    'gymPackages' => ['id', 'name', 'price', 'quyenloi', 'loiich', 'hlv'],
    'gymReviews' => ['id', 'memberId', 'hoten', 'noidung', 'sao'],
];

foreach ($tables as $table) {
    if (isset($data[$table]) && is_array($data[$table])) {
        
        // BƯỚC 1: XÓA SẠCH DỮ LIỆU CŨ (TRUNCATE)
        // Đã tắt kiểm tra khóa ngoại ở ngoài vòng lặp.
        
        // Đây là cách duy nhất để đồng bộ thao tác XÓA từ localStorage
        if (!mysqli_query($conn, "TRUNCATE TABLE `$table`")) {
            echo json_encode([
                'success' => false, 
                'message' => 'Lỗi TRUNCATE bảng ' . $table . ': ' . mysqli_error($conn)
            ]);
            // Bật lại FK Checks trước khi exit nếu có lỗi
            mysqli_query($conn, "SET FOREIGN_KEY_CHECKS = 1");
            mysqli_close($conn);
            exit;
        }
        
        // Bỏ dòng: mysqli_query($conn, "SET FOREIGN_KEY_CHECKS = 1");

        // BƯỚC 2: THÊM DỮ LIỆU MỚI (INSERT)
        foreach ($data[$table] as $item) {
            
            // 1. Lấy danh sách cột theo thứ tự đã định nghĩa
            $keys = $column_order[$table] ?? array_keys($item); 
            
            $values = [];
            foreach($keys as $key) {
                // 2. Lấy giá trị từ $item theo đúng $key
                $value = $item[$key] ?? ''; 
                // Xử lý giá trị bằng mysqli_real_escape_string và thêm dấu nháy đơn
                $escaped_value = mysqli_real_escape_string($conn, $value);
                $values[] = "'" . $escaped_value . "'";
            }
            
            // Tạo câu lệnh SQL: INSERT INTO `table` (`col1`, `col2`, ...) VALUES ('val1', 'val2', ...)
            $cols = '`' . implode('`,`', $keys) . '`';
            $vals = implode(",", $values);
            
            $insert_sql = "INSERT INTO `$table` ($cols) VALUES ($vals)";
            
            // BẮT LỖI INSERT
            if (!mysqli_query($conn, $insert_sql)) {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Lỗi INSERT vào bảng ' . $table . ': ' . mysqli_error($conn),
                    'sql_query' => $insert_sql // Hiển thị câu lệnh SQL bị lỗi
                ]);
                // Bật lại FK Checks trước khi exit nếu có lỗi
                mysqli_query($conn, "SET FOREIGN_KEY_CHECKS = 1");
                mysqli_close($conn);
                exit;
            }
        }
    }
}

// === SỬA LỖI 1: BẬT LẠI KIỂM TRA KHÓA NGOẠI SAU KHI KẾT THÚC ĐỒNG BỘ ===
mysqli_query($conn, "SET FOREIGN_KEY_CHECKS = 1");

echo json_encode(['success' => true, 'message' => 'Đồng bộ dữ liệu thành công']);
mysqli_close($conn);
?>