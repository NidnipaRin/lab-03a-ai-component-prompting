import PropTypes from 'prop-types';
import './TodoItem.css';

/* ══════════════════════════════════════════════════════════
   TodoItem — Child Component สำหรับแสดงรายการงานแต่ละชิ้น

   หลักการทำงาน:
   - Component นี้ไม่เก็บ state เอง (Stateless Component)
   - รับข้อมูลจาก Parent ผ่าน props เท่านั้น
   - เมื่อผู้ใช้กดปุ่ม จะเรียก callback (onToggle/onDelete)
     เพื่อให้ Parent จัดการเปลี่ยน state แทน
   - แนวคิดนี้เรียกว่า "Lifting State Up"
   ══════════════════════════════════════════════════════════ */
function TodoItem({ title, priority, dueDate, completed, onToggle, onDelete }) {

  /* ── priorityMap: ตารางแปลง priority string → ป้ายสี ──
     ใช้ Object แทน if/else เพื่อให้โค้ดอ่านง่ายและเพิ่มระดับใหม่ได้ง่าย
     key   = ค่า priority ที่รับมาจาก props ('low' | 'medium' | 'high')
     label = ข้อความภาษาไทยที่จะแสดงบนป้าย
     className = ชื่อ CSS class ที่ควบคุมสีของป้าย (ดูใน TodoItem.css) */
  const priorityMap = {
    low:    { label: 'ต่ำ',   className: 'badge--low' },
    medium: { label: 'กลาง',  className: 'badge--medium' },
    high:   { label: 'สูง',   className: 'badge--high' },
  };

  /* ?? คือ Nullish Coalescing Operator
     ถ้า priority ไม่ตรงกับ key ใดใน priorityMap (เช่น undefined)
     จะ fallback ไปใช้ค่า 'medium' แทน เพื่อป้องกัน error */
  const priorityInfo = priorityMap[priority] ?? priorityMap.medium;

  /* ── formatDate: แปลง ISO date string → วันที่ภาษาไทย ──
     รับ: "2026-10-20"  (รูปแบบ ISO 8601 มาตรฐาน)
     คืน: "20 ต.ค. 2569" (พุทธศักราช ภาษาไทย)

     toLocaleDateString('th-TH', options) ทำสิ่งนี้ให้อัตโนมัติ:
     - 'th-TH' = ใช้ locale ภาษาไทย
     - year: 'numeric' = แปลงเป็นปี พ.ศ. อัตโนมัติ (+543)
     - month: 'short'  = ชื่อเดือนย่อ เช่น "ต.ค."
     - day: 'numeric'  = ตัวเลขวัน */
  const formatDate = (dateStr) => {
    if (!dateStr) return '—'; // ถ้าไม่มีวัน ให้แสดง dash แทน
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
      day:   'numeric',
      month: 'short',
      year:  'numeric',
    });
  };

  /* ── JSX: ส่วนแสดงผล (View) ──
     className ใช้ Template Literal เพื่อต่อ class แบบ conditional
     เช่น completed=true → className="todo-item todo-item--completed"
          completed=false → className="todo-item" */
  return (
    <div className={`todo-item ${completed ? 'todo-item--completed' : ''}`}>

      {/* ────── ส่วนซ้าย: ข้อมูลงาน ────── */}
      <div className="todo-item__content">

        {/* ชื่องาน
            ถ้า completed=true → เพิ่ม class "todo-item__title--done"
            ซึ่งใน CSS จะ text-decoration: line-through และทำสีจาง */}
        <p className={`todo-item__title ${completed ? 'todo-item__title--done' : ''}`}>
          {title}
        </p>

        {/* แถวข้อมูลย่อย: ป้าย priority + วันครบกำหนด */}
        <div className="todo-item__meta">

          {/* ป้าย priority — class จะเปลี่ยนตามค่าที่ได้จาก priorityMap */}
          <span className={`badge ${priorityInfo.className}`}>
            {priorityInfo.label}
          </span>

          {/* วันที่ผ่านฟังก์ชัน formatDate เพื่อแปลงเป็นภาษาไทยก่อนแสดง */}
          <span className="todo-item__due-date">
            📅 {formatDate(dueDate)}
          </span>
        </div>
      </div>

      {/* ────── ส่วนขวา: ปุ่มกด ────── */}
      <div className="todo-item__actions">

        {/* ปุ่ม Toggle — สลับสถานะเสร็จ/ไม่เสร็จ
            onClick={onToggle} คือการ "ส่ง event กลับ Parent"
            Parent จะรับและเปลี่ยน state ของ todo นั้น
            aria-label ช่วย Accessibility (screen reader อ่านออก) */}
        <button
          className={`btn btn--toggle ${completed ? 'btn--toggle-done' : ''}`}
          onClick={onToggle}
          aria-label={completed ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
          title={completed ? 'ยังไม่เสร็จ' : 'เสร็จแล้ว'}
        >
          {/* ข้อความบนปุ่มเปลี่ยนตามสถานะ completed */}
          {completed ? '↩ เลิกทำ' : '✓ เสร็จ'}
        </button>

        {/* ปุ่ม Delete — ลบรายการ
            onClick={onDelete} ส่ง event กลับ Parent เพื่อกรอง todo นี้ออกจาก array */}
        <button
          className="btn btn--delete"
          onClick={onDelete}
          aria-label="ลบรายการนี้"
          title="ลบ"
        >
          🗑
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PropTypes — ระบบตรวจสอบชนิดของ props ตอน Development

   ทำงานอย่างไร:
   - React จะ warning ใน Console ถ้า props ผิดชนิด
   - ใช้ตอน dev เท่านั้น (ถูกตัดออกตอน build production)
   - isRequired = ถ้าไม่ส่ง prop นี้มา จะ warning ทันที
   ══════════════════════════════════════════════════════════ */
TodoItem.propTypes = {
  title:     PropTypes.string.isRequired,           // ชื่องาน — ห้ามว่าง
  priority:  PropTypes.oneOf(['low', 'medium', 'high']), // รับได้แค่ 3 ค่านี้เท่านั้น
  dueDate:   PropTypes.string,                      // รูปแบบ ISO: "YYYY-MM-DD"
  completed: PropTypes.bool,                        // true = เสร็จ, false = ยังไม่เสร็จ
  onToggle:  PropTypes.func.isRequired,             // callback — ห้ามว่าง
  onDelete:  PropTypes.func.isRequired,             // callback — ห้ามว่าง
};

/* ── Default Props — ค่าเริ่มต้นเมื่อ Parent ไม่ส่ง prop มา ──
   ป้องกัน undefined error และทำให้ Component ทำงานได้แม้ข้อมูลไม่ครบ */
TodoItem.defaultProps = {
  priority:  'medium', // ถ้าไม่บอก priority → ใช้ระดับกลาง
  dueDate:   '',       // ถ้าไม่มีวัน → formatDate จะแสดง "—"
  completed: false,    // ถ้าไม่บอกสถานะ → ถือว่ายังไม่เสร็จ
};

export default TodoItem;
