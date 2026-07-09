# ใช้ Nginx ซึ่งเป็น Web Server ยอดนิยมเป็น Base Image
FROM nginx:alpine

# คัดลอกไฟล์หน้าเว็บทั้งหมดไปไว้ในโฟลเดอร์ที่ Nginx ใช้เสิร์ฟหน้าเว็บ
COPY . /usr/share/nginx/html

# เปิดพอร์ต 80 ซึ่งเป็นพอร์ตมาตรฐานของเว็บเซิร์ฟเวอร์
EXPOSE 80