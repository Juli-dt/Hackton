import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import sequelize  from './db/db.js';
import donorRoutes from './routes/donorRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import foundationRoutes from './routes/foundationRoutes.js';
import adminRoutes from './routes/adminRouter.js'
import login from './routes/loginRouter.js';
import dotenv from 'dotenv';
import './models/index.js'; 

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.disable('x-powered-by');
app.use(json());
app.use(cookieParser());
app.use(donorRoutes);
app.use(donationRoutes);
app.use(foundationRoutes);
app.use(adminRoutes);
app.use(login);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);	
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

startServer();