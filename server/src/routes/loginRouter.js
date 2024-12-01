import {Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { searchAdminsByEmail } from '../controllers/adminController.js';

dotenv.config();
const router = Router();
router.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Cambia esto por una clave secreta segura

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const admin = await searchAdminsByEmail(req, res);


    if (!admin) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear el token JWT
    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET_KEY, { expiresIn: '1h' });

    // Configurar la cookie con el token
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 });

    return res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;