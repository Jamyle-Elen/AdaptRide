// frontend/src/components/DriverDashboard.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { io } from "socket.io-client";
import { api } from '../../../../config/axios.js'
import MapComponent from "../../../components/Maps/Geocode.jsx";
import SideBar from "../../../components/sideBar/sideBar.jsx";
import images from "../../../assets/images.js";

const socket = io("http://localhost:3001");

const DriverDashboard = () => {
  const [rideData, setRideData] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [showDetailsRide, setShowDetailsRide] = useState(false);
  const [newRide, setNewRide] = useState(false);
  const [driverId, setDriverId] = useState(null);
  // const [passengerInfo, setPassengerInfo] = useState(null);

  const defID = JSON.parse(sessionStorage.getItem("authTokenDriver"));
  useEffect(() => {
    const PassengerDetails = () => {
      const { passengerId } = useParams(); // Verifica se o parâmetro está vindo da URL
  
    };

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
        // handleShowDetailsRide()
        setNewRide(true);
        handleDisplayModal();
        fetchPassengeInfo(data.PassengerId);
      });

      socket.on('rideResponse', (data) => {
        if (data.accepted) {
          handleShowDetailsRide();
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

  const handleShowDetailsRide = () => setShowDetailsRide(true);
  const handleCloseDetailsRide = () => setShowDetailsRide(false); // na vdd nem teria a opção de fechar so se ele quiser cancelar depois de acieta, tanto ele como passageiro

  const handleAcceptRide = () => {
    const storedDriverId = sessionStorage.getItem("driverId");
    console.log('Sending acceptRide event with data:', { rideId: rideData.rideId, driverId: storedDriverId });
    socket.emit("rideAccepted", { rideId: rideData.rideId, driverId: storedDriverId });
    setDisplayModal(false);
    setShowDetailsRide(true)
    setRideData(null);
    setNewRide(false);
  };

  const handleDeclineRide = () => {
    const storedDriverId = sessionStorage.getItem("driverId");
    console.log('Sending declineRide event with data:', { rideId: rideData.rideId, driverId: storedDriverId });
    socket.emit("rideDeclined", { rideId: rideData.rideId, driverId: storedDriverId });
    setDisplayModal(false);
    setShowDetailsRide(false)
    setRideData(null);
    setNewRide(false);
  };

  // const fetchPassengeInfo = async (passengerId) => {
  //   console.log('Response:', passengerId);
  //   try {
  //     const response = await api.get(`/dashboard/passenger/${passengerId}`);
  //     setPassengerInfo(response.data)
  //   } catch (error) {
  //     console.error('Error fetching passenger info:', error);
  //   }
  // };

  const driverLocation = [-23.533773, -46.625290];

  return (
    <div className="dashboard">
      <SideBar />
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
        
      )}{!showDetailsRide && (
      // )}{!rideData && (
        <div className="modal-overlay-ride">
          <div className="modal-ride">
            <div className="modal-header-ride">
              <button className="close-button" onClick={handleCloseDetailsRide}>×</button>
            </div>
            <hr />
            <div className="modal-body-top">
              {/* <p>Motorista está a caminho</p> */}
              <div className="modal-body-ride">
                <div className="car">
                  <img src={images.car} alt="Carro adaptado" />
                {/* <label htmlFor="place">FGE6453</label> */}
                </div>
                {/* <h3><strong>Corrida Aceita</strong></h3> */}
                <h4>Valor estimado: R$ XX,XX</h4>
            </div>
              {/* <p><strong>De:</strong> {rideData.startLocation.latitude}, {rideData.startLocation.longitude}</p>
              <p><strong>Para:</strong> {rideData.destinationLocation.latitude}, {rideData.destinationLocation.longitude}</p> */}
            </div>
            <div className="modal-footer-ride">
              <img src={images.contact} width ="50px" alt="" />
              <label htmlFor="Nome do passageiro">Nome:</label>
              <p>Lorem, ipsum.</p>
            </div>
          </div>
        </div>
      )}
      {!rideData && (
        <>
      <div className="driver-status">
      <nav><Link to={`/profile/driver/${defID}`}><i className="bx bx-chevron-left"></i></Link></nav>

        <div className="status">
        <div className="vide">  </div>
          <p>Você está online</p>
          <p>Aguardando nova solicitação de corrida...</p>
        </div>
      </div>
        {/* <CustomMap
        startLocation={[-7.887258, -34.914304]}
      /> */}
      <MapComponent className="map"/>
      </>
      )}

      {/* {rideData && (
              // <MapComponent className="map"/>

      )} */}
    </div>
  );
};

export default DriverDashboard;
