import { GoogleMap, useJsApiLoader, CircleF } from "@react-google-maps/api"
import { APIProvider } from '@vis.gl/react-google-maps'

import "./index.css"

const MapAlert = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    gloogeMapsApiKey: 'AIzaSyDxQYu3wlZJG8HCWI1wqjA0QUDe28_W4UE',
    // gloogeMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  })

  const position = {
    lat: -8.080933,
    lng: -34.984686,
  }

  return (
    <section className="safe-area">
      <div className="safe-text">
        <h1>Não conhece a área?</h1>
        <p>O mapa indicará locais onde a entrada requer atenção:</p>
        <span>EM VERMELHO</span>
        <p>Quando o mecanismo SAFE for ativado, uma área demarcada aparecerá no mapa como no exemplo a seguir:</p>
      </div>
      <div id="map">
        <APIProvider
          apiKey={'AIzaSyDxQYu3wlZJG8HCWI1wqjA0QUDe28_W4UE'}
          onLoad={() => console.log('Maps API has loaded.')}
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={position}
              zoom={15}
            >
              <CircleF
                center={position}
                radius={200}
                options={{
                  strokeColor: '#FF0000',
                  strokeWeight: 1,
                  strokeOpacity: 1,
                  fillColor: '#FF0000',
                  fillOpacity: 0.2,
                }}
              />
            </GoogleMap>
          ) : (
            <></>
          )}
        </APIProvider>
      </div>
    </section>
  )
}

export default MapAlert