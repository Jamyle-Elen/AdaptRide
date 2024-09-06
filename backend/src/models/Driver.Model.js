import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";
// import Ride from "./Ride.Model.js";

const Driver = db.define(
  "Driver",
  {
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
    available: {
      type: DataTypes.ENUM('Active', 'Busy', 'Offline'),
      defaultValue: 'Active',
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numCNH: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    vehiclePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    locationZone: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },

    // latitude: {
    //   type: DataTypes.FLOAT,
    //   allowNull: true,
    // },
    // longitude: {
    //   type: DataTypes.FLOAT,
    //   allowNull: true,
    //   defaultValue: 40.712776,
    // },
  },
  {
    timestamps: true,
  }
);

export default Driver;
