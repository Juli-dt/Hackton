import sequelize from '../db/db.js';
import Donor from './donors.js';
import Donation from './donations.js';
import Foundation from './foundations.js';
import Admin from './admins.js';


Admin.hasMany(Donor, { foreignKey: 'adminId' }); 
Donor.belongsTo(Admin, { foreignKey: 'adminId' });
Admin.hasMany(Foundation, { foreignKey: 'adminId' });
Foundation.belongsTo(Admin, { foreignKey: 'adminId' });
Donor.hasMany(Donation, { foreignKey: 'donorId' });
Donation.belongsTo(Donor, { foreignKey: 'donorId' });
Foundation.hasMany(Donation, { foreignKey: 'foundationId' });
Donation.belongsTo(Foundation, { foreignKey: 'foundationId' });

sequelize.sync({ alter: true }).then(() => {
    console.log('Tablas sincronizadas');
}).catch(error => {
    console.error('Error al sincronizar tablas:', error);
});

export { Donor, Donation, Foundation, Admin, sequelize };
