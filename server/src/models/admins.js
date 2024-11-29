import { DataTypes, INTEGER, STRING } from 'sequelize';
import sequelize  from '../db/db.js';
import bcrypt from 'bcryptjs'; 
const { genSalt, hash } = bcrypt;
const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idType: {
        type: DataTypes.ENUM('Passport', 'National ID', 'Driver License'),
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    hooks: {
        beforeCreate: async (donor) => {
            if (donor.password) {
                const salt = await genSalt(10);
                donor.password = await hash(donor.password, salt);
            }
        },
        beforeUpdate: async (donor) => {
            if (donor.changed('password')) {
                const salt = await genSalt(10);
                donor.password = await hash(donor.password, salt);
            }
        },
    },
    timestamps: true,
})


export default Admin
