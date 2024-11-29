// index.js
import sequelize from './database.js';
import Foundations from './foundations.js';
import Donors from './donors.js';
import Donations from './donations.js';



const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

syncDatabase();