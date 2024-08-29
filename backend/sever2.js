import express from "express";
import ngeohash from "ngeohash";
import { Op } from "sequelize";
import cors from "cors";
import { url } from "../frontend/config/axios.js";
import { Server as SocketIOServer } from "socket.io";
import Driver from "../backend/models/Driver.Model.js";
import Ride from "../backend/models/Ride.Model.js";
// import { getDistance } from 'geolib'

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
  }
));

const server =app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});

const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
})

io.on("connection", (socket) => {
  console.log("New partner connected", socket.id);

  socket.on('acceptRide', async ({rideId, driverId}) => {
    try {
      const ride = await Ride.findByPk(rideId);
      if (ride && ride.statusRide === 'Pending') {
        ride.statusRide = 'Accepted';
        ride.driverId = driverId;
        await ride.save();
        io.emit('rideAccepted', {rideId, driverId});
        console.log(`Motorista ${driverId} aceitou a corrida ${rideId}`);
      }
    } catch (error) {
      console.error('Erro ao aceitar corrida:', error);
    }
  })

  socket.on('declineRide', async ({ rideId, driverId }) => {
    try {
      const ride = await Ride.findByPk(rideId);
      if (ride && ride.statusRide === 'Pending') {
        ride.statusRide = 'Declined';
        await ride.save();
        io.emit('rideDeclined', { rideId, driverId });
        console.log(`Motorista ${driverId} recusou a corrida ${rideId}`);
      }
    } catch (error) {
      console.error('Erro ao recusar corrida:', error);
    }
  });
});

const requestRide = async (startLocation, destinationLocation) => {
  const getNearbyDrivers = async (geohash) => {
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

  const findDrivers = async (lat, lon) => {
    let precision = 12;
    const searchZoom = 3;
    let hash = ngeohash.encode(lat, lon, precision);

    while (precision >= searchZoom) {
      const drivers = await getNearbyDrivers(hash);

      if (drivers.length > 0) {
        console.log('Motoristas encontrados:', drivers.map(driver => driver.id));
        return drivers;
      }

      precision--;
      hash = hash.substring(0, precision);
    }

    // neturn null;
    return [];
  };

  // const callDriver = async (driverId) => {
  //   return Math.random() < 0.5;
  // };

  const startLat = startLocation.latitude;
  const startLon = startLocation.longitude;
  const destLat = destinationLocation.latitude;
  const destLon = destinationLocation.longitude;
  const drivers = await findDrivers(startLat, startLon);

  if (!drivers || drivers.length === 0) {
    console.log('Nenhum motorista encontrado.');
    return { status: 'fail', message: 'Nenhum motorista disponível.' };
  }

  for(const driver of drivers) {
    const ride = await Ride.create({
      startLocation: `${startLat},${startLon}`,
      destinationLocation: `${destLat},${destLon}`,
      idDriver: driver.id,
      statusRide: 'Pending'
    })
    io.emit('rideRequest', {driverId: driver.id, rideId: ride.id, startLocation, destinationLocation});

    const result = await new Promise((resolve) => {
      const timeout = setTimeout(() => resolve(null), 20000); // 20 segundos para aceitar
      io.once('rideAccepted', () => {
        clearTimeout(timeout);
        resolve(ride);
      });
      io.once('rideDeclined', () => {
        clearTimeout(timeout);
        resolve(null);
      });
    });

    if (result) return result;
  }
  return { status: 'fail', message: 'Nenhum motorista aceitou a corrida.' };
}

app.post("/rides", async (req, res) => {
  const { startLocation, destinationLocation } = req.body;

  try {
    const result = await requestRide(startLocation, destinationLocation);
    
    res.status(result.status === 'success' ? 200 : 504).json(result);
    
  } catch (error) {
    console.error('Erro ao solicitar corrida:', error);
    res.status(500).json({ message: 'Erro ao solicitar corrida.' });
  }
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
