# ใช้ Node.js เวอร์ชัน 20 เป็น Base Image
FROM node:20-alpine

# สร้างโฟลเดอร์สำหรับทำงานใน Container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json เพื่อไปติดตั้ง Dependencies
COPY package*.json ./

# รันคำสั่งติดตั้ง Library
RUN npm install

# คัดลอกโค้ดทั้งหมดของ backend เข้าไป
COPY . .

# เปิดพอร์ต 5000 ตามที่ตั้งไว้ใน index.js
EXPOSE 5000

# คำสั่งสำหรับเริ่มรันเซิร์ฟเวอร์
CMD ["npm", "start"]