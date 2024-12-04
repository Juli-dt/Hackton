import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY

export const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token+" token");
  console.log(req.headers);
  console.log(req.headers.cookie);

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'No autorizado' });
    }
    
    res.json({});
    req.user = decoded;
    next();
  });
};