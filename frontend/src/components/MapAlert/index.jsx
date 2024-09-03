import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import LControlGeocoder from "leaflet-control-geocoder";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "./index.css";

const MapComponent = () => {

  // Endereços de início e fim
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');

  // Estados para armazenar as sugestões 
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);

  // Estado para controlar quando a rota deve ser recalculada
  const [routeReady, setRouteReady] = useState(false);

  // armazena a referência do controle de roteamento
  const routingControlRef = useRef(null);

  // Posição inicial do mapa
  const initialPosition = {
    lat: -8.057787, 
    lng: -34.882613,
  };

  const MapEvents = () => {
    // Hook do react-leaflet para obter a instância do mapa
    const map = useMap();

    // Efeito colateral que é executado quando map, startAddress, endAddress, ou routingControl mudam
    useEffect(() => {
      if (map && startAddress && endAddress && routeReady) {
        // instanciando o roteamento
        const router = L.Routing.osrmv1();

        // Função assíncrona que usa axios para obter coordenadas (latitude e longitude) para um endereço.
        const geocodeAddress = async (address) => {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              q: address,
              format: 'json',
              limit: 1
            }
          });

          const result = response.data[0];
          return [parseFloat(result.lat), parseFloat(result.lon)];
        };

        // Função assíncrona que cria um novo controle de roteamento no mapa, com base nas coordenadas de início e fim. Remove o controle anterior, se existir.
        const setRoute = async () => {
          const [startCoords, endCoords] = await Promise.all([
            geocodeAddress(startAddress),
            geocodeAddress(endAddress)
          ]);
          
          // Remove o controle de roteamento anterior, se existir
          if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
          }

          // Adiciona o controle de roteamento ao mapa com os pontos de partida e chegada.
          const newRoutingControl = L.Routing.control({
            waypoints: [
              L.latLng(startCoords[0], startCoords[1]),
              L.latLng(endCoords[0], endCoords[1])
            ],
            router: router,
            routeWhileDragging: true,
            geocoder: LControlGeocoder.nominatim()
          }).addTo(map);

          // Armazena o controle de roteamento atual no ref
          routingControlRef.current = newRoutingControl;
          map.fitBounds(newRoutingControl.getBounds());
        };

        setRoute();
        setRouteReady(false); // reseta após traçar a rota
      }
    }, [map, startAddress, endAddress, routeReady]);

    return null;
  }

  // Atualiza o endereço e, se o valor do campo de entrada tiver mais de dois caracteres, faz uma requisição à API para obter sugestões de autocompletar.
  const handleAddressChange = async (e, setAddress, setSuggestions) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 2) { // Inicia a busca após 3 caracteres
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: value,
            format: 'json',
            addressdetails: 1,
            limit: 3 // número de sugestões
          }
        });

        // Atualiza o estado com as sugestões retornadas pela API. Se o campo de entrada tiver menos de três caracteres, limpa as sugestões.
        setSuggestions(response.data);

        // Após aceitar a sugestão ou colocar o endereço, o marcador será criado 
        const lat = response.data.Lat;
        const lon = response.data.Lon;

        L.marker([lat, lon]).addTo(map)

      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (address, setAddress, setSuggestions) => {
    setAddress(address);
    setSuggestions([]); // Limpa as sugestões após seleção
  };

  const handleRouteClick = () => {
    setRouteReady(true); // Define como true quando a rota está pronta para ser recalculada
  };

  return (
    <div className="safe-alert-map">
      <div className="address-input-map">
        <div>
          <input
            type="text"
            placeholder="Endereço de origem"
            value={startAddress}
            onChange={(e) => handleAddressChange(e, setStartAddress, setStartSuggestions)}
          />
          <ul>
            {startSuggestions.map((suggestion) => (
              <li
                key={suggestion.coordinates}
                onClick={() => handleSuggestionClick(suggestion.display_name, setStartAddress, setStartSuggestions)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            placeholder="Endereço de destino"
            value={endAddress}
            onChange={(e) => handleAddressChange(e, setEndAddress, setEndSuggestions)}
          />
          <ul>
            {endSuggestions.map((suggestion) => (
              <li
                key={suggestion.coordinates}
                onClick={() => handleSuggestionClick(suggestion.display_name, setEndAddress, setEndSuggestions)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="button-safemap"
          onClick={handleRouteClick}
        >
          Buscar rota
        </button>
      </div>
      <div id='map'>
        <MapContainer center={initialPosition} zoom={12} style={{ height: '70vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapEvents />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent