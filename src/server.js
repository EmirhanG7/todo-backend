import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// app.options('*', cors({
//   origin: true,
//   credentials: true
// }));


app.get('/', (req, res) => res.send('API Çalışıyor'));

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor ➜ http://localhost:${PORT}`);
});
