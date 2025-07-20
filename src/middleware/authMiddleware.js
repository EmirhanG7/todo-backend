import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ error: 'Token bulunamadı' });
//   }
//
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ error: 'Geçersiz token' });
//   }
// };


export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({error: 'Yetkisiz'});

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();

  } catch (err) {
    res.status(401).json({error: 'Geçersiz token'});
  }
}