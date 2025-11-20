// admin/admin-sync.js - Đồng bộ localStorage ↔ MySQL

let isSyncing = false; // Tránh sync nhiều lần cùng lúc

// === 1. HÀM HIỂN THỊ THÔNG BÁO (showToast) ===
function showToast(message, type = 'danger', duration = 5000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    // ... (Giữ nguyên logic showToast của bạn) ...
    // Giả sử logic showToast đã có và hoạt động
    console.log(`[Toast ${type}]: ${message}`);
}

// === 2. HÀM ĐỒNG BỘ LÊN MYSQL (syncToMySQL) ===
async function syncToMySQL() {
    if (isSyncing) return;
    isSyncing = true;

    // Gói tất cả dữ liệu localStorage cần thiết vào một object JSON
    const data = {
        gymMembers: JSON.parse(localStorage.getItem('gymMembers') || '[]'),
        gymTrainers: JSON.parse(localStorage.getItem('gymTrainers') || '[]'),
        gymSchedules: JSON.parse(localStorage.getItem('gymSchedules') || '[]'),
        gymPackages: JSON.parse(localStorage.getItem('gymPackages') || '[]'),
        gymReviews: JSON.parse(localStorage.getItem('gymReviews') || '[]')
    };

    try {
        console.log('Đang đồng bộ lên MySQL...');
        const response = await fetch('sync_to_mysql.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // Gửi toàn bộ dữ liệu
        });

        const result = await response.json();
        if (result.success) {
            console.log('Đồng bộ lên MySQL thành công!');
            showToast('Đồng bộ lên MySQL thành công!', 'success');
        } else {
            console.error('Lỗi sync:', result.message);
            showToast('Đồng bộ thất bại: ' + result.message, 'danger');
        }
    } catch (err) {
        console.error('Lỗi kết nối hoặc xử lý:', err);
        showToast('Không thể kết nối đến server để đồng bộ!', 'danger');
    } finally {
        isSyncing = false;
    }
}

// --- HÀM TẢI DỮ LIỆU BAN ĐẦU ---
function renderAllTabs() {
    const activeTab = document.querySelector('.admin-sidebar a.active');
    const target = activeTab ? activeTab.dataset.target : 'thanh-vien';
    if (target === 'thanh-vien' && typeof renderMembers === 'function') renderMembers();
    if (target === 'huan-luyen-vien' && typeof renderTrainers === 'function') renderTrainers();
    if (target === 'lich' && typeof renderSchedules === 'function') renderSchedules();
    if (target === 'goi-tap' && typeof renderPackages === 'function') renderPackages();
    if (target === 'danh-gia' && typeof renderReviews === 'function') renderReviews();
}

async function loadFromMySQL() {
    // BỎ: Không ưu tiên localStorage nữa, luôn tải mới từ MySQL

    try {
        const response = await fetch('load_from_mysql.php');
        const data = await response.json();

        // Lưu dữ liệu vào localStorage
        if (data.gymMembers) localStorage.setItem('gymMembers', JSON.stringify(data.gymMembers));
        if (data.gymTrainers) localStorage.setItem('gymTrainers', JSON.stringify(data.gymTrainers));
        if (data.gymSchedules) localStorage.setItem('gymSchedules', JSON.stringify(data.gymSchedules));
        if (data.gymPackages) localStorage.setItem('gymPackages', JSON.stringify(data.gymPackages));
        if (data.gymReviews) localStorage.setItem('gymReviews', JSON.stringify(data.gymReviews));

        console.log('Tải dữ liệu từ MySQL vào localStorage thành công!');
        showToast('Đã tải dữ liệu mới nhất từ MySQL!', 'success');
        renderAllTabs();
    } catch (err) {
        console.error('Lỗi tải dữ liệu:', err);
    }
}

// === 3. THEO DÕI THAY ĐỔI localStorage → KÍCH HOẠT SYNC (QUAN TRỌNG) ===
const originalSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
    // Luôn gọi hàm gốc để lưu dữ liệu vào localStorage
    originalSetItem.apply(this, arguments);

    // Chỉ sync khi thay đổi các key liên quan đến gym
    if (key.startsWith('gym') && !isSyncing) {
        console.log('Phát hiện thay đổi:', key, '→ Kích hoạt Đồng bộ...');

        // Kích hoạt thông báo cho người dùng
        if (typeof showToast === 'function') {
            showToast('Đã lưu cục bộ. Đang đồng bộ lên MySQL...', 'warning', 10000);
        }

        // Gọi hàm sync sau một khoảng trễ ngắn (100ms)
        setTimeout(syncToMySQL, 100);
    }
};

// === 4. TẢI DỮ LIỆU KHI TRANG LOAD ===
document.addEventListener('DOMContentLoaded', () => {
    if (typeof loadFromMySQL === 'function') {
        loadFromMySQL();
    }
});