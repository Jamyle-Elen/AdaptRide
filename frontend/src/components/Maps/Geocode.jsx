import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CustomMap = () => {
  const initialPosition = [-5.87914, -5.91094];
  const riskAreas = [
    { lat: -5.887258, lon: -54.914304, info: "risco" },
    { lat: -5.891234, lon: -54.915678, info: "risco" },
  ];

  return (
    <MapContainer center={initialPosition} zoom={16} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {riskAreas.map((area, idx) => (
        <Marker key={idx} position={[area.lat, area.lon]}>
          <Popup>
            {area.info} <br /> Local de risco elevado.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CustomMap;
