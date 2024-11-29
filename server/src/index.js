// const server = require("./db/app.js");
// const { conn } = require("./db/db.js");

// const { DB_PORT } = process.env;

// conn.sync({ force: false }).then(() => {
//     server.listen(DB_PORT, () => {
//         console.log(`Server is listening on port: ${DB_PORT}`);
//     });
// });

import express, { json } from 'express';
import sequelize  from './db/db.js';
import donorRoutes from './routes/donorRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import foundationRoutes from './routes/foundationRoutes.js';
import adminRoutes from './routes/adminRouter.js'
import './models/index.js'; 

const app = express();

app.use(json());
app.use(donorRoutes);
app.use(donationRoutes);
app.use(foundationRoutes);
app.use(adminRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
        app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

startServer();
