import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './index.css';

const MapComponent = () => {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [routingControl, setRoutingControl] = useState(null);
  const [routeReady, setRouteReady] = useState(false);

  const initialPosition = {
    lat: -8.080933,
    lng: -34.984686,
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: { lat, lon, format: 'json' },
      });
      return response.data.display_name;
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      if (map && startAddress && endAddress && routeReady) {
        const router = L.Routing.osrmv1();

        const geocodeAddress = async (address) => {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: { q: address, format: 'json', limit: 1 },
          });
          const result = response.data[0];
          return [parseFloat(result.lat), parseFloat(result.lon)];
        };

        const setRoute = async () => {
          const [startCoords, endCoords] = await Promise.all([
            geocodeAddress(startAddress),
            geocodeAddress(endAddress),
          ]);

          if (routingControl) {
            map.removeControl(routingControl);
          }

          const newRoutingControl = L.Routing.control({
            waypoints: [
              L.latLng(startCoords[0], startCoords[1]),
              L.latLng(endCoords[0], endCoords[1]),
            ],
            router: router,
            routeWhileDragging: true,
          }).addTo(map);

          setRoutingControl(newRoutingControl);
          map.fitBounds(newRoutingControl.getBounds());
        };

        setRoute();
        setRouteReady(false);
      }
    }, [map, startAddress, endAddress, routeReady]);

    return null;
  };

  const handleAddressChange = async (e, setAddress, setSuggestions) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 2) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: { q: value, format: 'json', addressdetails: 1, limit: 1 },
        });

        const simplifiedSuggestions = response.data.map((item) => {
          // Extrai apenas as partes desejadas do endereço (cidade e país)
          const addressParts = item.display_name.split(',').slice(-2).join(', ').trim();
          return { display_name: addressParts, lat: item.lat, lon: item.lon };
        });

        setSuggestions(simplifiedSuggestions);
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleRouteClick = () => {
    setRouteReady(true);
  };

  const handleSuggestionClick = (suggestion, setAddress) => {
    setAddress(suggestion.display_name);
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
                key={`${suggestion.lat}-${suggestion.lon}`}
                onClick={() => handleSuggestionClick(suggestion, setStartAddress)}
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
                key={`${suggestion.lat}-${suggestion.lon}`}
                onClick={() => handleSuggestionClick(suggestion, setEndAddress)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        </div>
        <button className="button-safemap" onClick={handleRouteClick}>
          Buscar rota
        </button>
      </div>
      <div id="map">
        <MapContainer center={initialPosition} zoom={15} style={{ height: '100vh', width: '100%' }}>
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

export default MapComponent;
