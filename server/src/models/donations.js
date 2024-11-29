// const {DataTypes} = require('sequelize')
// const sequelize = require('../db/db.js')

// const Donations = sequelize.define('Donations', {
//   id: {
//     type: DataTypes.UUID,
//     // autoIncrement: true,
//     primaryKey: true
//   },
//   idDonor: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   idFoundation: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   amount: {
//     type: DataTypes.DOUBLE,
//     allowNull: false
//   },
//   paymentMethod: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   anonymous: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW
//   },
//   blocked: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   // Other model options go here
// });

// export default Donations;


import { DataTypes } from 'sequelize';
import sequelize  from '../db/db.js';

const Donation = sequelize.define('Donation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: true, 
});

export default Donation;
