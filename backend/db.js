const { Pool } = require('pg');
require('dotenv').config(); // โหลดค่าจากไฟล์ .env (ที่สร้างไว้ด้านนอก)

// สร้าง Connection Pool สำหรับจัดการคิวเชื่อมต่อฐานข้อมูล
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'libbook',
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;