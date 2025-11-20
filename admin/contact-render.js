 
function fetchAndRenderContacts() {
    const tbody = document.getElementById('contacts-table');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Đang tải dữ liệu...</td></tr>';

    fetch('get_contact_detail.php') 
        .then(response => {
            if (!response.ok) throw new Error('Lỗi mạng hoặc server!');
            return response.json();
        })
        .then(result => {
            tbody.innerHTML = ''; // Xóa thông báo tải
            if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                result.data.forEach(contact => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
    < td > ${ contact.hoten || '' }</td >
                        <td>${contact.sdt || ''}</td>
                        <td>${contact.diachi || ''}</td>
                        <td>${contact.noidung || ''}</td>
`;
                    tbody.appendChild(row);
                });
            } else {
                tbody.innerHTML = `< tr > <td colspan="4" class="text-center">${result.message || 'Không có yêu cầu liên hệ nào.'}</td></tr > `;
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải danh sách liên hệ:', error);
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Lỗi kết nối máy chủ.</td></tr>';
        });
}
// Thêm hàm này vào admin-render.js
function renderContacts() {
    // 1. Lấy tbody của bảng liên hệ
    const tbody = document.getElementById('contacts-table'); 
    if (!tbody) {
        console.error("Không tìm thấy phần tử 'contacts-table' trong HTML.");
        return;
    }
    tbody.innerHTML = '';
    
    // 2. Lấy dữ liệu từ localStorage
    const contacts = JSON.parse(localStorage.getItem('gymContacts')) || []; 

    // 3. Render dữ liệu
    contacts.forEach((c, i) => {
        const row = document.createElement('tr');

        // === PHẦN ĐÃ SỬA ĐỔI ĐỂ HIỂN THỊ RÕ RÀNG HỌ TÊN VÀ NỘI DUNG KHÔNG BỊ CẮT ===
        row.innerHTML = `
            <td>${c.contactId || i + 1}</td>
            <td>${c.hoten || ''}</td>
            <td>${c.sdt || ''}</td>
            <td>${c.email || ''}</td>
            <td>${c.diachi || ''}</td>
            <td>${c.noidung || ''}</td> <td>
                <button onclick="deleteContact(${c.contactId || i})" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Xóa</button>
            </td>
        `;
        // =========================================================================

        tbody.appendChild(row);
    });
}