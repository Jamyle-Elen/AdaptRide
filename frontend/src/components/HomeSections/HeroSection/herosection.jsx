import { useState } from "react";
import images from "../../../assets/images";
import "./herosection.css";
import { Link, useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { sucessToast, errorToast } from "../../../utils/toastUtils";
import api from "../../../../config/axios.js";
// import "../../../pages/homepage/homepage.css";

const HeroSection = () => {
  const [startLocation, setStartLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [geolocationActive, setGeolocationActive] = useState(false);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLocation(`${latitude} ${longitude}`);
          setGeolocationActive(true)
        },
        (error) => {
          console.log("Erro ao tentar pegar a localização", error);
        }
      );
    } else {
      console.log("Localização indisponível");
    }
  };
  // const navigate = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors } = useForm()
  // }

  const handleClearLocation = () => {
    setStartLocation("");
    setGeolocationActive(false);
  }

  const handleRequestRide = async () => {
    const data = {
      startLocation,
      destinationLocation,
    };
    try {
      const response = await api.post("/request-rides", data);
      console.log("Corrida solicitada com sucesso!");
      sucessToast("Corrida solicitada!");
    } catch (error) {
      console.error("Erro ao solicitar corrida", error);
      errorToast('Erro ao solicitar corrida', error)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!startLocation || !destinationLocation) {
      alert("Preencha todos os campos");
    }

    handleRequestRide();
  };
  return (
    <div className="homepage">
      <div className="hero-section">
        <section>
          <div className="form-container">
            <h1>
              Seu Transporte Inclusivo <br /> e Seguro
            </h1>
            <p>Viagens Confortáveis, solicite agora.</p>
          </div>
          <form onSubmit={handleSubmit} className="ride-request-form">
            <div className="input-container">
              <input
                id="start-location"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                aria-label="Onde você está?"
                type="text"
                name="name"
                placeholder="Onde você está?"
                // {...register("name", { required: true })}
                // className={errors.name ? "input-error" : ""}
                required
              />
              <i
                className={`bx ${
                  geolocationActive ? "bx-x" : "bx-target-lock"
                }`}
                style={{ color: "#ffffff", cursor: "pointer" }}
                onClick={
                  geolocationActive ? handleClearLocation : handleGeolocation
                }
              ></i>
            </div>
            <div className="input-container">
              <input
                id="destination-location"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
                aria-label="Para onde você quer ir?"
                type="text"
                name="destination"
                placeholder="Para onde você quer ir?"
                required
              />
              <i
          className="bx bx-target-lock"
          style={{ color: '#ffffff', cursor: 'pointer' }}
        ></i>
            </div>
            <button type="submit">Solicitar</button>
          </form>
        </section>
        <img className="car-adapt" src={images.carAdapt} alt="Carro adaptado" />
      </div>
      <div className="block">
        <i className="bx bx-chevron-down"></i>
      </div>
    </div>
  );
};

export default HeroSection;
