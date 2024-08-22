import React from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images.js";
import "./raceRequest.css";

const RaceRequest = () => {
  return (
    <main>
      <div className="container">
        <nav className="menu" aria-label="Menu de navegação">
          <Link to="/" aria-label="Voltar para a página inicial">
            <i className="bx bx-chevron-left" aria-hidden="true"></i>
          </Link>
          <img src={images.logoAdapt} alt="Logo Adaptride" />
        </nav>
        <div className="content">
          <div className="card-raceRequest" role="button" aria-label="Solicitar corrida adaptada">
            <img src={images.carAdapt} alt="Carro adaptado" />
            <div className="request-info">
              <h2>Adapt</h2>
              <p className="description">Viagens seguras e acessíveis</p>
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

          <button className="race-request-btn" aria-label="Confirmar solicitação de corrida adaptada">Confirmar</button>
        </div>
      </div>
      <section className="maps">
      <div className="placa" id="saida">
    <p>Saída:</p>
    <span>Shopping Tacaruna</span>
  </div>
  <div className="placa" id="chegada">
    <p>Chegada:</p>
    <span>Marco Zero</span>
  </div>
      </section>
    </main>
  );
};

export default RaceRequest;
