# 📚 ระบบบันทึกข้อมูลหนังสือห้องสมุด (libbook) - Midterm Project

[![GitHub Actions CI](https://img.shields.io/github/actions/workflow/status/HanRyRGB06/midterm-devops-libbook-68319010012/ci.yml?branch=main&style=flat-square&logo=github&label=CI%20Pipeline)](https://github.com/HanRyRGB06/midterm-devops-libbook-68319010012/actions)
[![Docker Hub API](https://img.shields.io/docker/v/henryrgb012/libbook-api?sort=semver&style=flat-square&logo=docker&label=API%20Image)](https://hub.docker.com/r/henryrgb012/libbook-api)
[![Docker Hub Web](https://img.shields.io/docker/v/henryrgb012/libbook-web?sort=semver&style=flat-square&logo=docker&label=Web%20Image)](https://hub.docker.com/r/henryrgb012/libbook-web)

โปรเจกต์นี้เป็นส่วนหนึ่งของคะแนนสอบปฏิบัติกลางภาควิชา DevOps (Midterm Examination) พัฒนาขึ้นด้วยสถาปัตยกรรมแยกส่วนหน้าบ้าน (Frontend) และหลังบ้าน (Backend) รันอยู่บนระบบตู้คอนเทนเนอร์ (Docker) พร้อมติดตั้งระบบตรวจสอบโค้ดอัตโนมัติ (CI Pipeline)

---

## 👤 ข้อมูลผู้พัฒนาระบบ
* **ชื่อ-นามสกุล:** นายวิษณุสรรค์ แก่นตา
* **รหัสนักศึกษา:** 68319010012
* **ระดับชั้น/กลุ่ม:** ปวส.2/1 สาขาเทคโนโลยีสารสนเทศ

---

## 📊 ตารางสรุปรายการข้อมูล API (Backend Endpoints)

ระบบหลังบ้านใช้ Node.js Express เชื่อมต่อเข้ากับฐานข้อมูล PostgreSQL โดยมีชุดเส้นทาง API ดังนี้:

| ลำดับ | วิธีการ (Method) | เส้นทาง (Endpoint) | รายละเอียด/หน้าที่ของระบบ | สถานะผลลัพธ์ (Status) |
| :---: | :---: | :---: | :--- | :---: |
| 1 | `GET` | `/health` | **[โจทย์บังคับ]** ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์หลังบ้าน | `200 OK` |
| 2 | `GET` | `/api/books` | ดึงข้อมูลรายการหนังสือทั้งหมดในฐานข้อมูล (เรียงจากใหม่ไปเก่า) | `200 OK` |
| 3 | `GET` | `/api/books/:id` | ดึงข้อมูลรายละเอียดของหนังสือเฉพาะเล่ม ด้วยรหัส ID | `200 OK` / `404` |
| 4 | `POST` | `/api/books` | เพิ่มข้อมูลทะเบียนหนังสือเล่มใหม่เข้าไปในฐานข้อมูลห้องสมุด | `201 Created` |
| 5 | `PUT` | `/api/books/:id` | **[ฟังก์ชันพิเศษ]** แก้ไขและอัปเดตข้อมูลรายละเอียดหนังสือตาม ID | `200 OK` / `404` |
| 6 | `DELETE` | `/api/books/:id` | ลบข้อมูลหนังสือออกจากระบบฐานข้อมูลด้วยรหัส ID | `200 OK` / `404` |

---

## 🚀 วิธีการสั่งรันระบบ (How to Run Project)

โปรเจกต์นี้รองรับการรันผ่านระบบ **Docker Compose** เพื่อจำลองตู้คอนเทนเนอร์ทั้งระบบขึ้นมาพร้อมกัน (Frontend + Backend + PostgreSQL) โดยทำตามขั้นตอนดังนี้:

### 🛠️ สิ่งที่ต้องมีในเครื่องก่อน (Prerequisites)
* ติดตั้ง **Docker** และ **Docker Desktop**
* ติดตั้ง **Git**

### 🏃‍♂️ ขั้นตอนการรันระบบ

1. **โคลนโปรเจกต์ลงมาในเครื่องคอมพิวเตอร์:**
   ```bash
   git clone https://github.com/HanRyRGB06/midterm-devops-libbook-68319010012.git
cd midterm-devops-libbook-68319010012