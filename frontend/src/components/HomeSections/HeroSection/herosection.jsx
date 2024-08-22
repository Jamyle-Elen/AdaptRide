import React from "react";
import images from "../../../assets/images";
import "./herosection.css";
// import "../../../pages/homepage/homepage.css";

const HeroSection = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
          <section>
            <div className="form-container">
                <h1>Seu Transporte Inclusivo <br /> e Seguro</h1>
                <p>Viagens Confortáveis, solicite agora.</p>
            </div>
            <div className="form-container">
                <input type="text" placeholder="Insira o local de partida"/>
                <input type="text" placeholder="Para onde você quer ir?"/>
            </div>
          </section>
          <img className="car-adapt" src={images.carAdapt} alt="Carro adaptado" />
      </div>
      <div className="block">
        <i className="bx bx-chevron-down"></i>
      </div>
    </div>
  )
}

export default HeroSection
