import Ride from "../models/Ride.Model.js";
import Driver from "../models/Driver.Model.js";
import Passenger from "../models/Passenger.Model.js";
import db from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const createRides = async (req, res) => {
  const getFirstDriver = async() => {
    
    const randomDriver = await Driver.findOne({ 
      order: [ [db.fn('RANDOM')]],
      where: { id: { [Op.not]: null } } });
    const idDriver  = await randomDriver.id;
    return (idDriver)}
    try {
      const driver = await Driver.findByPk(await getFirstDriver());
      if (!driver) {
        return res.status(400).json({ message: "Todos os campos são necessarios" });
      }
    
    if (!driver) {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }

    const newRide = await Ride.create({
      id: uuidv4(),
      idDriver: driver.id,
    });
    res.status(201).json(newRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRides = async (req, res) => {
  try {
    const allRides = await Ride.findAll();
    res.status(200).json(allRides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
