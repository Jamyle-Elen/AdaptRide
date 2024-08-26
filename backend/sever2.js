import express from "express";
import ngeohash from "ngeohash";
import { Op } from "sequelize";
import cors from "cors";
import { url } from "../frontend/config/axios.js";
import Driver from "../backend/models/Driver.Model.js";
import Ride from "../backend/models/Ride.Model.js";
// import { getDistance } from 'geolib'

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const findDrivers = async (lat, lon) => {
  let precision = 12;
  const searchZoom = 3;

  const getDrivers = async (geohash) => {
    const neighbors = ngeohash.neighbors(geohash);
    neighbors.push(geohash);

    const searchPromises = neighbors.map((neighbor) =>
      Driver.findAll({
        where: {
          locationZone: {
            [Op.like]: `${neighbor}%`,
          },
        },
      })
    );

    const results = await Promise.all(searchPromises);
    return results.flat();
  };

  let hash = ngeohash.encode(lat, lon, precision);

  while (precision >= searchZoom) {
    const results = await getDrivers(hash);

    if (results.length > 0) {
      console.log(
        "Motoristas encontrados:",
        results.map((driver) => driver.id)
      );
      return results;
    }

    precision--;
    hash = hash.substring(0, precision);
  }

  return null;
};

const teste = async (startLocation, destinationLocation) => {
  try {
    const results = await findDrivers(
      startLocation.latitude,
      startLocation.longitude
    );

    if (!results || results.length === 0) {
      console.log("Nenhum motorista encontrado");
      return "Nenhum motorista encontrado";
    }

    const [driver] = results;
    console.log(driver);
    const rideRequest = await Ride.create({
      idDriver: driver.id,
      startLocation: `${startLocation.latitude},${startLocation.longitude}`,
      destinationLocation: `${destinationLocation.latitude},${destinationLocation.longitude}`,
    });
    console.log(rideRequest);
    return rideRequest;
  } catch (error) {
    console.error("Erro ao criar solicitação de corrida:", error.message);
    return error.message;
  }
};

app.post("/rides", async (req, res) => {
  const { startLocation, destinationLocation } = req.body;
  res.status(200).json(await teste(startLocation, destinationLocation));
});

app.get("/check-ride/:driverId", (req, res) => {
  const driverId = req.params.driverId;

  (async function checkRide() {
    try {
      while (true) {
        const pendingRides = await Ride.findAll({
          where: {
            idDriver: driverId,
            statusRide: "Pending",
          },
        });

        if (pendingRides.length > 0) {
          console.log("Nova corrida solicitada:", pendingRides);
          res.json(pendingRides);
          break;
        } else {
          console.log("Nenhuma corrida pendente encontrada. Aguardando...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error("Erro ao buscar corridas pendentes:", error);
      res.status(500).json({ error: "Erro ao buscar corridas pendentes" });
    }
  })();
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rideRequests = await Ride.findAll({
      where: { idDriver: id, statusRide: "Pending" },
    });

    if (rideRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma solicitação de corrida encontrada" });
    }

    res.status(200).json(rideRequests);
  } catch (error) {
    console.error("Erro ao buscar solicitações de corrida:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// aceitar corrida
app.post("/:id/accept", async (req, res) => {
  const { id } = req.params;
  const { idDriver } = req.body;
  try {
    const ride = await Ride.findByPk(id);

    if (!ride) {
      return res.status(404).json({ message: "Corrida não encontrada" });
    }

    if (ride.statusRide !== "Pending") {
      return res.status(400).json({ message: "Corrida não pode ser aceita" });
    }

    ride.idDriver = idDriver;
    ride.statusRide = "Accepted";
    await ride.save();

    res.status(200).json({ message: "Corrida aceita" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/:id/declined", async (req, res) => {
  const { id } = req.params;
  const { idDriver } = req.body;

  try {
    const ride = await Ride.findByPk(id);

    if (!ride) {
      return res.status(404).json({ message: "Corrida não encontrada" });
    }

    if (ride.statusRide !== "Pending") {
      return res.status(400).json({ message: "Corrida não pode ser aceita" });
    }

    ride.statusRide = "Declined";
    await ride.save();

    res.status(200).json({ message: "Corrida recusada com sucesso", ride });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});
// 289c1475-a72e-4642-ac0a-7f5f12ecffb9
// 289c1475-a72e-4642-ac0a-7f5f12ecffb9

// dessa forma, a funcao de obter motorista fara a busca de vizinhos tbm
