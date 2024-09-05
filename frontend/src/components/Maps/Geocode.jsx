import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer, Polyline } from "@react-google-maps/api";

const LIBRARIES = ['places'];

const containerStyle = {
  width: "100%",
  height: "100%",
};

// preview (em testes)
const dangerousRoutes = [
  { origin: "Av. Caxangá, 1200 - Cordeiro", destination: "Av. Caxangá, 1300 - Cordeiro" },
  { origin: "Rua do Sossego, 10 - Boa Vista", destination: "Rua do Sossego, 200 - Boa Vista" },
  { origin: "Rua dos Prazeres, 12 - Santo Amaro", destination: "Rua dos Prazeres, 300 - Santo Amaro" },
  { origin: "Rua do Sol, 50 - Recife Antigo", destination: "Rua do Sol, 250 - Recife Antigo" },
  { origin: "Av. Sul, 300 - Cabanga", destination: "Av. Sul, 800 - Cabanga" },
  { origin: "Rua Leão Coroado, 10 - Alto José do Pinho", destination: "Rua Leão Coroado, 100 - Alto José do Pinho" },
  { origin: "Rua da Aurora, 1500 - Santo Amaro", destination: "Rua da Aurora, 1800 - Santo Amaro" },
  { origin: "Rua Araripina, 100 - Cohab", destination: "Rua Araripina, 300 - Cohab" },
  { origin: "Rua da Paz, 200 - Afogados", destination: "Rua da Paz, 400 - Afogados" },
  { origin: "Rua Real da Torre, 10 - Madalena", destination: "Rua Real da Torre, 300 - Madalena" },
  { origin: "Rua da Harmonia, 12 - Casa Amarela", destination: "Rua da Harmonia, 600 - Casa Amarela" },
  { origin: "Rua Itapemirim, 100 - Imbiribeira", destination: "Rua Itapemirim, 400 - Imbiribeira" },
  { origin: "Rua Treze de Maio, 50 - Olinda", destination: "Rua Treze de Maio, 150 - Olinda" },
  { origin: "Avenida Sigismundo Gonçalves, 100 - Olinda", destination: "Avenida Sigismundo Gonçalves, 300 - Olinda" },
  { origin: "Estrada da Batalha, 400 - Prazeres", destination: "Estrada da Batalha, 1000 - Prazeres" },
  { origin: "Avenida General Manuel Rabelo, 300 - San Martin", destination: "Avenida General Manuel Rabelo, 800 - San Martin" }
];

const MapComponent = ({ origin, destination }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [dangerousRoutesPolyline, setDangerousRoutesPolyline] = useState([]);
  const [map, setMap] = useState(null);

  const handleDirections = useCallback(() => {
    if (origin && destination && map) {
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(destination.lat, destination.lng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`Erro ao buscar direções: ${status}`);
          }
        }
      );
    }
  }, [origin, destination, map]);

  const drawDangerousRoutes = useCallback(() => {
    const service = new window.google.maps.DirectionsService();

    dangerousRoutes.forEach((route) => {
      service.route(
        {
          origin: route.origin,
          destination: route.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const path = result.routes[0].overview_path;
            setDangerousRoutesPolyline((prevPaths) => [
              ...prevPaths,
              { path },
            ]);
          } else {
            console.error(`Erro ao buscar rota da rua perigosa: ${status}`);
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    handleDirections();
    if (isLoaded) {
      drawDangerousRoutes();
    }
  }, [handleDirections, isLoaded, drawDangerousRoutes]);

  if (loadError) {
    return <div>Erro ao carregar MAPS: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="safe-alert-map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={origin || { lat: -8.057787, lng: -34.882613 }}
        zoom={15}
        onLoad={(map) => setMap(map)}
      >
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: false,
            }}
          />
        )}

        {dangerousRoutesPolyline.map((route, index) => (
          <Polyline
            key={index}
            path={route.path}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
