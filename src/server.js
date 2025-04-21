import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: ['http://localhost:5173', 'https://todo-frontend-blond.vercel.app'],
  credentials: true
}));

app.use(express.json());
// app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


app.get('/', (req, res) => res.send('API Çalışıyor'));

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor ➜ http://localhost:${PORT}`);
});
