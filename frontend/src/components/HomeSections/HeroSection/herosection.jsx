import { useState, useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import images from "../../../assets/images";
import "./herosection.css";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { api, url } from "../../../../config/axios.js";

const GOOGLE_MAPS_LIBRARIES = ["places"];

const HeroSection = () => {
  const [startAddress, setStartAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [geolocationActive, setGeolocationActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geocoder, setGeocoder] = useState(null);
  const [startAutocomplete, setStartAutocomplete] = useState(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const navigate = useNavigate();
  const socket = io("http://localhost:3001");

  const startAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const geocodeAddress = async (address) => {
    try {
      const response = await api.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      });
      console.log('Geocode API Response:', response.data);
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

  useEffect(() => {
    if (isLoaded) {
      const geocoderInstance = new window.google.maps.Geocoder();
      setGeocoder(geocoderInstance);

      const startAutoCompleteInstance = new window.google.maps.places.Autocomplete(
        startAutocompleteRef.current,
        { types: ["address"] }
      );

      const destinationAutoCompleteInstance = new window.google.maps.places.Autocomplete(
        destinationAutocompleteRef.current,
        { types: ["address"] }
      );

      startAutoCompleteInstance.addListener("place_changed", () => {
        const place = startAutoCompleteInstance.getPlace();
        if (place.formatted_address) {
          setStartAddress(place.formatted_address);
        }
      });

      destinationAutoCompleteInstance.addListener("place_changed", () => {
        const place = destinationAutoCompleteInstance.getPlace();
        if (place.formatted_address) {
          setDestinationAddress(place.formatted_address);
        }
      });

      setStartAutocomplete(startAutoCompleteInstance);
      setDestinationAutocomplete(destinationAutoCompleteInstance);
    }
  }, [isLoaded]);

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
          getAddressFromCoordinates(latitude, longitude, setStartAddress);
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
    setStartAddress("");
    setGeolocationActive(false);
  };

  const handleRequestRide = async () => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      const startLocation = await geocodeAddress(startAddress);
      const destinationLocation = await geocodeAddress(destinationAddress);
      sessionStorage.setItem(
        "rideRequest",
        JSON.stringify({
          startLocation: startLocation,
          destinationLocation: destinationLocation,
        })
      );
      navigate("/race-request");
      setLoading(false);
      return;
    }
    navigate("/sign-in");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRequestRide();
  };

  if (loadError) {
    return <div>Erro ao carregar a API do Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

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
                ref={startAutocompleteRef}
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                aria-label="Onde você está?"
                type="text"
                placeholder="Onde você está?"
                required
              />
              <i
                className={`bx ${geolocationActive ? "bx-x" : "bx-target-lock"}`}
                style={{ fontSize: "26px", color: "#3D4A6A", cursor: "pointer" }}
                onClick={geolocationActive ? handleClearLocation : handleGeolocation}
              ></i>
            </div>
            <div className="input-container">
              <input
                id="destination-location"
                ref={destinationAutocompleteRef}
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                aria-label="Para onde você quer ir?"
                type="text"
                placeholder="Para onde você quer ir?"
                required
              />
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
