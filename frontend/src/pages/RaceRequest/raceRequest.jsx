// RaceRequest.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import images from '../../assets/images.js';
import './raceRequest.css';
import { api, url } from '../../../config/axios.js';
import MapComponent from '../../components/Maps/Geocode.jsx';

const geocodeAddress = async (address) => {
  try {
    const response = await api.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    });
    const data = response.data;
    if (data.results[0]) {
      return data.results[0].geometry.location;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter coordenadas', error);
    return null;
  }
};

const getRoute = async (origin, destination) => {
  try {
    const response = await api.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin: origin,
        destination: destination,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      },
    });
    const data = response.data;
    if (data.routes[0]) {
      return data.routes[0].overview_polyline.points;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter rota', error);
    return null;
  }
};

const RaceRequest = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      const rideRequest = JSON.parse(sessionStorage.getItem('rideRequest'));

      if (rideRequest) {
        const originLocation = await geocodeAddress(rideRequest.startLocation);
        const destinationLocation = await geocodeAddress(rideRequest.destinationLocation);

        if (originLocation && destinationLocation) {
          setOrigin(originLocation);
          setDestination(destinationLocation);

          const routePolyline = await getRoute(
            `${originLocation.lat},${originLocation.lng}`,
            `${destinationLocation.lat},${destinationLocation.lng}`
          );
          setRoute(routePolyline);
        }
      }
    };

    fetchRouteData();
  }, []);

  const handleCardClick = async () => {
    setIsButtonActive(true);
    const user = JSON.parse(sessionStorage.getItem('user'));

    const rideRequest = {
      Route: JSON.parse(sessionStorage.getItem('rideRequest')),
      Passenger: {
        PassengerId: user.id,
        name: user.name,
      }
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await url.post("/rides", rideRequest);

      console.log("Corrida solicitada com sucesso!");
      socket.emit("rideRequested", data);
      // navigate("/race-request");
    } catch (error) {
      console.error("Erro ao solicitar corrida", error);
      // errorToast("Erro ao solicitar corrida", error);
    }
  };

  return (
    <main>
      <div className="container">
        <nav className="menu" aria-label="Menu de navegação">
          <Link to="/" aria-label="Voltar para a página inicial">
            <i className="bx bx-chevron-left" aria-hidden="true"></i>
          </Link>
          <Link to="/"><img src={images.logoAdapt} alt="Logo Adaptride" /></Link>
        </nav>
        <div className="content">
          <div
            className="card-raceRequest"
            role="button"
            aria-label="Solicitar corrida adaptada"
            onClick={handleCardClick}
            tabIndex={0}
          >
            <img src={images.carAdapt} alt="Carro adaptado" />
            <div className="request-info">
              <h2>Adapt</h2>
              <p className="descriptionRequest">Viagens seguras e acessíveis</p>
              <p className="prox">Próximo de você</p>
            </div>
            <div className="value">
              <p className="price">R$ 9.98</p>
            </div>
          </div>

          <div className="shortly">
            <abbr title="Indisponível no momento">
              <img src={images.shortly} alt="Serviço indisponível, em breve" />
            </abbr>
          </div>
          <div className="payments">
            <input className="payment" type="radio" name="payment" id="payment" defaultChecked />
            <img src={images.real} width={20} height={20} alt="" />
            <label htmlFor="Dinheiro">Dinheiro</label>
          </div>
          <button
            className={`race-request-btn ${isButtonActive ? "active" : ""}`}
            aria-label="Confirmar solicitação de corrida adaptada"
          >
            Confirmar viagem
          </button>
        </div>
      </div>
      <section className="maps">
        <div className="ride">
          <div className="placa" id="saida">
            <label>Saída:</label>
            <input autoComplete="on" type="text" />
          </div>
          <div className="placa" id="chegada">
            <label>Chegada:</label>
            <input autoComplete="on" type="text" />
          </div>
        </div>
        <MapComponent
          style={{ height: '400px', width: '100%' }}
          zoomLevel={12}
          center={origin || { lat: -23.5505, lng: -46.6333 }}
          origin={origin}
          destination={destination}
          route={route}
        />
      </section>
    </main>
  );
};

export default RaceRequest;
