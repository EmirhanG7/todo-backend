import {db} from '../config/db.js';
import {users} from '../models/schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {eq} from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const {username, password} = req.body;
  try {
    const existingUser = await db.select().from(users).where(eq(users.username, username));
    if (existingUser.length > 0) {
      return res.status(400).json({error: 'Kullanıcı adı zaten kullanılıyor'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.insert(users).values({username, password: hashedPassword}).returning();
    res.status(201).json({id: newUser[0].id, username: newUser[0].username});
  } catch (err) {
    res.status(500).json({error: 'Kayıt sırasında hata oluştu'});
  }
};

export const login = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await db.select().from(users).where(eq(users.username, username));
    if (user.length === 0) return res.status(404).json({error: 'Kullanıcı bulunamadı'});

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) return res.status(401).json({error: 'Şifre hatalı'});

    const token = jwt.sign({id: user[0].id, username: user[0].username}, JWT_SECRET, {expiresIn: '1h'});

    res
      .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    })
      .json({user: {id: user[0].id, username: user[0].username}});
  } catch (err) {
    res.status(500).json({error: 'Giriş sırasında hata oluştu'});
  }
};

export const logout = (req, res) => {
  res
    .clearCookie('token', {
    httpOnly: true,
    secure: true,
  })
    .json({message: 'Çıkış yapıldı'})
}

export const getMe = async (req, res) => {
  res.json({user: req.user});
};
