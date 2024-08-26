import { v4 as uuidv4 } from 'uuid';
import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Ride from './Ride.Model.js';

const Passenger = db.define('Passenger', {
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
    unique: true,
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
  emergencyContact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disability: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assistanceLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialEquipment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
})

export default Passenger;
