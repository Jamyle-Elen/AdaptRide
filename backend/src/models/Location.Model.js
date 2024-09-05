import db from "../../config/database.js";
import { DataTypes } from "sequelize";

const Location = db.define(
  "Location",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Location;
