import Ride from "../models/Ride.Model.js";
import Driver from "../models/Driver.Model.js";
import Passenger from "../models/Passenger.Model.js";
import db from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import geolib from "geolib";
import geohash from "ngeohash";

// definir o id do passageiro dps
export const createRide = async (req, res) => {
  try {
    const { passengerId, startLocation, destinationLocation } = req.body;

    if (!passengerId || !startLocation || !destinationLocation) {
      return res
        .status(400)
        .json({
          message: "Todos os campos são necessários",
          passengerId,
          startLocation,
          destinationLocation,
        });
    }
    const ride = await Ride.create({
      id: uuidv4(),
      passengerId,
      startLocation,
      destinationLocation,
      statusRide: "Pending",
    });
    return ride;
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar corrida", error });
  }
};

export const acceptRide = async (req, res) => {
  const { id } = req.body;
  const { driverId } = req.body;
  try {
    const driver = await Driver.findByPk(driverId);

    if (!driver || driver.available !== "Active") {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ message: "Erro ao aceitar corrida", error });
  }
};

export const declineRide = async (req, res) => {
  const { id } = req.params
  try {
    const ride = await Ride.findByPk(id)

    if (!ride) {
      return res.status(404).json({ message: "Corrida não encontrada" })
    }

    if (ride.statusRide !== "Pending") {
      return res.status(400).json({ message: "Corrida não pode ser recusada" })
    }

    ride.statusRide = 'Declined'
    await ride.save()

    res.status(200).json({ message: "Corrida recusada", ride })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const cancelRide = async(req, res) => {
  const {id} = req.params.id

  try {
    const ride = await Ride.findByPk(id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.statusRide !== "Pending" && ride.statusRide !== "Accepted") {
      return res.status(400).json({ message: "Ride cannot be canceled" });
    }

    ride.statusRide = "Cancelled";
    await ride.save();

    res.status(200).json({ message: "Ride cancelled successfully", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const requestRides = async (req, res) => {
  try {
    const { passengerId, startLocation, destinationLocation } = req.body;
    if (!passengerId || !startLocation || !destinationLocation) {
      return res
        .status(400)
        .json({
          message: "Todos os campos são necessários",
          passengerId,
          startLocation,
          destinationLocation,
        });
    }

    const passenger = await Passenger.findByPk(passengerId);
    if (!passenger) {
      return res.status(404).json({ message: "Passageiro não encontrado" });
    }

    const passengerHash = geohash.encode(
      startLocation.latitude,
      startLocation.longitude,
      2
    );
    console.log("Geohash do passageiro:", passengerHash);

    const drivers = await Driver.findAll({
      where: {
        available: "Active",
        locationZone: { [Op.like]: `${passengerHash}%` },
      },
    });

    if (drivers.length === 0) {
      return res.status(404).json({ message: "Nenhum motorista disponível" });
    }

    const driverLocations = drivers.map((driver) => {
      if (!driver.latitude || !driver.longitude) {
        console.warn(`Motorista ${driver.id} não possui latitude ou longitude`);
      }
      return {
        id: driver.id,
        latitude: driver.latitude,
        longitude: driver.longitude,
      };
    });
    console.log("Localizações dos motoristas:", driverLocations);

    const nearestDriver = geolib.findNearest(
      { latitude: startLocation.latitude, longitude: startLocation.longitude },
      driverLocations
    );
    console.log("Motorista mais próximo:", nearestDriver);

    if (!nearestDriver || !nearestDriver.id) {
      return res.status(404).json({ message: "Nenhum motorista próximo" });
    }

    const driver = await Driver.findByPk(nearestDriver.id);
    if (!driver) {
      return res.status(404).json({ message: "Motorista não encontrado" });
    }

    const newRide = await Ride.create({
      id: uuidv4(),
      passengerId: passengerId,
      startLocation: `${startLocation.latitude},${startLocation.longitude}`,
      destinationLocation: `${destinationLocation.latitude},${destinationLocation.longitude}`,
      driverId: driver.id,
      available: "Pending",
    });

    res.status(201).json({
      message: "Corrida solicitada com sucesso",
      newRide,
    });
  } catch (error) {
    console.error("Erro ao solicitar corrida", error);
    res.status(500).json({
      message: "Erro ao solicitar corrida",
      error: error.message || error,
    });
  }
};

export const getCoordinates = async (req, res) => {
  const { startLocation, destinationLocation } = req.body;
  console.log("Dados recebidos:", req.body);
  if (
    !startLocation ||
    !destinationLocation ||
    typeof startLocation.latitude !== "number" ||
    typeof startLocation.longitude !== "number" ||
    typeof destinationLocation.latitude !== "number" ||
    typeof destinationLocation.longitude !== "number"
  ) {
    return res
      .status(400)
      .json({
        error: "Todos os campos são necessários e devem ser números.",
        error,
      });
  }

  try {
    const drivers = await findDriversInGeohashZones(
      startLocation.latitude,
      startLocation.longitude
    );

    if (drivers.length > 0) {
      const nearestDriver = drivers[0];
      res
        .status(200)
        .json({ message: "Motorista encontrado", driver: nearestDriver });
    } else {
      res.status(404).json({ message: "Nenhum motorista encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar o pedido." });
  }
};

export const acceptRidess = async (req, res) => {
  try {
    const { rideId, driverId } = req.body;
    const ride = await Ride.findByPk(rideId);

    if (ride) {
      ride.statusRide = "Accepted";
      ride.driverId = driverId;
      await ride.save();
      res.status(200).json({ message: "Corrida aceita!", ride });
    } else {
      res.status(404).json({ message: "Corrida não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao aceitar corrida", error });
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
