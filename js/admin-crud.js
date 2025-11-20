// js/admin-crud.js - CRUD tĩnh cho admin

// Load data từ localStorage hoặc mock
function getData(key) {
  let data = JSON.parse(localStorage.getItem(key));
  if (!data || data.length === 0) {
    data = adminData[key];
    localStorage.setItem(key, JSON.stringify(data));
  }
  return data;
}

// Render bảng
function renderTable(tableId, data, columns, renderRow) {
  const tbody = document.getElementById(tableId);
  tbody.innerHTML = '';
  data.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = renderRow(item, index);
    tbody.appendChild(tr);
  });
}

// Xóa
function deleteItem(key, index, tableId, columns, renderRow) {
  if (confirm('Xóa mục này?')) {
    let data = JSON.parse(localStorage.getItem(key));
    data.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(data));
    renderTable(tableId, data, columns, renderRow);
  }
}

// Sửa (mở modal đơn giản)
function editItem(key, index, tableId, columns, renderRow, formId) {
  const data = JSON.parse(localStorage.getItem(key));
  const item = data[index];
  document.getElementById(formId).dataset.index = index;
  // Điền form
  document.querySelectorAll(`#${formId} input, #${formId} textarea`).forEach(input => {
    if (item[input.name] !== undefined) input.value = item[input.name];
  });
  $(`#${formId}`).modal('show');
}

// Lưu form (thêm/sửa)
function saveForm(key, formId, tableId, columns, renderRow) {
  const form = document.getElementById(formId);
  const index = form.dataset.index;
  let data = JSON.parse(localStorage.getItem(key));
  const item = {};
  new FormData(form).forEach((value, key) => item[key] = value);
  if (index) {
    data[parseInt(index)] = item;
  } else {
    item.id = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    data.push(item);
  }
  localStorage.setItem(key, JSON.stringify(data));
  renderTable(tableId, data, columns, renderRow);
  $(`#${formId}`).modal('hide');
  form.reset();
  delete form.dataset.index;
}

// js/admin-render.js

// === LỊCH TẬP ===
function editClass(i) {
  const data = JSON.parse(localStorage.getItem('gymClasses'));
  const c = data[i];
  $('#classModal').modal('show');
  document.getElementById('editIndex').value = i;
  document.getElementById('day').value = c.day;
  document.getElementById('time').value = c.time;
  document.getElementById('name').value = c.name;
  document.getElementById('trainer').value = c.trainer;
  document.getElementById('type').value = c.type;
}

function deleteClass(i) {
  if (confirm('Xóa lớp này?')) {
    let data = JSON.parse(localStorage.getItem('gymClasses'));
    data.splice(i, 1);
    localStorage.setItem('gymClasses', JSON.stringify(data));
    window.renderAdminClasses();
  }
}

function saveClass() {
  const i = document.getElementById('editIndex').value;
  const cls = {
    day: document.getElementById('day').value,
    time: document.getElementById('time').value,
    name: document.getElementById('name').value,
    trainer: document.getElementById('trainer').value,
    type: document.getElementById('type').value
  };
  let data = JSON.parse(localStorage.getItem('gymClasses'));
  i === '' ? data.push(cls) : data[i] = cls;
  localStorage.setItem('gymClasses', JSON.stringify(data));
  $('#classModal').modal('hide');
  document.getElementById('classForm').reset();
  window.renderAdminClasses();
}

// === GÓI TẬP ===
function editService(i) {
  const data = JSON.parse(localStorage.getItem('gymServices'));
  const s = data[i];
  $('#serviceModal').modal('show');
  document.getElementById('editIndex').value = i;
  document.getElementById('name').value = s.name;
  document.getElementById('price').value = s.price;
  document.getElementById('trainer').value = s.trainer;
  document.getElementById('image').value = s.image;
  document.getElementById('desc').value = s.desc;
}

function deleteService(i) {
  if (confirm('Xóa gói này?')) {
    let data = JSON.parse(localStorage.getItem('gymServices'));
    data.splice(i, 1);
    localStorage.setItem('gymServices', JSON.stringify(data));
    window.renderAdminServices();
  }
}

function saveService() {
  const i = document.getElementById('editIndex').value;
  const srv = {
    id: i === '' ? Date.now().toString() : JSON.parse(localStorage.getItem('gymServices'))[i].id,
    name: document.getElementById('name').value,
    price: +document.getElementById('price').value,
    trainer: document.getElementById('trainer').value,
    image: document.getElementById('image').value,
    desc: document.getElementById('desc').value
  };
  let data = JSON.parse(localStorage.getItem('gymServices'));
  i === '' ? data.push(srv) : data[i] = srv;
  localStorage.setItem('gymServices', JSON.stringify(data));
  $('#serviceModal').modal('hide');
  document.getElementById('serviceForm').reset();
  window.renderAdminServices();
}

// === ĐỘI NGŨ ===
function editTeam(i) {
  const data = JSON.parse(localStorage.getItem('gymTeam'));
  const t = data[i];
  $('#teamModal').modal('show');
  document.getElementById('editIndex').value = i;
  document.getElementById('name').value = t.name;
  document.getElementById('role').value = t.role;
  document.getElementById('image').value = t.image;
}

function deleteTeam(i) {
  if (confirm('Xóa HLV này?')) {
    let data = JSON.parse(localStorage.getItem('gymTeam'));
    data.splice(i, 1);
    localStorage.setItem('gymTeam', JSON.stringify(data));
    window.renderAdminTeam();
  }
}

function saveTeam() {
  const i = document.getElementById('editIndex').value;
  const member = {
    name: document.getElementById('name').value,
    role: document.getElementById('role').value,
    image: document.getElementById('image').value
  };
  let data = JSON.parse(localStorage.getItem('gymTeam'));
  i === '' ? data.push(member) : data[i] = member;
  localStorage.setItem('gymTeam', JSON.stringify(data));
  $('#teamModal').modal('hide');
  document.getElementById('teamForm').reset();
  window.renderAdminTeam();
}