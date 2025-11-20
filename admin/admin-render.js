// admin-render.js - Render bảng từ localStorage

function renderMembers() {
  const tbody = document.getElementById('members-table');
  if (!tbody) return;
  tbody.innerHTML = '';
  const members = JSON.parse(localStorage.getItem('gymMembers')) || [];

  // FORMAT NGÀY THÁNG (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    // Nếu ngày đã là DD/MM/YYYY thì giữ nguyên (cho dữ liệu cũ)
    if (dateStr.includes('/')) return dateStr;
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  members.forEach((m, i) => {
    const row = document.createElement('tr');

    // ĐỊNH DẠNG TIỀN TỆ (MỚI)
    const payment = (m.thanhtoan || 0).toLocaleString('vi-VN') + ' VND';

    row.innerHTML = `
      <td>${m.id}</td>
      <td>${m.hoten}</td>
      <td>${m.sdt}</td>
      <td>${m.email}</td>
      <td>${m.gioitinh || 'Chưa xác định'}</td>
      <td>${m.goitap || ''}</td>
      <td>${formatDateDisplay(m.ngaybatdau)}</td>
      <td>${formatDateDisplay(m.ngayketthuc)}</td>
      <td>${payment}</td> <td>
        <button class="btn-action edit-btn" onclick="editMember(${i})">Sửa</button>
        <button class="btn-action delete-btn" onclick="deleteMember(${i})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// === HÀM RENDER HLV ===
function renderTrainers() {
  const tbody = document.getElementById('trainers-table');
  if (!tbody) return;
  tbody.innerHTML = '';
  const trainers = JSON.parse(localStorage.getItem('gymTrainers')) || [];
  trainers.forEach((t, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.id}</td>
      <td>${t.hoten}</td>
      <td>${t.sdt}</td>
      <td>${t.email}</td>
      <td>${t.kinhnghiem || ''}</td>
      <td>${t.thanhtich || ''}</td>
      <td>${t.goitap}</td>
      <td>${t.thu}</td>
      <td>${t.ca}</td>
      <td>
        <button class="btn-action edit-btn" onclick="editTrainer(${i})">Sửa</button>
        <button class="btn-action delete-btn" onclick="deleteTrainer(${i})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// === HÀM RENDER LỊCH ===
function renderSchedules() {
  const tbody = document.getElementById('schedules-table');
  if (!tbody) return;
  tbody.innerHTML = '';
  const schedules = JSON.parse(localStorage.getItem('gymSchedules')) || [];
  schedules.forEach((s, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.type}</td> 
      <td>${s.goitap}</td>
      <td>${s.thu}</td>
      <td>${s.ca}</td>
      <td>${s.trainerId || ''}</td>
      <td>${s.memberId || ''}</td>
      <td>
        <button class="btn-action edit-btn" onclick="editSchedule(${i})">Sửa</button>
        <button class="btn-action delete-btn" onclick="deleteSchedule(${i})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// === HÀM RENDER GÓI TẬP ===
function renderPackages() {
  console.log('Rendering packages...');
  const tbody = document.getElementById('packages-table');
  if (!tbody) return;
  tbody.innerHTML = '';
  const packages = JSON.parse(localStorage.getItem('gymPackages')) || [];
  console.log('Packages data:', packages);
  packages.forEach((p, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.loiich || ''}</td> 
      <td>${p.quyenloi || ''}</td> 
      <td>${p.hlv || ''}</td>
      <td>${p.price.toLocaleString('vi-VN')} VND</td>
      <td>
        <button class="btn-action edit-btn" onclick="editPackage(${i})">Sửa</button>
        <button class="btn-action delete-btn" onclick="deletePackage(${i})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// === HÀM RENDER ĐÁNH GIÁ (ĐÃ CẬP NHẬT) ===
function renderReviews() {
  const tbody = document.getElementById('reviews-table');
  if (!tbody) return;
  tbody.innerHTML = '';
  const reviews = JSON.parse(localStorage.getItem('gymReviews')) || [];

  // Helper để hiển thị sao
  const renderStars = (num) => {
    let stars = '';
    const n = parseInt(num) || 0;
    for (let i = 0; i < n; i++) stars += '⭐'; // Biểu tượng sao
    return stars;
  };

  reviews.forEach((r, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${r.memberId || r.id}</td> <td>${r.hoten}</td>
      <td style="white-space: normal; min-width: 300px;">${r.noidung || ''}</td>
      <td>${renderStars(r.sao)} (${r.sao})</td>
      <td>
        <button class="btn-action delete-btn" onclick="deleteReview(${i})">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}


// Xử lý sidebar + render khi click
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.admin-sidebar a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const target = link.dataset.target;
      document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
      const el = document.getElementById(target);
      if (el) el.style.display = 'block';

      if (target === 'thanh-vien') renderMembers();
      if (target === 'huan-luyen-vien') renderTrainers();
      if (target === 'lich') renderSchedules();
      if (target === 'goi-tap') renderPackages();
      if (target === 'danh-gia') renderReviews();
      if (target === 'lien-he') fetchAndRenderContacts();
    });
  });

  // Mở tab mặc định
  const defaultLink = document.querySelector('.admin-sidebar a[data-target="thanh-vien"]');
  if (defaultLink) defaultLink.click();
});