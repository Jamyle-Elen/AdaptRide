import React from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images.js";
import "./raceRequest.css";

const RaceRequest = () => {
  return (
    <main>
      <div className="container">
        <div className="menu">
          <Link to="/">
            <i class="bx bx-chevron-left"></i>
          </Link>
          <img src={images.logoAdapt} alt="Logo Adaptride" />
        </div>
        <div className="content">
          <div className="card-raceRequest">
            <img src={images.carAdapt} alt="Carro adaptado" />
            <div className="request-info">
              <label htmlFor="Corrida">Adapt</label>
              <p className="description">Viagens seguras e acessíveis</p>
              <p className="prox">Próximo de você</p>
            </div>
            <div className="value">
              <p className="price">R$ 9.98</p>
            </div>
          </div>
          <div className="shortly">
            <abbr title="Indisponivel no momento">
              <img src={images.shortly} alt="Card 'Em breve'" />
            </abbr>
          </div>
          <div className="shortly">
            <abbr title="Indisponivel no momento">
              <img src={images.shortly} alt="Card 'Em breve'" />
            </abbr>
          </div>
          <button className="race-request-btn">Confirmar</button>
        </div>
      </div>
    </main>
  );
};

export default RaceRequest;
