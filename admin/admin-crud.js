// admin-crud.js - CRUD cho Thành viên, HLV, Lịch, Gói tập

// === THÀNH VIÊN ===

// HÀM TẠO ID MỚI
function generateNewId(members, prefix = 'TV') {
  if (members.length === 0) return `${prefix}001`;

  const ids = members
    .map(m => m.id)
    .filter(id => id && id.startsWith(prefix))
    .map(id => parseInt(id.replace(prefix, '')));

  const maxNumber = ids.length > 0 ? Math.max(...ids) : 0;
  const newNumber = maxNumber + 1;
  return `${prefix}${String(newNumber).padStart(3, '0')}`;
}

function editMember(index) {
  const members = JSON.parse(localStorage.getItem('gymMembers')) || [];
  const form = document.getElementById('memberForm');

  if (index === -1) {
    form.reset();
    form.dataset.index = '';
    document.getElementById('mem_gioitinh').value = 'Nam';
    document.getElementById('mem_thanhtoan').value = '';
  } else {
    const m = members[index];
    document.getElementById('mem_hoten').value = m.hoten || '';
    document.getElementById('mem_sdt').value = m.sdt || '';
    document.getElementById('mem_email').value = m.email || '';
    document.getElementById('mem_gioitinh').value = m.gioitinh || 'Nam';
    document.getElementById('mem_goitap').value = m.goitap || 'Yoga(1 tháng)';
    document.getElementById('mem_thanhtoan').value = m.thanhtoan || 0;
    form.dataset.index = index;
  }
  $('#memberModal').modal('show');
}

function deleteMember(index) {
  if (confirm('Xóa thành viên này?')) {
    let members = JSON.parse(localStorage.getItem('gymMembers'));
    members.splice(index, 1);
    localStorage.setItem('gymMembers', JSON.stringify(members));
    renderMembers();
  }
}

function saveMember() {
  const form = document.getElementById('memberForm');
  const index = form.dataset.index;
  let members = JSON.parse(localStorage.getItem('gymMembers')) || [];

  // Lấy dữ liệu từ form
  const hoten = document.getElementById('mem_hoten').value.trim();
  const sdt = document.getElementById('mem_sdt').value.trim();
  const email = document.getElementById('mem_email').value.trim();
  const gioitinh = document.getElementById('mem_gioitinh').value.trim();
  const goitap = document.getElementById('mem_goitap').value.trim();
  const thanhtoan = document.getElementById('mem_thanhtoan').value.trim();

  if (!hoten || !sdt || !email) {
    alert('Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Email!');
    return;
  }

  let memberId = '';
  let ngaybatdau = '';
  let ngayketthuc = '';

  if (index === '') { // LOGIC THÊM MỚI
    // 1. TÍNH TOÁN ID MỚI
    let maxIdNum = 0;
    if (members.length > 0) {
      members.forEach(m => {
        const num = parseInt((m.id || 'TV000').replace('TV', ''));
        if (!isNaN(num) && num > maxIdNum) {
          maxIdNum = num;
        }
      });
    }
    memberId = 'TV' + String(maxIdNum + 1).padStart(3, '0');

    // 2. TÍNH TOÁN NGÀY THÁNG
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30); // Ngày hiện tại + 30 ngày

    // Định dạng ngày tháng (YYYY-MM-DD) để tương thích MySQL
    const formatDate = (date) => {
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
      const y = date.getFullYear();
      return `${y}-${m}-${d}`;
    };

    ngaybatdau = formatDate(today);
    ngayketthuc = formatDate(futureDate);

  } else { // LOGIC CHỈNH SỬA
    const existingMember = members[index];
    memberId = existingMember.id;
    // Giữ nguyên ngày tháng nếu chỉnh sửa
    ngaybatdau = existingMember.ngaybatdau || '';
    ngayketthuc = existingMember.ngayketthuc || '';
  }

  const member = {
    id: memberId,
    hoten: hoten,
    gioitinh: gioitinh,
    sdt: sdt,
    email: email,
    goitap: goitap,
    ngaybatdau: ngaybatdau,
    ngayketthuc: ngayketthuc,
    thanhtoan: thanhtoan
  };

  if (index === '') {
    members.push(member);
  } else {
    members[index] = member;
  }

  localStorage.setItem('gymMembers', JSON.stringify(members));
  $('#memberModal').modal('hide');
  if (typeof renderMembers === 'function') {
    renderMembers();
  }
}

// === HLV ===
function editTrainer(index) {
  const trainers = JSON.parse(localStorage.getItem('gymTrainers')) || [];
  const form = document.getElementById('trainerForm');

  if (index === -1) {
    form.reset();
    form.dataset.index = '';
  } else {
    const t = trainers[index];
    document.getElementById('trn_hoten').value = t.hoten || '';
    document.getElementById('trn_sdt').value = t.sdt || '';
    document.getElementById('trn_email').value = t.email || '';
    document.getElementById('trn_kinhnghiem').value = t.kinhnghiem || '';
    document.getElementById('trn_thanhtich').value = t.thanhtich || '';
    document.getElementById('trn_goitap').value = t.goitap || 'Yoga';
    document.getElementById('trn_thu').value = t.thu || 'Thứ hai';
    document.getElementById('trn_ca').value = t.ca || 'Sáng';
    form.dataset.index = index;
  }
  $('#trainerModal').modal('show');
}

function deleteTrainer(index) {
  if (confirm('Xóa HLV này?')) {
    let trainers = JSON.parse(localStorage.getItem('gymTrainers'));
    trainers.splice(index, 1);
    localStorage.setItem('gymTrainers', JSON.stringify(trainers));
    renderTrainers();
  }
}

function saveTrainer() {
  const form = document.getElementById('trainerForm');
  const index = form.dataset.index;
  const trainers = JSON.parse(localStorage.getItem('gymTrainers')) || [];

  const hoten = document.getElementById('trn_hoten').value.trim();
  const sdt = document.getElementById('trn_sdt').value.trim();
  const email = document.getElementById('trn_email').value.trim();
  const kinhnghiem = document.getElementById('trn_kinhnghiem').value.trim();
  const thanhtich = document.getElementById('trn_thanhtich').value.trim();
  const goitap = document.getElementById('trn_goitap').value;
  const thu = document.getElementById('trn_thu').value;
  const ca = document.getElementById('trn_ca').value;

  if (!hoten || !sdt || !email) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
    return;
  }

  const trainer = {
    id: index === ''
      ? 'HLV' + String(trainers.length + 1).padStart(3, '0')
      : trainers[index].id,
    hoten: hoten,
    sdt: sdt,
    email: email,
    kinhnghiem: kinhnghiem,
    thanhtich: thanhtich,
    goitap: goitap,
    thu: thu,
    ca: ca
  };

  if (index === '') {
    trainers.push(trainer);
  } else {
    trainers[index] = trainer;
  }

  localStorage.setItem('gymTrainers', JSON.stringify(trainers));
  $('#trainerModal').modal('hide');
  renderTrainers();
}

// === LỊCH ===
function editSchedule(index) {
  const schedules = JSON.parse(localStorage.getItem('gymSchedules')) || [];
  const form = document.getElementById('scheduleForm');

  if (index === -1) {
    form.reset();
    document.getElementById('sch_id').value = 'LIC' + String(schedules.length + 1).padStart(3, '0');
    form.dataset.index = '';
    document.getElementById('sch_type').value = 'Lịch tập';
    updateScheduleType();
  } else {
    const s = schedules[index];
    document.getElementById('sch_id').value = s.id;
    document.getElementById('sch_type').value = s.type;
    document.getElementById('sch_goitap').value = s.goitap;
    document.getElementById('sch_thu').value = s.thu;
    document.getElementById('sch_ca').value = s.ca;
    document.getElementById('sch_trainerId').value = s.trainerId || '';
    document.getElementById('sch_memberId').value = s.memberId || '';
    form.dataset.index = index;
  }
  $('#scheduleModal').modal('show');
}

function deleteSchedule(index) {
  if (confirm('Xóa lịch này?')) {
    let schedules = JSON.parse(localStorage.getItem('gymSchedules'));
    schedules.splice(index, 1);
    localStorage.setItem('gymSchedules', JSON.stringify(schedules));
    renderSchedules();
  }
}

function saveSchedule() {
  const form = document.getElementById('scheduleForm');
  const index = form.dataset.index;
  const schedules = JSON.parse(localStorage.getItem('gymSchedules')) || [];

  const id = document.getElementById('sch_id').value.trim();

  const schedule = {
    id: id,
    type: document.getElementById('sch_type').value,
    goitap: document.getElementById('sch_goitap').value,
    thu: document.getElementById('sch_thu').value,
    ca: document.getElementById('sch_ca').value,
    trainerId: document.getElementById('sch_trainerId').value.trim(),
    memberId: document.getElementById('sch_memberId').value.trim()
  };

  if (index === '') {
    if (schedules.some(s => s.id === id)) {
      alert('Mã lịch đã tồn tại!');
      return;
    }
    schedules.push(schedule);
  } else {
    schedules[index] = schedule;
  }

  localStorage.setItem('gymSchedules', JSON.stringify(schedules));
  $('#scheduleModal').modal('hide');
  renderSchedules();
}

function updateScheduleType() {
  const type = document.getElementById('sch_type').value;
  const trainerIdInput = document.getElementById('sch_trainerId');
  const memberIdInput = document.getElementById('sch_memberId');
  const members = JSON.parse(localStorage.getItem('gymMembers')) || [];
  const trainers = JSON.parse(localStorage.getItem('gymTrainers')) || [];

  if (type === 'Lịch dạy') {
    trainerIdInput.value = trainers.length > 0 ? trainers[0].id : '';
    memberIdInput.value = '';
  } else {
    trainerIdInput.value = '';
    memberIdInput.value = members.length > 0 ? members[0].id : '';
  }
}

// === GÓI TẬP ===
let editingPackageIndex = -1;

function editPackage(index) {
  try {
    editingPackageIndex = index;
    const packages = JSON.parse(localStorage.getItem('gymPackages')) || [];
    const form = document.getElementById('packageForm');
    form.reset();

    if (index >= 0) {
      const p = packages[index];
      document.getElementById('pkg_id').value = p.id;
      document.getElementById('pkg_name').value = p.name;
      document.getElementById('pkg_loiich').value = p.loiich || '';
      document.getElementById('pkg_quyenloi').value = p.quyenloi || '';
      document.getElementById('pkg_hlv').value = p.hlv || '';
      document.getElementById('pkg_price').value = p.price;
    } else {
      const nextNum = packages.length > 0
        ? Math.max(...packages.map(p => {
          const num = parseInt(p.id.replace('GOI', '')) || 0;
          return num;
        })) + 1
        : 1;
      document.getElementById('pkg_id').value = 'GOI' + String(nextNum).padStart(3, '0');
    }
    $('#packageModal').modal('show');
  } catch (error) {
    console.error('Lỗi khi mở popup gói tập:', error);
    alert('Có lỗi khi mở popup. Kiểm tra console.');
  }
}

function savePackage() {
  const packages = JSON.parse(localStorage.getItem('gymPackages')) || [];
  const price = parseInt(document.getElementById('pkg_price').value);

  if (isNaN(price) || price <= 1000) {
    alert('Giá gói tập phải lớn hơn 1.000 VND!');
    return;
  }

  const pkg = {
    id: document.getElementById('pkg_id').value.trim(),
    name: document.getElementById('pkg_name').value,
    loiich: document.getElementById('pkg_loiich').value.trim(),
    quyenloi: document.getElementById('pkg_quyenloi').value.trim(),
    hlv: document.getElementById('pkg_hlv').value.trim(),
    price: price
  };

  if (!pkg.id || !pkg.name) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  if (editingPackageIndex >= 0) {
    packages[editingPackageIndex] = pkg;
  } else {
    if (packages.some(p => p.id === pkg.id)) {
      alert('Mã gói đã tồn tại!');
      return;
    }
    packages.push(pkg);
  }

  localStorage.setItem('gymPackages', JSON.stringify(packages));
  $('#packageModal').modal('hide');
  renderPackages();
}

function deletePackage(index) {
  if (confirm('Bạn có chắc muốn xóa gói tập này?')) {
    let packages = JSON.parse(localStorage.getItem('gymPackages')) || [];
    packages.splice(index, 1);
    localStorage.setItem('gymPackages', JSON.stringify(packages));
    renderPackages();
  }
}

function deleteReview(index) {
  if (confirm('Bạn có chắc muốn xóa đánh giá này?')) {
    let reviews = JSON.parse(localStorage.getItem('gymReviews')) || [];
    reviews.splice(index, 1);
    localStorage.setItem('gymReviews', JSON.stringify(reviews));
    renderReviews();
  }
}