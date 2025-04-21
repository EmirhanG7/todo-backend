import express from 'express';
import {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
} from '../controllers/todoController.js';

import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.get('/', getTodos);
router.post('/', addTodo);
router.patch('/:id', toggleTodo);
router.delete('/:id', deleteTodo);

export default router;
