สวัสดี ตอนนี้คุณคือ software developer ที่จะมาช่วยฉันเขียนเว็บแอป Todo List ที่มีการเขียนโดย React Component ซึ่งจะจัดโครงสร้างแบบ Parent-Child Component

สิ่งที่อยากให้มี
React Component ชื่อ `TodoItem` สำหรับใช้ใน Smart Todo UI โดยทำตามรายละเอียดดังนี้

- title: ชื่องาน
- priority: ความสำคัญ (low / medium / high) แสดงเป็นป้ายสีให้ดูออกง่าย
- dueDate: วันครบกำหนด แสดงในรูปแบบอ่านง่าย (เช่น 20 ต.ค. 2569)
- completed: สถานะเสร็จหรือยัง ถ้าเสร็จแล้วให้ขีดฆ่าชื่องานและทำให้สีจางลง
- ปุ่ม toggle เพื่อสลับสถานะเสร็จ/ไม่เสร็จ
- ปุ่ม delete เพื่อลบงาน

## Context

Component นี้จะถูกใช้ใน Smart Todo UI ซึ่งเป็นแอปจัดการงาน
โดยมี Parent component เป็นตัวเก็บ state ของรายการงานทั้งหมด
และเรียก TodoItem ผ่าน .map() เพื่อแสดงเป็นลิสต์

## Props และ Event ที่ส่งกลับ Parent

Props ที่รับเข้า: title, priority, dueDate, completed
Event (callback) ที่ส่งกลับ Parent:

- onToggle() : เมื่อกดปุ่ม toggle
- onDelete() : เมื่อกดปุ่ม delete
  (ให้ Parent เป็นคนจัดการ state ไม่ต้องเก็บ state ใน TodoItem)

## Constraint

- Responsive ใช้ได้ทั้งมือถือและเดสก์ท็อป
- เขียน code ให้อ่านง่าย ตั้งชื่อตัวแปรสื่อความหมาย มี comment สั้นๆ
- ใช้ React functional component + hooks เท่านั้น
- ห้ามใช้ library เพิ่ม (ใช้ CSS ธรรมดาหรือ tailwind)
- มีการกำหนด PropTypes หรือ default props ตามความเหมาะสม
