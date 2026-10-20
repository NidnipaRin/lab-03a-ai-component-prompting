import { useState } from 'react';
import TodoItem from './TodoItem';
import './App.css';

/* ────────────────────────────────────────────────
   App (Parent Component)
   - เก็บ state ของ todos ทั้งหมด
   - ส่ง props และ callback ลง TodoItem
   - แสดงฟอร์มเพิ่มงานใหม่
   ──────────────────────────────────────────────── */
function App() {
  /* ── State: รายการงาน ── */
  const [todos, setTodos] = useState([
    { id: 1, title: 'เขียน React Component',       priority: 'high',   dueDate: '2026-10-20', completed: false },
    { id: 2, title: 'ออกแบบ UI/UX ให้เสร็จ',       priority: 'medium', dueDate: '2026-10-25', completed: true  },
    { id: 3, title: 'เขียน Unit Test',              priority: 'low',    dueDate: '2026-11-01', completed: false },
    { id: 4, title: 'Deploy ขึ้น Production',        priority: 'high',   dueDate: '2026-11-05', completed: false },
  ]);

  /* ── State: ฟอร์มเพิ่มงานใหม่ ── */
  const [form, setForm] = useState({ title: '', priority: 'medium', dueDate: '' });

  /* สลับสถานะ completed */
  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /* ลบรายการ */
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /* เพิ่มงานใหม่ */
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTodo = {
      id:        Date.now(),
      title:     form.title.trim(),
      priority:  form.priority,
      dueDate:   form.dueDate,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setForm({ title: '', priority: 'medium', dueDate: '' });
  };

  /* นับสรุปจำนวน */
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">📝 Smart Todo</h1>
        <p className="app__summary">
          เสร็จแล้ว {completedCount} / {todos.length} งาน
        </p>
      </header>

      {/* ── ฟอร์มเพิ่มงาน ── */}
      <form className="add-form" onSubmit={handleAddTodo}>
        <input
          className="add-form__input"
          type="text"
          placeholder="ชื่องาน..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          className="add-form__select"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">ต่ำ</option>
          <option value="medium">กลาง</option>
          <option value="high">สูง</option>
        </select>
        <input
          className="add-form__date"
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <button className="add-form__btn" type="submit">+ เพิ่ม</button>
      </form>

      {/* ── รายการ TodoItem ── */}
      <main className="todo-list">
        {todos.length === 0 ? (
          <p className="todo-list__empty">ไม่มีรายการงาน 🎉</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              priority={todo.priority}
              dueDate={todo.dueDate}
              completed={todo.completed}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
