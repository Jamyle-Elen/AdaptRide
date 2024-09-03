import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images.js";
import "./raceRequest.css";
import {api, url} from '../../../config/axios.js'
import MapsOpenStreetMap from '../../components/Maps/Geocode.jsx'

const RaceRequest = () => {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);

  const handleCardClick = async () => {
    setIsButtonActive(true);
    const passengerId = JSON.parse(sessionStorage.getItem('user'));

    const rideRequest = {
      Route: JSON.parse(sessionStorage.getItem('rideRequest')),
      PassengerId: passengerId.id
    };
    // const handlePayment = async () => {
    
    // }
    
   
    
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await url.post("/rides", rideRequest.Route);
      
      console.log("Corrida solicitada com sucesso!");
      // rideAcceptToast("Motorista solicitado!");
      socket.emit("rideRequested", data);
      // navigate("/race-request");
    } catch (error) {
      console.error("Erro ao solicitar corrida", error);
      // errorToast("Erro ao solicitar corrida", error);
    } finally {
      setLoading(false);
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
          
          <div className="shortly">
            <abbr title="Indisponível no momento">
              <img src={images.shortly} alt="Serviço indisponível, em breve" />
            </abbr>
          </div>

          <button
            className={`race-request-btn ${isButtonActive ? "active" : ""}`}
            aria-label="Confirmar solicitação de corrida adaptada"
          >
            Ir para pagamento
          </button>
        </div>
        <div className="more-info"><i className='bx bx-car'></i></div>
        </div>
      <section className="maps">

        <div className="placa" id="saida">
          <label>Saída:</label>
          <input autoComplete="on" type="text" />
          
        </div>
        <div className="placa" id="chegada">
          <label>Chegada:</label>
          <input autoComplete="on" type="text" />
        </div>
        <MapsOpenStreetMap />
      </section>
    </main>
  );
};

export default RaceRequest;
