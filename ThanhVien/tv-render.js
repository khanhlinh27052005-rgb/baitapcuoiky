/**
 * File: tv-render.js
 * Chứa logic xử lý các tác vụ động (AJAX, đổ dữ liệu) cho trang cá nhân thành viên.
 */

// Hàm tiện ích để lấy memberId từ localStorage
function getMemberId() {
    const user = JSON.parse(localStorage.getItem('gymUser'));
    return user ? user.memberId : null;
}

// Hàm chung để gọi API lấy dữ liệu thành viên
function fetchMemberData(callback) {
    const memberId = getMemberId();
    if (!memberId) {
        console.error('Không tìm thấy memberId');
        return;
    }

    fetch('get_member_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memberId: memberId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            callback(data);
        } else {
            console.error('Lỗi API:', data.message);
            // Có thể hiển thị lỗi lên UI nếu cần
        }
    })
    .catch(error => console.error('Lỗi kết nối:', error));
}

// Hàm hiển thị gói tập
function renderPackages(packages) {
    const tbody = document.getElementById('packages-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    if (packages && packages.length > 0) {
        packages.forEach(pkg => {
            const row = `
                <tr>
                    <td>${pkg.ma_goi}</td>
                    <td>${pkg.goitap}</td>
                    <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pkg.gia)}</td>
                    <td>${pkg.ngaybatdau}</td>
                    <td>${pkg.ngayketthuc}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-white">Chưa đăng ký gói tập nào</td></tr>';
    }
}

// Hàm hiển thị lịch tập
function renderSchedules(schedules) {
    const tbody = document.getElementById('schedule-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (schedules && schedules.length > 0) {
        schedules.forEach(sch => {
            const row = `
                <tr>
                    <td>${sch.ma_lich}</td>
                    <td>${sch.goitap}</td>
                    <td>${sch.thu}</td>
                    <td>${sch.ca}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-white">Chưa có lịch tập</td></tr>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.admin-sidebar a');

    // Xử lý chuyển tab
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const target = link.getAttribute('data-target');
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'none';
            });
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.style.display = 'block';
            }

            // Gọi API khi chuyển sang tab tương ứng
            if (target === 'goi-tap' || target === 'lich-tap') {
                fetchMemberData((data) => {
                    if (target === 'goi-tap') {
                        renderPackages(data.packages);
                    } else if (target === 'lich-tap') {
                        renderSchedules(data.schedules);
                    }
                });
            }
        });
    });

    // Kích hoạt tab đầu tiên
    const initialLink = document.querySelector('.admin-sidebar a[data-target="quan-ly-ho-so"]');
    if (initialLink) {
        initialLink.click();
    }
});