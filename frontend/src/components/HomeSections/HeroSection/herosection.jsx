import { useState, useEffect } from "react";
import images from "../../../assets/images";
import "./herosection.css";
import { Link, useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { sucessToast, errorToast, rideAcceptToast } from "../../../utils/toastUtils";
import { api, url } from "../../../../config/axios.js";
import { TailSpin } from "react-loader-spinner";
import { io } from "socket.io-client";

const HeroSection = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState({ latitude: "", longitude: "" });
  const [geolocationActive, setGeolocationActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const socket = io("http://localhost:3001");

  useEffect(() => {
    socket.on("rideAccepted", (data) => {
      console.log("Motorista aceitou a corrida", data);
      rideAcceptToast("Corrida aceita pelo motorista!");
      navigate("/race-request");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, navigate]);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStartLocation({ latitude: latitude.toFixed(6), longitude: longitude.toFixed(6) });
          setGeolocationActive(true);
        },
        (error) => {
          console.log("Erro ao tentar pegar a localização", error);
        }
      );
    } else {
      console.log("Localização indisponível");
    }
  };

  const handleClearLocation = () => {
    setStartLocation({ latitude: "", longitude: "" });
    setGeolocationActive(false);
  };

  const handleRequestRide = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (token) {
      localStorage.setItem(
        "rideRequest",
        JSON.stringify({
          startLocation,
          destinationLocation,
        })
      );
      navigate("/race-request");
      setLoading(false);
      return;
    }

    const data = {
      startLocation: {
        latitude: parseFloat(startLocation.latitude),
        longitude: parseFloat(startLocation.longitude),
      },
      destinationLocation: {
        latitude: parseFloat(destinationLocation.latitude),
        longitude: parseFloat(destinationLocation.longitude),
      },
    };
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await url.post("/rides", data);
      console.log("Corrida solicitada com sucesso!");
      rideAcceptToast("Motorista solicitado!");
      socket.emit("rideRequested", data);
      navigate("/race-request");
    } catch (error) {
      console.error("Erro ao solicitar corrida", error);
      errorToast("Erro ao solicitar corrida", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          {loading ? (
            <div className="loading-container">
              <TailSpin
                height="70"
                width="70"
                color="#4A90E2"
                ariaLabel="loading"
              />
              <p>Procurando motorista...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="ride-request-form">
              <div className="input-container">
                <input
                  id="start-location"
                  value={startLocation ? `${startLocation.latitude}, ${startLocation.longitude}` : ""}
                  onChange={(e) => {
                    const [latitude, longitude] = e.target.value.split(",").map((coord) => coord.trim());
                    setStartLocation({ latitude, longitude });
                  }}
                  aria-label="Onde você está?"
                  type="text"
                  placeholder="Onde você está?"
                  required
                />
                <i
                  className={`bx ${geolocationActive ? "bx-x" : "bx-target-lock"}`}
                  style={{ color: "#ffffff", cursor: "pointer" }}
                  onClick={geolocationActive ? handleClearLocation : handleGeolocation}
                ></i>
              </div>
              <div className="input-container">
                <input
                  id="destination-location"
                  value={`${destinationLocation.latitude}, ${destinationLocation.longitude}`}
                  onChange={(e) => {
                    const [latitude, longitude] = e.target.value.split(",").map((coord) => coord.trim());
                    setDestinationLocation({ latitude, longitude });
                  }}
                  aria-label="Para onde você quer ir?"
                  type="text"
                  placeholder="Para onde você quer ir?"
                  required
                />
                <i
                  className="bx bx-target-lock"
                  style={{ color: "#ffffff", cursor: "pointer" }}
                ></i>
              </div>
              <button type="submit">Solicitar</button>
            </form>
          )}
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
