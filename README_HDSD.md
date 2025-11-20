HỆ THỐNG QUẢN LÝ PHÒNG GYM & THÀNH VIÊN
I. TỔNG QUAN HỆ THỐNG
●	Tên hệ thống: GymLy
●	Mục tiêu:
 Quản lý hội viên, huấn luyện viên, gói tập, lịch tập, thanh toán và thông tin của phòng gym.
●	Đối tượng sử dụng:
○	Quản trị viên (Admin)
○	Thành viên (Member)
●	Phạm vi ứng dụng:
Hệ thống dành cho các phòng gym, trung tâm fitness hoặc yoga studio quy mô nhỏ và vừa.
II. YÊU CẦU HỆ THỐNG
2.1. Yêu cầu kỹ thuật
●	PHP 7.4 hoặc cao hơn
●	MySQL 5.7 hoặc cao hơn
●	Máy chủ web (Apache/Nginx)
●	PDO PHP Extension
●	Trình duyệt web hiện đại có hỗ trợ JavaScript
2.2. Cấu hình cơ sở dữ liệu
●	Host: localhost
●	Database: gymDB
●	User: root
●	Password: “ ”
III. VAI TRÒ NGƯỜI DÙNG & PHÂN QUYỀN TRUY CẬP
3.1. Quản trị viên
●	Quản lý thành viên (xem/thêm/sửa/xóa)
●	Quản lý huấn luyện viên  (xem/thêm/sửa/xóa)
●	Quản lý gói tập  (xem/thêm/sửa/xóa)
●	Quản lý lịch (xem/thêm/sửa/xóa) 
●	Quản lý đánh giá (xem/xóa)
●	Quản lý liên hệ (xem)
3.2. Thành viên
●	Đăng ký gói tập
●	Quản lý hồ sơ cá nhân
●	Xem gói tập đang sử dụng
●	Xem lịch tập
●	Đánh giá gói tập
3.3. Người dùng chưa đăng nhập
●	Xem các trang thông tin trang chủ, giới thiệu, gói tập, tính BMI, đội ngũ huấn luyện viên.
●	Để lại liên hệ
IV. CA SỬ DỤNG
4.1. Use Cases Xác Thực
●	Đăng nhập
●	Đăng ký tài khoản
●	Đăng xuất
4.1.1. Đăng Nhập
●	Tác nhân: Quản trị viên, Thành viên
●	Mô tả: Người dùng đăng nhập vào hệ thống bằng số điện thoại/email và mật khẩu.
●	Luồng chính:
1.	Người dùng truy cập trang đăng nhập
2.	Nhập số điện thoại/email và mật khẩu
3.	Hệ thống xác thực thông tin
4.	Chuyển hướng đến trang chính tương ứng với vai trò
4.1.2. Đăng Ký Tài Khoản
●	Tác nhân: Người dùng mới (Thành viên)
●	Mô tả: Người dùng đăng ký tài khoản mới trong hệ thống.
●	Luồng chính:
1.	Người dùng truy cập trang đăng ký
2.	Nhập thông tin cá nhân, mật khẩu
3.	Hệ thống xác thực dữ liệu và lưu thông tin
4.	Chuyển hướng đến trang đăng nhập
4.1.3. Đăng Xuất
●	Tác nhân: Người dùng đã đăng nhập
●	Mô tả: Người dùng đăng xuất khỏi hệ thống.
●	Luồng chính:
1.	Người dùng chọn “Đăng xuất”
2.	Hệ thống xóa phiên đăng nhập
3.	Chuyển hướng đến trang khách
4.2. Use Cases Quản trị viên
●	Quản lý thành viên (xem/thêm/sửa/xóa)
●	Quản lý huấn luyện viên  (xem/thêm/sửa/xóa)
●	Quản lý gói tập  (xem/thêm/sửa/xóa)
●	Quản lý lịch (xem/thêm/sửa/xóa) 
●	Quản lý đánh giá (xem/xóa)
●	Quản lý liên hệ (xem)
4.2.1. Quản lý thành viên
●	Tác nhân: Quản trị viên
●	Mô tả: Quản trị viên xem, thêm, chỉnh sửa hoặc xóa thông tin thành viên trong hệ thống.
●	Luồng chính
1.     Quản trị viên đăng nhập và truy cập mục “Thành viên”.
2.     Hệ thống hiển thị danh sách tất cả thành viên.
3.     Quản trị viên có thể chọn Thêm mới/Chỉnh sửa/Xóa thành viên hiện có.
4.     Hệ thống lưu thay đổi và cập nhật danh sách hiển thị.
4.2.2. Quản lý huấn luyện viên
●	Tác nhân: Quản trị viên
●	Mô tả: Quản trị viên xem, thêm, chỉnh sửa hoặc xóa thông tin huấn luyện viên trong hệ thống.
●	Luồng chính:
1.     Quản trị viên vào mục “Huấn luyện viên”.
2.     Hệ thống hiển thị danh sách huấn luyện viên.
3.     Quản trị viên có thể chọn Thêm mới, Chỉnh sửa hoặc Xóa huấn luyện viên.
4.     Hệ thống lưu lại thay đổi và cập nhật danh sách.
4.2.3. Quản lý gói tập
●	Tác nhân: Quản trị viên
●	Mô tả: Quản trị viên tạo mới, chỉnh sửa hoặc xóa các gói tập.
●	Luồng chính:
1.     Quản trị viên vào mục “Gói tập”.
2.     Hệ thống hiển thị danh sách gói tập.
3.     Quản trị viên chọn Thêm mới hoặc Chỉnh sửa/Xóa gói hiện có.
4.     Hệ thống lưu và cập nhật danh sách hiển thị.
4.2.4. Quản lý lịch
●	Tác nhân: Quản trị viên
●	Mô tả: Quản trị viên xem và điều chỉnh lịch huấn luyện giữa huấn luyện viên và học viên.
●	Luồng chính:
1.     Quản trị viên vào mục “Lịch”.
2.     Hệ thống hiển thị danh sách lịch dạy hiện có.
3.     Quản trị viên chọn Thêm mới, Chỉnh sửa hoặc Xóa lịch.
4.     Hệ thống lưu và cập nhật hiển thị lịch mới.
4.2.5. Quản lý đánh giá
●	Tác nhân: Quản trị viên
●	Mô tả: Quản trị viên có thể xem và xóa đánh giá của thành viên.
●	Luồng chính:
1.     Quản trị viên vào mục “Đánh giá”.
2.     Hệ thống hiển thị danh sách đánh giá hiện có.
3.     Quản trị viên xem hoặc chọn Xóa để xóa đánh giá.
4.     Hệ thống lưu và cập nhật hiển thị lịch mới
4.2.6. Quản lý liên hệ
●	Tác nhân: Quản trị viên
●	Mô tả: Quản trị viên có thể xem các thông tin liên hệ.
●	Luồng chính:
1.     Quản trị viên vào mục “Liên hệ”.
2.     Hệ thống hiển thị danh sách liên hệ hiện có.
3.     Quản trị viên xem  các liên hệ.
4.     Hệ thống lưu và cập nhật hiển thị liên hệ mới
4.3. Use Cases Thành viên
●	Đăng ký gói tập
●	Quản lý hồ sơ cá nhân
●	Xem gói tập đang sử dụng
●	Xem lịch tập
4.3.1. Đăng ký gói tập
●	Tác nhân: Thành viên 
●	Mô tả: Thành viên chọn và đăng ký gói tập theo nhu cầu cá nhân.
●	Luồng chính:
1.	Thành viên truy cập mục “Gói tập”.
2.	Hệ thống hiển thị danh sách các gói tập
3.	Thành viên chọn gói tập để xem thông tin gói và nhấn “Đăng ký”.
4.	Hệ thống hiển thị form thanh toán gói tập.
5.	Hệ thống lưu thông tin đăng ký và kích hoạt gói tập.
4.3.2. Quản Lý Hồ Sơ Cá Nhân
●	Tác nhân: Thành viên
●	Mô tả: Thành viên có thể xem và sửa thông tin cá nhân.
●	Luồng chính:
1.	Thành viên truy cập trang “Trang cá nhân”.
2.	Hệ thống hiển thị thông tin chi tiết: họ tên, giới tính, số điện thoại, email.
3.	Thành viên xem và chỉnh sửa các thông tin cá nhân.
4.	Hệ thống lưu thay đổi và cập nhật hiển thị. 
4.3.3. Xem Gói Tập Đang Sử Dụng
●	Tác nhân: Thành viên
●	Mô tả: Thành viên xem thông tin gói tập hiện tại mà mình đang sử dụng.
●	Luồng chính:
1.	Thành viên truy cập trang “Trang cá nhân”.
2.	Thành viên truy cập mục “Gói tập đã đăng ký”
3.	Hệ thống hiển thị danh sách thông tin các gói tập đã đăng ký.
4.3.4. Xem Lịch Tập
●	Tác nhân: Thành viên
●	Mô tả: Thành viên xem thông tin lịch tập của mình.
●	Luồng chính:
4.	Thành viên truy cập trang “Trang cá nhân”.
5.	Thành viên truy cập mục “Lịch tập”
6.	Hệ thống hiển thị danh sách thông tin các lịch tập của học viên.
V. TÍNH NĂNG CHÍNH
5.1. Hệ Thống Xác Thực
●	Đăng nhập người dùng bằng Email hoặc Số điện thoại và mật khẩu
●	Đăng ký tài khoản mới với thông tin cá nhân (Họ, Tên, SĐT, Email, Giới tính, Mật khẩu)
●	Quản lý phiên đăng nhập bằng localStorage để duy trì trạng thái người dùng
●	Chức năng Đăng xuất và cập nhật menu điều hướng theo trạng thái đăng nhập
●	Tích hợp xác thực với PHP (login.php, register.php) để kiểm tra thông tin và mã hóa mật khẩu
5.2. Quản Lý Người Dùng (Admin)
●	Thêm, sửa, xóa Thành viên với thông tin: Họ tên, SĐT, Email, Giới tính, Gói tập, Ngày bắt đầu/kết thúc, Tổng thanh toán
●	Quản lý Huấn luyện viên (HLV): Họ tên, SĐT, Email, Kinh nghiệm, Thành tích, Gói dạy, Lịch dạy (Thứ, Ca)
●	Quản lý Lịch tập/dạy: Mã lịch, Loại lịch (tập/dạy), Gói tập, Thứ, Ca, Mã HLV, Mã TV
●	Quản lý Gói tập: Mã gói, Tên gói, Lợi ích, Quyền lợi, HLV phụ trách, Giá gói
●	Quản lý Đánh giá: Nội dung đánh giá, số sao, thông tin thành viên
●	Quản lý liên hệ: xem thông tin: họ tên, số điện thoại, địa chỉ, nội dung liên hệ.
5.3. Trang Cá Nhân Thành Viên
●	Hiển thị thông tin hồ sơ cá nhân: Họ tên, Giới tính, SĐT, Email, ảnh đại diện
●	Chức năng Cập nhật thông tin cá nhân (họ tên, email, SĐT, giới tính)
●	Xem danh sách Gói tập đã đăng ký với thông tin: Mã gói, Tên gói, Giá, Ngày bắt đầu/kết thúc
●	Xem Lịch tập cá nhân: Mã lịch, Gói tập, Thứ, Ca
5.4. Quản Lý Gói Tập
●	Hiển thị danh sách gói tập (Yoga, Boxing, Gym) với mô tả, lợi ích, quyền lợi và HLV phụ trách
●	Popup chi tiết gói tập: thông tin đầy đủ về lợi ích, quyền lợi, HLV, giá gói
●	Chức năng Đăng ký gói tập với form xác nhận thanh toán (Mã thanh toán, Mã thành viên, Mã gói, Giá, Ngày thanh toán)
●	Quản lý giá gói và hiển thị chi tiết giá theo tháng
5.5. Quản Lý Huấn Luyện Viên
●	Hiển thị danh sách HLV với ảnh, tên, chuyên môn
●	Popup chi tiết HLV: Giới tính, SĐT, Email, Kinh nghiệm, Thành tích, Chuyên môn
●	Tích hợp carousel để duyệt danh sách HLV
5.6. Hệ Thống Đánh Giá
●	Người dùng có thể viết đánh giá và chọn số sao (1–5)
●	Lưu đánh giá vào localStorage và hiển thị trên trang Giới thiệu (about-us)
●	Hiển thị đánh giá bằng carousel với tên, nội dung, số sao
5.7. Công Cụ Tính BMI
●	Form nhập Chiều cao, Cân nặng, Tuổi, Giới tính
●	Tính toán chỉ số BMI và hiển thị trạng thái (Thiếu cân, Bình thường, Thừa cân, Béo phì)
●	Bảng tham chiếu BMI để người dùng đối chiếu
5.8. Tìm kiếm thông tin trên trang web
●	Có công cụ tìm kiếm để người dùng có thể dễ dàng tra cứu thông tin trang web bằng cách nhập từ khóa liên quan.
VI. MÔ HÌNH DỮ LIỆU (DATABASE DESIGN)
6.1. Đăng ký tài khoản (account)
●	memberId (mã đăng ký)
●	hoten (họ tên)
●	sdt (số điện thoại)
●	email (email)
●	gioitinh (giới tính
●	matkhau (mật khẩu)
6.2. Quản lý thành viên (ThanhVien)
●	id (khóa chính, mã hội viên)
●	hoten (họ tên hội viên)
●	gioitinh (giới tính)
●	sdt (số điện thoại)
●	email (email)
●	goitap (gói tập đăng ký)
●	ngaybatdau (ngày bắt đầu gói tập)
●	ngayketthuc (ngày kết thúc gói tập)
●	thanhtoan (tổng tiền thanh toán)
6.3. HuanLuyenVien
●	id (khóa chính, mã huấn luyện viên)
●	hoten (họ tên)
●	sdt (số điện thoại)
●	email (email)
●	goitap (gói tập đang dạy)
●	thu (thứ dạy)
●	ca (ca dạy: sáng/tối)
●	kinhnghiem (kinh nghiệm)
●	thanhtich (thành tích)
6.4. Quản lý gói tập
●	id (khóa chính, mã gói tập)
●	name (tên gói tập)
●	price (giá tiền)
●	quyenloi (quyền lợi)
●	loiich (lợi ích)
●	hlv (huấn luyện viên phụ trách)
6.5. Quản lý lịch
●	id (khóa chính, mã lịch)
●	type (loại lịch: lịch dạy/lịch tập)
●	goitap (tên gói)
●	thu (thứ dạy/tập)
●	ca (ca dạy/tập)
●	trainerId (huấn luyện viên phụ trách)
●	memberId (thành viên tham gia
6.6. Quản lý đánh giá
●	id (khóa chính)
●	memberId (mã thành viên)
●	hoten (họ tên thành viên)
●	noidung (nội dung đánh giá)
●	sao (số sao đánh giá)
6.7 Quản lý liên hệ
●	contactid(khóa chính)
●	hoten(họ tên)
●	sdt(số điện thoại)
●	diachi(địa chỉ)
●	noidung(noidung)
●	thoigian_gui(thời gian gửi)
VII. YÊU CẦU GIAO DIỆN NGƯỜI DÙNG (UI/UX)
●	Thiết kế đáp ứng tương thích với máy tính để bàn và thiết bị di động: Giao diện GymLy sử dụng Bootstrap và CSS tùy chỉnh, đảm bảo hiển thị tốt trên cả desktop và mobile. Menu off-canvas và thanh điều hướng được tối ưu cho thiết bị di động.
●	Điều hướng trực quan và Bảng điều khiển để truy cập nhanh các tính năng quan trọng: Thanh menu chính và sidebar quản trị/ cá nhân giúp người dùng dễ dàng truy cập các mục: Trang chủ, Giới thiệu, Gói tập, Đội ngũ HLV, Tính BMI, Trang cá nhân, Quản trị người dùng.
●	Chỉ báo trực quan rõ ràng về tình trạng dữ liệu: Các bảng hiển thị thông tin thành viên, HLV, gói tập, lịch tập, đánh giá với trạng thái rõ ràng (ví dụ: ngày bắt đầu/kết thúc, tổng thanh toán, số sao đánh giá).
●	Giao diện đăng ký gói tập thân thiện với người dùng: Popup chi tiết gói tập hiển thị lợi ích, quyền lợi, HLV phụ trách, giá gói. Form đăng ký gói tập có thông tin mã thanh toán, mã thành viên, tên gói, giá, ngày thanh toán.
●	Hỗ trợ tiếng Việt: Toàn bộ giao diện, form, bảng, popup, thông báo đều sử dụng tiếng Việt.
VIII. YÊU CẦU VỀ THÔNG TIN CHI TIẾT
●	Thống kê sử dụng gói tập: Trang quản trị hiển thị danh sách thành viên với thông tin gói tập, ngày bắt đầu/kết thúc, tổng thanh toán.
●	Thời gian tập luyện phổ biến: Bảng Lịch hiển thị chi tiết theo thứ trong tuần và ca (sáng/chiều), giúp quản trị viên và HLV, thành viên theo dõi khung giờ phổ biến.
●	Báo cáo hoạt động người dùng: Quản trị viên có thể xem danh sách thành viên, HLV, lịch tập, gói tập, đánh giá để nắm bắt hoạt động của từng đối tượng.
●	Gói tập và lịch tập đã đăng ký của thành viên: Trang cá nhân hiển thị chi tiết gói tập đã đăng ký (mã gói, tên gói, giá, ngày bắt đầu/kết thúc) và lịch tập (mã lịch, gói tập, thứ, ca).
IX. YÊU CẦU BẢO MẬT
●	Mã hóa mật khẩu, xác thực người dùng
●	Kiểm soát truy cập theo vai trò
●	Bảo Mật Dữ Liệu Người Dùng
●	Quản lý phiên người dùng
●	Ghi log hoạt động hệ thống
X. CẤU TRÚC DỰ ÁN
Gym1/
│
├── admin/                      # Trang quản trị (CRUD, render, đồng bộ)
│   ├── admin-crud.js           # Xử lý CRUD tài khoản / dữ liệu
│   ├── admin-render.js         # Render UI admin
│   ├── admin-sync.js           # Đồng bộ dữ liệu admin ↔ MySQL
│   ├── data.js                 # Dữ liệu tạm / cấu hình admin
│   ├── load_from_mysql.php     # Lấy dữ liệu từ MySQL cho admin
│   ├── sync_to_mysql.php       # Ghi dữ liệu từ admin xuống MySQL
│   └── users.html              # Giao diện danh sách người dùng
│
├── ThanhVien/                  # Giao diện & chức năng dành cho thành viên
│   ├── index-tv.html           # Trang chính thành viên
│   ├── profile.html            # Trang hồ sơ người dùng
│   ├── services-tv.html        # Trang dịch vụ cho thành viên
│   ├── team-tv.html            # Trang đội ngũ
│   ├── bmi-tv.html             # Trang tính BMI
│   ├── get_profile.php         # API lấy hồ sơ thành viên
│   ├── update_profile.php      # API cập nhật hồ sơ
│   ├── check_member.php        # Kiểm tra tài khoản thành viên
│   ├── get_member_data.php     # Lấy dữ liệu gói tập / thông tin liên quan
│   ├── fetch_reviews.php       # Lấy đánh giá dịch vụ
│   ├── submit_review.php       # Gửi đánh giá
│   ├── tv-render.js            # Script render giao diện thành viên
│   └── data.js                 # File JS dùng chung cho module TV
│
├── PHP/                        # API backend PHP (tài khoản, DB)
│   ├── create_db.php           # Khởi tạo DB GymDB + bảng
│   └── add_account.php         # API đăng ký tài khoản
│
├── css/                        # Tất cả file CSS của giao diện
│   ├── admin-custom.css
│   ├── bootstrap.min.css
│   ├── style.css               # Style chính cho giao diện
│   ├── font-awesome.min.css
│   └── …                       # Các file CSS của thư viện
│
├── js/                         # JS cho giao diện chính
│   ├── main.js                 # Logic / hiệu ứng trang chủ
│   ├── gym-data.js             # File dùng chung để load dữ liệu
│   ├── bootstrap.min.js
│   ├── jquery-3.3.1.min.js
│   ├── jquery.slicknav.js
│   ├── jquery.magnific-popup.min.js
│   └── …                       # Thư viện JS khác
│
├── img/                        # Toàn bộ hình ảnh giao diện
│   ├── blog/
│   ├── classes/
│   ├── gallery/
│   ├── hero/
│   ├── services/
│   ├── testimonial/
│   ├── logo.png
│   └── … 
│
├── fonts/                      # FontAwesome, Flaticon, webfonts
│
├── Source/                     # File zip thư viện gốc (chỉ dùng để tham khảo)
│
├── about-us.html               # Trang giới thiệu
├── account.html                # Trang tài khoản
├── login.php                   # Trang đăng nhập
├── register.php                # Trang đăng ký
├── services.html               # Trang dịch vụ
├── team.html                   # Trang đội ngũ
├── index.html                  # Trang chủ chính
│
├── dangky_goitap.php           # API xử lý đăng ký gói tập
├── member_package.php          # Lấy thông tin gói tập đã đăng ký
├── check_schema.php            # Kiểm tra cấu trúc bảng
├── check_schedule_schema.php   # Kiểm tra bảng lịch tập
└── check_full_schema.php       # Kiểm tra toàn bộ schema DB
XI. CHI TIẾT TRIỂN KHAI & ROUTES CHÍNH
11.1. Tuyến cho Admin
●	/admin/users (chọn Thành Viên) – Quản lý hội viên
●	/admin/users (chọn Huấn luyện viên) – Quản lý HLV
●	/admin/users (chọn Gói tập) – Gói tập
●	/admin/users (chọn Lịch) – Lịch
●	/admin/users (chọn Đánh giá) – Đánh giá
●	/admin/users (chọn Liên hệ) – Liên hệ
11.2. Tuyến cho Member
●	/ThanhVien/profile (chọn Quản lý hồ sơ) – Hồ sơ
●	/ThanhVien/profile (chọn Gói tập đã đăng ký) – Gói tập đang dùng
●	/ThanhVien/profile (chọn Lịch tập) – Lịch tập
●	/ThanhVien/bmi-calculator-tv  – Tính BMI
●	/ThanhVien/services-tv – Đăng ký gói tập


