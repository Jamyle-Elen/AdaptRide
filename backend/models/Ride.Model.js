import { v4 as uuidv4 } from 'uuid';
import Driver from './Driver.Model.js';
import Passenger from './Passenger.Model.js';
import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Ride = db.define('Ride', {
  id: {
    type: DataTypes.STRING,
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
  // statusRide: {
  //   type: DataTypes.ENUM('Pending', 'Accepted', 'Declined'),
  //   allowNull: false,
  //   defaultValue: 'Pending',
  // },
  // origin: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // destination: {
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
}, {
  timestamps: true,
})

export default Ride;
