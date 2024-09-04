import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const MapComponent = ({ origin, destination }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
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

  useEffect(() => {
    handleDirections();
  }, [handleDirections]);

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
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
