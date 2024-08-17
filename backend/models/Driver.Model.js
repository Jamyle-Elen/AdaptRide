import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../config/database.js';

const Driver = sequelize.define('Driver', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numCNH: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehiclePlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleBrand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicleColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typesAdaptations: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descriptionAdaptations: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
})

export default Driver;
