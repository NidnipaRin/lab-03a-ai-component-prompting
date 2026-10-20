# ✅ Checklist 5 จุด — ตรวจงานด้วยตนเอง

### Smart Todo App — TodoItem Component

---

## จุดที่ 1 — ระบุ Requirement & Context ครบถ้วน

> มีการระบุชื่อ Component (TodoItem) และระบุบริบทว่านำไปใช้ในระบบ Smart Todo UI

### ✅ ผ่าน

**สิ่งที่เช็ค:**

- ชื่อ Component ถูกกำหนดชัดเจนว่า `TodoItem` ทั้งชื่อไฟล์และชื่อฟังก์ชัน
- ระบุบริบทการใช้งานใน comment หัวไฟล์ `TodoItem.jsx` ว่าเป็นส่วนหนึ่งของ **Smart Todo UI**
- อธิบาย Parent-Child relationship ว่า Parent คือ `App.jsx` และเรียก TodoItem ผ่าน `.map()`
- ระบุไว้ใน `README.md` หัวข้อ Component Architecture ด้วย

---

## จุดที่ 2 — ระบุ Props & Events ชัดเจน

> กำหนด Props (title, priority, dueDate, completed) และ Event Callback (onToggle, onDelete) ถูกต้องตามโจทย์

### ✅ ผ่าน

**สิ่งที่เช็ค:**

- Props ครบทั้ง 4 ตัว: `title`, `priority`, `dueDate`, `completed`
- Event callback ครบทั้ง 2 ตัว: `onToggle`, `onDelete`
- กำหนดชนิดข้อมูลด้วย **PropTypes** ทุกตัว ป้องกันการส่งค่าผิดประเภท
- กำหนด **defaultProps** สำหรับ props ที่ไม่ required เพื่อป้องกัน undefined
- ตั้งชื่อ props ตรงตามโจทย์ทุกตัว ไม่มีการเปลี่ยนชื่อ

---

## จุดที่ 3 — กำหนด Constraint ควบคุมคุณภาพ Code

> สั่งให้เขียน Code อ่านง่าย ไม่ใช้ External Library เพิ่มเติม และรองรับ Responsive

### ✅ ผ่าน

**สิ่งที่เช็ค:**

| Constraint               | สิ่งที่ตรวจ                                                                               | ผล  |
| ------------------------ | ----------------------------------------------------------------------------------------- | --- |
| **Code อ่านง่าย**        | ชื่อตัวแปรสื่อความหมาย เช่น `priorityMap`, `priorityInfo`, `formatDate`, `completedCount` | ✅  |
| **มี comment**           | มี comment อธิบายทุก section ทั้งใน JSX และ logic                                         | ✅  |
| **ไม่ใช้ Library เพิ่ม** | ตรวจ `package.json` — มีแค่ `react`, `react-dom`, `prop-types`, `react-scripts` เท่านั้น  | ✅  |
| **Responsive**           | มี `@media (max-width: 480px)` ใน `TodoItem.css` เปลี่ยน layout เป็น column บนมือถือ      | ✅  |
| **Functional Component** | ใช้ `function TodoItem()` ไม่มี Class Component                                           | ✅  |
| **ใช้ hooks เท่านั้น**   | `App.jsx` ใช้ `useState` เท่านั้น ไม่มี lifecycle method แบบเก่า                          | ✅  |

---

## จุดที่ 4 — ขอคำอธิบายเพิ่มเติม

> กำหนดให้ AI อธิบายหลักการทำงานของ Code เพื่อช่วยในการเรียนรู้และทำความเข้าใจ

### ✅ ผ่าน

**สิ่งที่เช็ค:**

| หัวข้อที่อธิบาย                         | อธิบายว่าอย่างไร                                                      |
| --------------------------------------- | --------------------------------------------------------------------- |
| **Lifting State Up**                    | Parent เก็บ state, Child แค่รับ props และส่ง event กลับ               |
| **`priorityMap` Object**                | อธิบายว่าทำไมใช้ Object แทน if/else — เพิ่มระดับใหม่ได้ง่ายกว่า       |
| **`??` Nullish Coalescing**             | อธิบาย fallback กรณี priority ไม่ตรงกับ key ใดใน map                  |
| **`formatDate` + `toLocaleDateString`** | อธิบาย locale `'th-TH'` ที่แปลงปีเป็น พ.ศ. อัตโนมัติ (+543)           |
| **Conditional className**               | อธิบาย Template Literal + ternary operator สำหรับต่อ CSS class        |
| **`onClick={onToggle}`**                | อธิบายว่านี่คือ "การส่ง event กลับ Parent" ตามแนวคิด Lifting State Up |
| **`aria-label`**                        | อธิบายว่าเพิ่มเพื่อ Accessibility (screen reader)                     |
| **PropTypes**                           | อธิบายว่าทำงานตอน dev เท่านั้น และถูกตัดออกตอน build production       |
| **defaultProps**                        | อธิบายว่าป้องกัน undefined error เมื่อ Parent ไม่ส่ง prop มา          |

> **หมายเหตุ:** ข้อนี้ตอนดูครั้งแรกผ่านแค่บางส่วน บางส่วนไม่ครบ เลยแก้ไขโดยมีการเพิ่ม comment ละเอียดใน `TodoItem.jsx` เพิ่มเติมแล้ว

---

## จุดที่ 5 — พร้อมใช้งานจริง

> Code ที่ AI เจนออกมาสามารถนำไปเสียบเข้ากับ App หลัก และส่งค่า Event กลับหา Parent ได้ทันที

### ✅ ผ่าน

**สิ่งที่เช็ค:**

- `TodoItem` export เป็น default export พร้อม import ใช้ในไฟล์อื่นได้ทันที
- `App.jsx` ทดสอบเรียกใช้จริงผ่าน `.map()` แล้ว
- `onToggle` และ `onDelete` ส่งกลับ Parent และ Parent จัดการ state ได้ถูกต้อง
- รันจริงด้วย `npm start` → **Compiled successfully** ที่ `http://localhost:3000`
- ทดสอบกดปุ่ม Toggle และ Delete ใน Browser แล้วทำงานได้ปกติ

---

## 📊 สรุปผลการตรวจ

| จุดที่ | หัวข้อ                | ผล      | หมายเหตุ                                       |
| ------ | --------------------- | ------- | ---------------------------------------------- |
| 1      | Requirement & Context | ✅ ผ่าน | ระบุชัดเจนทั้งในโค้ดและ README                 |
| 2      | Props & Events        | ✅ ผ่าน | ครบทุกตัว มี PropTypes และ defaultProps        |
| 3      | Constraint            | ✅ ผ่าน | ไม่มี library เพิ่ม, responsive, code อ่านง่าย |
| 4      | คำอธิบาย              | ✅ ผ่าน | เพิ่ม comment ละเอียดใน `TodoItem.jsx` แล้ว    |
| 5      | พร้อมใช้งานจริง       | ✅ ผ่าน | รันได้จริง, toggle/delete ทำงานถูกต้อง         |
