// URL ของหลังบ้าน (Backend API) ที่เราจะสั่งงาน
const API_URL = 'http://localhost:5000/api/books';

// ฟังก์ชัน: โหลดข้อมูลหนังสือทั้งหมดจาก API มาวาดเป็นตาราง
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        const tbody = document.getElementById('bookTableBody');
        tbody.innerHTML = ''; // เคลียร์ข้อมูลเก่าในตารางก่อน

        if (books.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#999;">ยังไม่มีข้อมูลหนังสือในระบบ</td></tr>`;
            return;
        }

        books.forEach(book => {
            // กำหนดสีของ Badge ตามสถานะหนังสือ
            let statusBadge = '';
            if (book.status === 'พร้อมให้ยืม') statusBadge = `<span class="badge badge-ready">พร้อมให้ยืม</span>`;
            else if (book.status === 'ถูกยืม') statusBadge = `<span class="badge badge-borrowed">ถูกยืม</span>`;
            else statusBadge = `<span class="badge badge-damaged">ชำรุด</span>`;

            tbody.innerHTML += `
                <tr>
                    <td><strong>${book.isbn}</strong></td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.year}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn-delete" onclick="deleteBook(${book.id})">🗑️ ลบ</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
    }
}

// ฟังก์ชัน: รับค่าจากฟอร์ม แล้วส่งไปบันทึกที่หลังบ้าน (POST)
async function saveBook() {
    const isbn = document.getElementById('isbn').value.trim();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const category = document.getElementById('category').value.trim();
    const year = document.getElementById('year').value.trim();
    const status = document.getElementById('status').value;

    // ตรวจสอบขั้นต้นว่ากรอกข้อมูลครบถ้วนหรือไม่
    if (!isbn || !title || !author || !category || !year) {
        alert('กรุณากรอกข้อมูลหนังสือให้ครบทุกช่องก่อนบันทึกครับ!');
        return;
    }

    const newBook = {
        isbn,
        title,
        author,
        category,
        year: parseInt(year),
        status
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        });

        if (response.ok) {
            alert('🎉 บันทึกข้อมูลหนังสือเรียบร้อย!');
            clearForm();
            fetchBooks(); // โหลดข้อมูลใหม่มาแสดงในตารางทันที
        } else {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ฟังก์ชัน: ลบข้อมูลหนังสือด้วย ID (DELETE)
async function deleteBook(id) {
    if (confirm('⚠️ คุณต้องการลบข้อมูลหนังสือเล่มนี้ออกจากระบบใช่หรือไม่?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchBooks(); // โหลดตารางใหม่หลังจากลบสำเร็จ
            } else {
                alert('ไม่สามารถลบข้อมูลได้');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// ฟังก์ชัน: เคลียร์ช่องกรอกข้อมูลให้ว่างเปล่าหลังบันทึกเสร็จ
function clearForm() {
    document.getElementById('isbn').value = '';
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('category').value = '';
    document.getElementById('year').value = '';
    document.getElementById('status').value = 'พร้อมให้ยืม';
}

// สั่งให้ทำงานอัตโนมัติทันทีที่หน้าเว็บโหลดเสร็จ
window.onload = fetchBooks;