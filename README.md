# 📝 Smart Todo App

แอปจัดการรายการงาน (Todo List) เขียนด้วย **React** โดยใช้โครงสร้างแบบ **Parent-Child Component**

---

## 🗂️ โครงสร้างโปรเจกต์

```
lab3A/
├── public/
│   └── index.html          # HTML หลัก — มี <div id="root"> เป็นจุดเกาะของ React
├── src/
│   ├── index.js            # Entry point — เชื่อม React เข้ากับ HTML
│   ├── index.css           # Global CSS
│   ├── App.jsx             # 👨‍👧 Parent Component — เก็บ state ของงานทั้งหมด
│   ├── App.css             # สไตล์ของ App
│   ├── TodoItem.jsx        # 🧩 Child Component — แสดงรายการงานแต่ละชิ้น
│   └── TodoItem.css        # สไตล์ของ TodoItem
├── package.json            # รายการ dependencies และ scripts
└── README.md               # ไฟล์นี้
```

---

## ⚙️ เทคโนโลยีที่ใช้

| เทคโนโลยี | รายละเอียด |
|---|---|
| [React 18](https://react.dev/) | UI Library หลัก |
| [Create React App](https://create-react-app.dev/) | Build tool / Dev server |
| [PropTypes](https://www.npmjs.com/package/prop-types) | ตรวจสอบชนิดของ props |
| CSS ธรรมดา | จัดสไตล์ ไม่ใช้ library เพิ่ม |

---

## 🚀 วิธีติดตั้งและรัน

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. รัน Development Server

```bash
npm start
```

เปิดเบราว์เซอร์ที่ **[http://localhost:3000](http://localhost:3000)**

### 3. Build สำหรับ Production (ถ้าต้องการ)

```bash
npm run build
```

---

## 🧩 Component Architecture

แอปนี้แบ่ง Component แบบ **Parent-Child** ดังนี้

```
App  (Parent)
 │
 ├── เก็บ state: todos[]
 ├── ฟังก์ชัน: handleToggle, handleDelete, handleAddTodo
 │
 └── TodoItem × n  (Child) — render ผ่าน .map()
      ├── รับ props: title, priority, dueDate, completed
      └── ส่ง event กลับ: onToggle(), onDelete()
```

> **หลักการ:** Parent เป็นคนเก็บและจัดการ state ทั้งหมด  
> Child (TodoItem) รับข้อมูลผ่าน props และส่ง event กลับผ่าน callback เท่านั้น

---

## 🧩 TodoItem Component

### Props ที่รับเข้า

| Prop | Type | Default | คำอธิบาย |
|---|---|---|---|
| `title` | `string` | *(required)* | ชื่องาน |
| `priority` | `'low'` \| `'medium'` \| `'high'` | `'medium'` | ระดับความสำคัญ |
| `dueDate` | `string` | `''` | วันครบกำหนด รูปแบบ `YYYY-MM-DD` |
| `completed` | `bool` | `false` | สถานะว่าเสร็จแล้วหรือยัง |
| `onToggle` | `func` | *(required)* | callback เมื่อกดปุ่ม toggle |
| `onDelete` | `func` | *(required)* | callback เมื่อกดปุ่ม delete |

### ตัวอย่างการใช้งาน

```jsx
<TodoItem
  title="เขียน React Component"
  priority="high"
  dueDate="2026-10-20"
  completed={false}
  onToggle={() => handleToggle(id)}
  onDelete={() => handleDelete(id)}
/>
```

### การแสดงผล Priority

| ค่า | ป้ายสี | สี |
|---|---|---|
| `low` | ต่ำ | 🟢 เขียว |
| `medium` | กลาง | 🟡 เหลือง |
| `high` | สูง | 🔴 แดง |

---

## ✨ ฟีเจอร์

- ✅ เพิ่มงานใหม่ได้ (ชื่อ + priority + วันครบกำหนด)
- ✅ Toggle สถานะเสร็จ/ไม่เสร็จ (ขีดฆ่า + ทำสีจาง)
- ✅ ลบรายการงาน
- ✅ ป้ายสีแสดง priority อ่านง่าย
- ✅ วันที่แสดงเป็นภาษาไทย เช่น `20 ต.ค. 2569`
- ✅ Responsive — ใช้ได้ทั้งมือถือและเดสก์ท็อป

---

## 📚 แนวคิดที่ใช้ใน Lab นี้

| แนวคิด | ตัวอย่างในโค้ด |
|---|---|
| **Functional Component** | `function TodoItem({ ... }) {}` |
| **useState Hook** | เก็บ `todos[]` ใน `App.jsx` |
| **Props** | ส่งข้อมูลจาก App → TodoItem |
| **Callback / Lifting State Up** | `onToggle`, `onDelete` ส่งกลับ Parent |
| **Array.map()** | render TodoItem หลายอัน |
| **PropTypes** | ตรวจสอบชนิด props ตอน dev |
| **Conditional Rendering** | `completed ? 'ขีดฆ่า' : 'ปกติ'` |
