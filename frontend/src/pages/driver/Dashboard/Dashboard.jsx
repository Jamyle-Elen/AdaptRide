// frontend/src/components/DriverDashboard.jsx

import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { io } from "socket.io-client";
import CustomMap from "../../../components/Maps/Geocode.jsx";

const socket = io("http://localhost:3001");

const DriverDashboard = () => {
  const [rideData, setRideData] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [newRide, setNewRide] = useState(false);
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    const defID = prompt("Insira o ID do motorista");
    if (defID) {
      setDriverId(defID);
      sessionStorage.setItem("driverId", defID);
    }
  }, []);

  useEffect(() => {
    if (driverId) {
      const storedDriverId = sessionStorage.getItem("driverId");
      console.log('Joining driver with ID:', storedDriverId);
      socket.emit('joinDriver', { driverId: storedDriverId });

      socket.on('rideRequest', (data) => {
        console.log('Received rideRequest event:', data);
        setRideData(data);
        setNewRide(true);
        handleDisplayModal();
      });

      socket.on('rideResponse', (data) => {
        if (data.accepted) {
          console.log('Corrida aceita:', data);
        } else {
          console.log('Corrida recusada:', data);
        }
      });

      return () => {
        socket.off('rideRequest');
        socket.off('rideResponse');
      };
    }
  }, [driverId]);

  const handleDisplayModal = () => setDisplayModal(true);
  const handleCloseModal = () => setDisplayModal(false);

  const handleAcceptRide = () => {
    const storedDriverId = sessionStorage.getItem("driverId");
    console.log('Sending acceptRide event with data:', { rideId: rideData.rideId, driverId: storedDriverId });
    socket.emit("rideAccepted", { rideId: rideData.rideId, driverId: storedDriverId });
    setDisplayModal(false);
    setRideData(null);
    setNewRide(false);
  };

  const handleDeclineRide = () => {
    const storedDriverId = sessionStorage.getItem("driverId");
    console.log('Sending declineRide event with data:', { rideId: rideData.rideId, driverId: storedDriverId });
    socket.emit("rideDeclined", { rideId: rideData.rideId, driverId: storedDriverId });
    setDisplayModal(false);
    setRideData(null);
    setNewRide(false);
  };

  const driverLocation = [-23.533773, -46.625290];

  return (
    <div className="dashboard">
      {rideData && displayModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <h3><strong>Nova Solicitação de Corrida</strong></h3>
              <h4>Valor estimado: R$ {rideData.price}</h4>
              <p><strong>De:</strong> {rideData.startLocation.latitude}, {rideData.startLocation.longitude}</p>
              <p><strong>Para:</strong> {rideData.destinationLocation.latitude}, {rideData.destinationLocation.longitude}</p>
            </div>
            <div className="modal-footer">
              <button className="decline-button" onClick={handleDeclineRide}>Recusar</button>
              <button className="accept-button" onClick={handleAcceptRide}>Aceitar</button>
            </div>
          </div>
        </div>
      )}

      <div className="driver-status">
        <p>Motorista está <span className="online-status">Online</span></p>
        <p>Aguardando nova solicitação de corrida...</p>
      </div>

      {rideData && (
        <CustomMap
          startLocation={[rideData.startLocation.latitude, rideData.startLocation.longitude]}
          destinationLocation={[rideData.destinationLocation.latitude, rideData.destinationLocation.longitude]}
          driverLocation={driverLocation}
        />
      )}
    </div>
  );
};

export default DriverDashboard;
