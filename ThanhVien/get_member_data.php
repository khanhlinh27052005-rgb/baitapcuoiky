<?php
header('Content-Type: application/json');

// 1. Cấu hình Database & Kết nối CSDL
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "GymDB"; 

$conn = mysqli_connect($host, $user, $pass, $dbname);
if (!$conn) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi kết nối CSDL: ' . mysqli_connect_error()]);
    exit();
}
mysqli_set_charset($conn, "utf8mb4");

// 2. Lấy memberId từ POST request
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if (empty($data['memberId'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => "Thiếu memberId."]);
    mysqli_close($conn);
    exit;
}

$memberId = mysqli_real_escape_string($conn, $data['memberId']);

$response = [
    'success' => true,
    'packages' => [],
    'schedules' => []
];

// 3. Lấy thông tin gói tập từ gymMembers
// Lưu ý: Bảng gymMembers lưu thông tin gói tập hiện tại của thành viên
$sql_package = "SELECT goitap, thanhtoan, ngaybatdau, ngayketthuc FROM gymMembers WHERE id = '$memberId'";
$result_package = mysqli_query($conn, $sql_package);

if ($result_package && mysqli_num_rows($result_package) > 0) {
    $row = mysqli_fetch_assoc($result_package);
    // Chỉ thêm nếu có gói tập (đôi khi có thể null hoặc rỗng nếu chưa đăng ký)
    if (!empty($row['goitap'])) {
        // Giả sử mỗi thành viên chỉ có 1 gói tập active tại 1 thời điểm trong bảng gymMembers
        // Mã gói không có trong gymMembers, ta có thể dùng ID hoặc tên gói làm mã tạm
        $response['packages'][] = [
            'ma_goi' => $row['goitap'], // Dùng tên gói làm mã hoặc cần join bảng khác nếu có bảng packages riêng
            'goitap' => $row['goitap'],
            'gia' => $row['thanhtoan'],
            'ngaybatdau' => $row['ngaybatdau'],
            'ngayketthuc' => $row['ngayketthuc']
        ];
    }
}

// 4. Lấy thông tin lịch tập từ gymschedules
$sql_schedule = "SELECT id, goitap, thu, ca FROM gymschedules WHERE memberId = '$memberId'";
$result_schedule = mysqli_query($conn, $sql_schedule);

if ($result_schedule) {
    while ($row = mysqli_fetch_assoc($result_schedule)) {
        $response['schedules'][] = [
            'ma_lich' => $row['id'],
            'goitap' => $row['goitap'],
            'thu' => $row['thu'],
            'ca' => $row['ca']
        ];
    }
}

mysqli_close($conn);
echo json_encode($response);
?>
