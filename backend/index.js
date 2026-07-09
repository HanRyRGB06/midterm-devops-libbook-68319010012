const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors()); // อนุญาตให้หน้าบ้านดึงข้อมูลข้ามโดเมนได้
app.use(express.json()); // อนุญาตให้รับส่งข้อมูลในรูปแบบ JSON

// [โจทย์บังคับ] เส้นตรวจสอบสถานะระบบ
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', version: '1.0.0' });
});

// เส้นที่ 1: ดึงข้อมูลหนังสือทั้งหมด (GET /api/books)
app.get('/api/books', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM books ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นที่ 2: ดึงข้อมูลหนังสือเฉพาะเล่มด้วย ID (GET /api/books/:id)
app.get('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'ไม่พบหนังสือเล่มนี้' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นที่ 3: เพิ่มข้อมูลหนังสือใหม่ (POST /api/books)
app.post('/api/books', async (req, res) => {
    try {
        const { isbn, title, author, category, year, status } = req.body;
        const result = await db.query(
            'INSERT INTO books (isbn, title, author, category, year, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [isbn, title, author, category, year, status || 'พร้อมให้ยืม']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นที่ 4: แก้ไขข้อมูลหนังสือ (PUT /api/books/:id)
app.put('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isbn, title, author, category, year, status } = req.body;
        const result = await db.query(
            'UPDATE books SET isbn=$1, title=$2, author=$3, category=$4, year=$5, status=$6 WHERE id=$7 RETURNING *',
            [isbn, title, author, category, year, status, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'ไม่พบหนังสือเล่มนี้' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// เส้นที่ 5: ลบข้อมูลหนังสือ (DELETE /api/books/:id)
app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'ไม่พบหนังสือเล่มนี้' });
        res.json({ message: 'ลบหนังสือเรียบร้อยแล้ว' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));