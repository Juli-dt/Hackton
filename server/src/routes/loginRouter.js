import {Router} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { searchAdminsByEmail } from '../controllers/adminController.js';
import { searchFoundationByEmail } from '../controllers/foundationController.js';
import { searchDonorByEmail } from '../controllers/donorController.js';

dotenv.config();
const router = Router();
router.use(cookieParser());

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Cambia esto por una clave secreta segura

router.post('/login', async (req, res) => {
  const { email, password, type} = req.body;

  try {
    // Buscar el usuario por email
    const admin = await searchAdminsByEmail(req, res);
    const foundation = await searchFoundationByEmail(req, res);
    const donor = await searchDonorByEmail(req, res);
    let user = null;
    let userType = null;
    if(admin){
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      user = admin;
      userType = "admin";
    }else if(foundation){
      const isMatch = await bcrypt.compare(password, foundation.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      user = foundation;
      userType = "foundation";
    }else if(donor){
      const isMatch = await bcrypt.compare(password, donor.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      user = donor;
      userType = "donor";
    }else{
      return res.status(401).json({message: 'Credenciales inválidas', userType });
    }
    console.log(userType);
    user = user.dataValues;
    // Crear el token JWT
    const token = jwt.sign({ id: user.id, email: user.email, userType}, SECRET_KEY, { expiresIn: '1h' });

    // Configurar la cookie con el token
    res.cookie('token', token, { 
      httpOnly: false, 
      secure: false, 
      sameSite:'None', 
      maxAge: 3600000 
    });
    res.cookie('userType', userType, { 
      //httpOnly: false, 
      secure: false, 
      sameSite:'None', 
      maxAge: 3600000 
    });

    return res.json({message: 'Inicio de sesión exitoso', userType});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
});

export default router;