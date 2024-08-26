import { v4 as uuidv4 } from 'uuid';
import Driver from './Driver.Model.js';
import Passenger from './Passenger.Model.js';
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Ride = db.define('Ride', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
    unique: true,
  },
  // idPassenger: {
  //   // foreignKey: true,
  //   type: DataTypes.STRING,
  //   references:{
  //     model: 'Passenger',
  //     key: 'id'
  //   }
  // },
  idDriver: {
    type: DataTypes.UUID,
    allowNull: false,
    references:{
      model: Driver,
      key: 'id'
    }
  },
  startLocation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255]
    }
  },
  destinationLocation: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 255]
    }
  },
  statusRide: {
    type: DataTypes.ENUM('Pending', 'Accepted','Cancelled','inProgress', 'Declined', 'Conclued'),
    allowNull: false,
    defaultValue: 'Accepted',
  },
}, {
  timestamps: true,
})

export default Ride;
