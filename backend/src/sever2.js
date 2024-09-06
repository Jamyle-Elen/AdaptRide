// backend/server.js

import express from "express";
import ngeohash from "ngeohash";
import { Op } from "sequelize";
import cors from "cors";
import Driver from "./models/Driver.Model.js";
import Ride from "./models/Ride.Model.js";
import { Server } from "socket.io";
import Passenger from "./models/Passenger.Model.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const driverSockets = {}; // Mapa para armazenar a conexão dos motoristas
const rideStates = {}; // Mapa para armazenar o estado das corridas

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinDriver', ({ driverId }) => {
    driverSockets[driverId] = socket.id;
    console.log(`Driver ${driverId} connected with socket ID ${socket.id}`);
  });

  socket.on('rideAccepted', async ({ rideId }) => {
    console.log(`Ride accepted event received for ride ${rideId}`);
    await updateRideStatus(rideId, 'Accepted');
  });

  socket.on('rideDeclined', async ({ rideId }) => {
    console.log(`Ride declined event received for ride ${rideId}`);
    await updateRideStatus(rideId, 'Declined');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    for (let driverId in driverSockets) {
      if (driverSockets[driverId] === socket.id) {
        delete driverSockets[driverId];
        console.log(`Driver ${driverId} disconnected`);
        break;
      }
    }
  });
});

const getNearbyDrivers = async (geohash) => {
  const neighbors = ngeohash.neighbors(geohash);
  neighbors.push(geohash);

  const searchPromises = neighbors.map((neighbor) =>
    Driver.findAll({
      where: {
        locationZone: {
          [Op.like]: `%`,
          // [Op.like]: `${neighbor}%`,
        },
      },
    })
  );

  const results = await Promise.all(searchPromises);
  return results.flat();
};

const findDrivers = async (lat, lon) => {
  let precision = 12;
  const searchZoom = 2;
  let hash = ngeohash.encode(lat, lon, precision);

  while (precision >= searchZoom) {
    const drivers = await getNearbyDrivers(hash);

    if (drivers.length > 0) {
      console.log('Drivers found:', drivers.map(driver => driver.id));
      return drivers;
    }

    precision--;
    hash = hash.substring(0, precision);
  }

  return null;
};

const updateRideStatus = async (rideId, status) => {
  const ride = await Ride.findByPk(rideId);
  if (ride && ride.statusRide === 'Pending') {
    ride.statusRide = status;
    await ride.save();
    console.log(`Ride ${rideId} status updated to ${status}`);
    rideStates[rideId] = status.toLowerCase();
  }
};

const callDriver = async (driverId, rideId, startLocation, destinationLocation, passengerId) => {
  const driverSocketId = driverSockets[driverId];
  if (!driverSocketId) {
    console.log(`Driver ${driverId} is not connected. Skipping request.`);
    return false; // Motorista não está conectado, não faça a solicitação
  }

  return new Promise((resolve) => {
    io.to(driverSocketId).emit('rideRequest', { rideId, startLocation, destinationLocation, passengerId });

    rideStates[rideId] = 'pending'; // Inicialmente pendente

    const timeout = setTimeout(() => {
      console.log(`Timeout expired for ride request ${rideId}`);
      if (rideStates[rideId] === 'pending') {
        resolve(false); // Não aceito após timeout
        console.log(`Ride ${rideId} timed out`);
        updateRideStatus(rideId, 'Declined'); // Atualiza o estado
      }
    }, 20000);

    // Lida com a resposta
    const handleResponse = (response) => {
      if (response.rideId === rideId) {
        clearTimeout(timeout);
        io.off('rideAccepted', handleResponse);
        io.off('rideDeclined', handleResponse);
        resolve(response.accepted); // Resolve com a aceitação
        updateRideStatus(rideId, response.accepted ? 'Accepted' : 'Declined'); // Atualiza o estado
      }
    };

    io.on('rideAccepted', handleResponse);
    io.on('rideDeclined', handleResponse);
  });
};

const requestRide = async (startLocation, destinationLocation, passengerId) => {
  if (!passengerId) {
    console.log('Passenger ID is required');
    return { status: 'error', message: 'Passenger ID is required' };
  }

  const drivers = await findDrivers(startLocation.latitude, startLocation.longitude);

  if (!drivers || drivers.length === 0) {
    console.log('No drivers found.');
    return { status: 'fail', message: 'No drivers available.' };
  }

  // Filtrar motoristas conectados
  const connectedDrivers = drivers.filter(driver => driverSockets[driver.id]);

  if (connectedDrivers.length === 0) {
    console.log('No drivers are currently connected.');
    return { status: 'fail', message: 'No drivers are connected.' };
  }

  for (const driver of connectedDrivers) {
    const ride = await Ride.create({
      startLocation: `${startLocation.latitude},${startLocation.longitude}`,
      destinationLocation: `${destinationLocation.latitude},${destinationLocation.longitude}`,
      idPassenger: passengerId,
      idDriver: driver.id,
      statusRide: 'Pending'
    });

    console.log(`Requesting ride ${ride.id} to driver ${driver.id}`);

    const accepted = await callDriver(driver.id, ride.id, startLocation, destinationLocation, passengerId);

    if (accepted) {
      console.log(`Driver ${driver.id} accepted the ride.`);
      return { status: 'success', message: `Ride requested with driver: ${driver.id}`, ride };
    }

    console.log(`Driver ${driver.id} declined the ride.`);
  }

  console.log('No driver accepted the ride.');
  return { status: 'fail', message: 'No driver accepted the ride.' };
};

app.post("/rides", async (req, res) => {
  const { startLocation, destinationLocation } = req.body.Route;
  const { PassengerId, name } = req.body.Passenger;
  console.log('Passenger ID:', PassengerId);
  console.log('Passenger Name:', name);
  console.log('Start Location:', startLocation);
  console.log('Destination Location:', destinationLocation);
  console.log('Dados recebidos:', req.body);
  try {
    const result = await requestRide(startLocation, destinationLocation, PassengerId);
    res.status(result.status === 'success' ? 200 : 504).json(result);
  } catch (error) {
    console.error('Error requesting ride:', error);
    res.status(500).json({ message: 'Error requesting ride.' });
  }
});
