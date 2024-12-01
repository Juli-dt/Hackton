// // foundation.js
// const {DataTypes} = require('sequelize')
// const sequelize = require('../db/db.js')
// import bcrypt from 'bcrypt';

// const Foundations = sequelize.define('Foundations', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   idType: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   identification: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   establishedYear: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   website: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   city: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   state: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   country: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   imageDirection:{
//     type: DataTypes.STRING,
//     allowNull: true
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
//   qualification: {
//     type: DataTypes.FLOAT,
//     allowNull: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   hooks: {
//     beforeCreate: async (foundation) => {
//       if (foundation.password) {
//         const salt = await bcrypt.genSalt(10);
//         foundation.password = await bcrypt.hash(foundation.password, salt);
//       }
//     },
//     beforeUpdate: async (foundation) => {
//       if (foundation.password) {
//         const salt = await bcrypt.genSalt(10);
//         foundation.password = await bcrypt.hash(foundation.password, salt);
//       }
//     }
//   }
// });

// export default Foundations;

import { DataTypes } from 'sequelize';
import  sequelize  from '../db/db.js';
import bcrypt from 'bcryptjs'; 
const { genSalt, hash } = bcrypt;
const Foundation = sequelize.define('Foundation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idType: {
        type: DataTypes.ENUM('Passport', 'National ID', 'Tax ID'),
        allowNull: false,
    },
    identification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    establishedYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imageDirection: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    qualification: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (foundation) => {
            if (foundation.password) {
                const salt = await genSalt(10);
                foundation.password = await hash(foundation.password, salt);
            }
        },
        beforeUpdate: async (foundation) => {
            if (foundation.changed('password')) {
                const salt = await genSalt(10);
                foundation.password = await hash(foundation.password, salt);
            }
        },
    },
    timestamps: true,
});

export default Foundation;
