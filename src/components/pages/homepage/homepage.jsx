import react from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../../assets/images.js";
import NavBar from "./navbar/navbar.jsx";
import "../homepage/homepage.css";

const HomePage = () => {
  //   const [departureLocation, setdepartureLocation] = useState("");
  //   const [destiny, setdestiny] = useState("");

  //   const handleDepartureLocationChange = (e) => {
  //     setdepartureLocation(e.target.value);
  //   };

  //   const handleDestinyChange = (e) => {
  //     setdestiny(e.target.value);
  //   };
  return (
    <>
      <NavBar />
      <main>
        <section className="search">
          <div className="left-side">
            <div className="text">
              <h1>Seu transporte inclusivo e seguro!!</h1>
              <p>Viagens confortáveis, solicite agora.</p>
            </div>
            <div className="input">
              <input
                type="text"
                placeholder="Insira o local de partida"
                value={departureLocation}
                onChange={handleDepartureLocationChange}
              />
              <input
                type="text"
                placeholder="Pra onde você quer ir?"
                value={destiny}
                onChange={handleDestinyChange}
              />
            </div>
          </div>
          <figure className="car-img">
            <img src={images.carAdaptImg} alt="Carro adaptado" />
          </figure>
        </section>

        <section className="search2">
          <div className="search2-left-side">
            <div className="text">
              <h1>Acessibilidade, mobilidade e segurança.</h1>
            </div>
            <div className="button">
              <button>Cadastro</button>
              <p>Já possui uma conta?</p>
              <Link to="/login">Fazer Login</Link>
            </div>
          </div>
          <figure className="people-img">
            <img
              src={images.peopleAdaptImg}
              alt="Imagem ilustrativa de pessoas"
            />
            <figcaption>
              Ter a liberdade de se locomover com facilidade, conforto e
              segurança.
            </figcaption>
          </figure>
        </section>

        <section className="search3">
          <div className="content">
            <figure className="content-img">
              <img src={images.car2AdaptImg} alt="Imagem de carro" />
            </figure>
            <div className="content-text1">
              <h2>Não conhece a área?</h2>
              <p>O mapa indicará locais onde a entrada requer atenção:</p>
              <span>EM VERMELHO</span>
              <p>Quando o SAFE notificar um alerta, siga os passos a seguir:</p>
              <ul>
                <li>Ligue o pisca alerta!</li>
                <li>Abaixe os vidros!</li>
                <li>Ligue a luz de salão (Noite)</li>
                <li>Retire o celular do suporte</li>
              </ul>
            </div>
            <div className="content-text2">
              <h2>
                Corridas <span>BÔNUS</span>!
              </h2>
              <p>
                Passageiros idosos ou que tenham alguma deficiência são corridas
                bônus.
              </p>
              <figure>
                <img src={images.moneyAdaptImg} alt="Símbolo de dinheiro" />
              </figure>
            </div>
          </div>
          <div className="search3-button">
            <button>Quero ser motorista</button>
          </div>
        </section>
      </main>
      );
    </>
  );
};

export default HomePage;
