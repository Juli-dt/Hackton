import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Donors = sequelize.define('Donors', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  identification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  blocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (foundation) => {
      if (foundation.password) {
        const salt = await bcrypt.genSalt(10);
        foundation.password = await bcrypt.hash(foundation.password, salt);
      }
    },
    beforeUpdate: async (foundation) => {
      if (foundation.password) {
        const salt = await bcrypt.genSalt(10);
        foundation.password = await bcrypt.hash(foundation.password, salt);
      }
    }
  }
});

export default Donors;