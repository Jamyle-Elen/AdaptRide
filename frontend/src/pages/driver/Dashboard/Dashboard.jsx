import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import io from "socket.io-client";
import CustomMap from "../../../components/Maps/Geocode.jsx";

const socket = io("http://localhost:3001");

const DriverDashboard = () => {
  const [rideData, setRideData] = useState();
  const [displayModal, setDisplayModal] = useState(false);
  const driverId = "d776a1c9-cfc0-437a-9cd1-ad7d483100e2";

  const handleDisplayModal = () => setDisplayModal(true);
  const handleCloseModal = () => setDisplayModal(false);

  useEffect(() => {
    socket.on(
      "rideRequest",
      ({
        driverId: requestedDriverId,
        rideId,
        startLocation,
        destinationLocation,
      }) => {
        if (requestedDriverId === driverId) {
          setRideData({ rideId, startLocation, destinationLocation });
          handleDisplayModal();
        }
      }
    );

    return () => {
      socket.off("rideRequest");
    };
  }, []);

  const handleAcceptRide = () => {
    socket.emit("acceptRide", { rideId: rideData.rideId, driverId });
    console.log("Corrida aceita");
    handleCloseModal();
  };

  const handleDeclineRide = () => {
    socket.emit("declineRide", { rideId: rideData.rideId, driverId });
    console.log("Corrida recusada");
    handleCloseModal();
  };

  return (
    <div className="dashboard-container">
      {rideData ? (
        <CustomMap
        startLocation={[rideData.startLocation.lat, rideData.startLocation.lon]}
        destinationLocation={[
          rideData.destinationLocation.lat,
          rideData.destinationLocation.lon,
        ]}
      />
      ) : (
        <div className="map-placeholder">teste</div>
      )}
      
        {displayModal && rideData && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <button className="close-button" onClick={handleCloseModal}>X</button>
            </div>
            <div className="modal-body">
              <h3><strong>Corrida encontrada</strong></h3>
              <h4>VALUE</h4>
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
    </div>
  );
};
export default DriverDashboard;
