import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import sequelize  from './db/db.js';
import donorRoutes from './routes/donorRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import foundationRoutes from './routes/foundationRoutes.js';
import adminRoutes from './routes/adminRouter.js'
import login from './routes/loginRouter.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import './models/index.js'; 

dotenv.config();
const acceptedOrigins = process.env.ACCEPTED_ORIGINS;
//console.log(acceptedOrigins.split(','));
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.use(json());
app.use(cors({
  origin: (origin, callback) => {
    if(!origin || acceptedOrigins.split(',').includes(origin)){
      callback(null, true);
    }
    else{
      callback(new Error('Not allowed by CORS'));
    }
  }, credentials: true,
}));

app.use(morgan('dev'));
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