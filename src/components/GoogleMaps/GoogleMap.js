import react from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// Caso o mapa não funcione a localização vai ficar como default
// -8.0628052,-34.8720293
// const center = {
//  d
// }


// no vite nao se utiliza process.env, agora é import.meta.env
const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.APIKEY,
  });
  return;
  <div>
    {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width: '100%', height: '100%'}}
        center={{
          lat: -8.0628052,
          lng: -34.8720293
        }}
        zoom={15} // distancia do mapa
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
    ) : (
      <></>
    )}
  </div>;
};

export default MapPage;
