import { db } from '../config/db.js';
import { todos } from '../models/schema.js';
import { eq, and } from 'drizzle-orm';

export const getTodos = async (req, res) => {
  try {
    const result = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, req.user.id));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Todo alınamadı' });
  }
};

export const addTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const result = await db
      .insert(todos)
      .values({ title, userId: req.user.id })
      .returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Todo eklenemedi' });
  }
};

// export const toggleTodo = async (req, res) => {
//   const id = parseInt(req.params.id);
//   const { title } = req.body;
//
//   try {
//     const [todo] = await db
//       .select()
//       .from(todos)
//       .where(and(eq(todos.id, id), eq(todos.userId, req.user.id)));
//
//     if (!todo) return res.status(404).json({ error: 'Todo bulunamadı' });
//
//     const updated = await db
//       .update(todos)
//       .set({
//         completed: title ? todo.completed : !todo.completed,
//         ...(title && { title }),
//       })
//       .where(eq(todos.id, id))
//       .returning();
//
//     res.json(updated[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Todo güncellenemedi' });
//   }
// };


export const toggleTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body || {};

  if (typeof title === 'undefined' && typeof completed === 'undefined') {
    return res.status(400).json({ message: 'Güncellenecek alan gönderilmedi.' });
  }

  try {
    const updated = await db
      .update(todos)
      .set({
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      })
      .where(eq(todos.id, Number(id)))
      .returning();

    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ message: 'Todo güncellenemedi.', error: err.message });
  }
};



export const deleteTodo = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db
      .delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, req.user.id)))
      .returning();

    if (result.length === 0)
      return res.status(404).json({ error: 'Silinecek todo bulunamadı' });

    res.json({ message: 'Silindi', todo: result[0] });
  } catch (err) {
    res.status(500).json({ error: 'Todo silinemedi' });
  }
};
