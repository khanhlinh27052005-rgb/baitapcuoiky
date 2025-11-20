// gym-data.js - Dữ liệu và hàm xử lý cho Frontend
(function () {
    try {
        const mockData = {
            members: [
                { id: "TV001", hoten: "Nguyễn An", gioitinh: "Nam", sdt: "0901234567", email: "an@gym.com", goitap: "Yoga(1 tháng)", ngaybatdau: "15/11/2025", ngayketthuc: "15/12/2025", thanhtoan: 300000 },
                { id: "TV002", hoten: "Trần Bình", gioitinh: "Nữ", sdt: "0912345678", email: "binh@gym.com", goitap: "Boxing(1 tháng)", ngaybatdau: "15/11/2025", ngayketthuc: "15/12/2025", thanhtoan: 300000 },
                { id: "TV003", hoten: "Lê Cường", gioitinh: "Nam", sdt: "0923456789", email: "cuong@gym.com", goitap: "Gym(1 tháng)", ngaybatdau: "15/11/2025", ngayketthuc: "15/12/2025", thanhtoan: 300000 }
            ],
            trainers: [
                { id: "HLV001", hoten: "Phạm Đức", sdt: "0934567890", email: "duc@gym.com", goitap: "Yoga", thu: "Thứ hai", ca: "Sáng", kinhnghiem: "5 năm giảng dạy Yoga.", thanhtich: "Chứng chỉ Yoga Alliance 500-hour." },
                { id: "HLV002", hoten: "Vũ Hà", sdt: "0945678901", email: "ha@gym.com", goitap: "Gym", thu: "Thứ ba", ca: "Chiều", kinhnghiem: "4 năm kinh nghiệm PT.", thanhtich: "Chứng chỉ HLV Thể hình Quốc gia." },
                { id: "HLV003", hoten: "Hoàng Lan", sdt: "0956789012", email: "lan@gym.com", goitap: "Boxing", thu: "Thứ tư", ca: "Sáng", kinhnghiem: "6 năm thi đấu Boxing.", thanhtich: "Vô địch Boxing Nữ 2022." }
            ],

            // Dữ liệu Lịch
            schedules: [
                { id: "LIC001", type: "Lịch tập", goitap: "Gym", thu: "Thứ hai", ca: "Ca sáng", trainerId: "", memberId: "TV001" },
                { id: "LIC002", type: "Lịch dạy", goitap: "Yoga", thu: "Thứ ba", ca: "Ca chiều", trainerId: "HLV001", memberId: "" },
                { id: "LIC003", type: "Lịch tập", goitap: "Boxing", thu: "Thứ tư", ca: "Ca sáng", trainerId: "", memberId: "TV003" },
                { id: "LIC004", type: "Lịch dạy", goitap: "Gym", thu: "Thứ ba", ca: "Ca chiều", trainerId: "HLV002", memberId: "" }
            ],

            // Dữ liệu Gói tập
            packages: [
                { id: "GOI001", name: "Yoga", price: 300000, quyenloi: "Truy cập lớp Yoga, phòng xông hơi.", loiich: "Bao gồm các lớp Hatha, Vinyasa.", hlv: "Phạm Đức" },
                { id: "GOI002", name: "Boxing", price: 300000, quyenloi: "Truy cập lớp Boxing, khu vực bao cát.", loiich: "Huấn luyện cơ bản và nâng cao.", hlv: "Hoàng Lan" },
                { id: "GOI003", name: "Gym", price: 300000, quyenloi: "Truy cập khu vực Gym, máy chạy bộ.", loiich: "Sử dụng toàn bộ thiết bị (không HLV).", hlv: "Vũ Hà" }
            ],

            // Dữ liệu Đánh giá
            reviews: [
                { id: "TV001", memberId: "TV001", hoten: "Nguyễn An", noidung: "Dịch vụ tuyệt vời, HLV nhiệt tình.", sao: 5 },
                { id: "TV002", memberId: "TV002", hoten: "Trần Bình", noidung: "Phòng tập sạch sẽ, hiện đại.", sao: 4 },
                { id: "TV003", memberId: "TV003", hoten: "Lê Cường", noidung: "Giá hơi cao nhưng chất lượng.", sao: 4 }
            ],

            // Dữ liệu Thanh toán
            payments: []
        };

        // Khởi tạo localStorage nếu chưa có
        function initStorage() {
            if (!localStorage.getItem('gymMembers')) localStorage.setItem('gymMembers', JSON.stringify(mockData.members));
            if (!localStorage.getItem('gymTrainers')) localStorage.setItem('gymTrainers', JSON.stringify(mockData.trainers));
            if (!localStorage.getItem('gymSchedules')) localStorage.setItem('gymSchedules', JSON.stringify(mockData.schedules));
            if (!localStorage.getItem('gymPackages')) localStorage.setItem('gymPackages', JSON.stringify(mockData.packages));
            if (!localStorage.getItem('gymReviews')) localStorage.setItem('gymReviews', JSON.stringify(mockData.reviews));
            if (!localStorage.getItem('gymPayments')) localStorage.setItem('gymPayments', JSON.stringify(mockData.payments));
        }
        initStorage();

        // === GLOBAL DATA OBJECT & SAVE FUNCTION ===
        window.data = {
            members: JSON.parse(localStorage.getItem('gymMembers')) || [],
            trainers: JSON.parse(localStorage.getItem('gymTrainers')) || [],
            schedules: JSON.parse(localStorage.getItem('gymSchedules')) || [],
            packages: JSON.parse(localStorage.getItem('gymPackages')) || [],
            reviews: JSON.parse(localStorage.getItem('gymReviews')) || [],
            payments: JSON.parse(localStorage.getItem('gymPayments')) || []
        };

        window.saveData = function (key, value) {
            if (window.data[key]) {
                window.data[key] = value;
            }
            const storageKey = 'gym' + key.charAt(0).toUpperCase() + key.slice(1);
            localStorage.setItem(storageKey, JSON.stringify(value));
        };

    } catch (error) {
        console.error("Lỗi khởi tạo gym-data.js:", error);
    }
})();
