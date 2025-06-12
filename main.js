const form = document.getElementById('registerForm');
const scriptURL = 'https://script.google.com/macros/s/AKfycbwXIQuYT-gQonLD-ksxYXNv-B7aDz9Yq8cufoYdWo_Ft8FMUolNgwMe6z6cczyO7FMD/exec';
const folderId = '1cCqjlAdOqQ2ljkruZH0SQDOh4wAgpEdg';

function previewImage(inputEl, previewEl) {
  inputEl.addEventListener('change', () => {
    const file = inputEl.files[0];
    if (file) {
      previewEl.src = URL.createObjectURL(file);
    }
  });
}

// ตั้ง preview ให้ทั้ง 4 ภาพ
previewImage(document.getElementById('imgFront'), document.getElementById('previewFront'));
previewImage(document.getElementById('imgBack'),  document.getElementById('previewBack'));
previewImage(document.getElementById('imgLeft'),  document.getElementById('previewLeft'));
previewImage(document.getElementById('imgRight'), document.getElementById('previewRight'));

form.addEventListener('submit', e => {
  e.preventDefault();
  Swal.fire({ title: 'กำลังบันทึก...', allowOutsideClick: false, didOpen: ()=> Swal.showLoading() });

  const formData = new FormData(form);
  // แนบ folderId ให้ GAS สร้างโฟลเดอร์ย่อย
  formData.append('folderId', folderId);

  fetch(scriptURL, {
    method: 'POST',
    body: formData,
    mode: 'cors'
  })
  .then(r => r.json())
  .then(response => {
    Swal.close();
    if (response.success) {
      Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success');
      form.reset();
      document.querySelectorAll('.preview').forEach(img=>img.src='');
    } else {
      Swal.fire('เกิดข้อผิดพลาด', response.error, 'error');
    }
  })
  .catch(err => {
    Swal.close();
    Swal.fire('Error', err.message, 'error');
  });
});
