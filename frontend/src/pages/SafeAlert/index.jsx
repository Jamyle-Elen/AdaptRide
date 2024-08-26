import { GoogleMap, useJsApiLoader, CircleF } from "@react-google-maps/api"

import "./index.css"

const SafeAlert = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    gloogeMapsApiKey: "AIzaSyDxQYu3wlZJG8HCWI1wqjA0QUDe28_W4UE",
  })

  const position = {
    lat: -8.082321, 
    lng: -34.985314,
  }

  return (
    // Forma para aplicar uma marcação geométrica em uma região do mapa
    <section className="safe-area">
      <div className="safe-text">
        <h1>Aqui será exibido o mapa</h1>
        <p>Algumas observações e cuidados</p>
      </div>
      <div className="safe-map" id="safe-map">
        { isLoaded ? (
          <GoogleMap 
            mapContainerStyle={{ width: "70vw", height: "50vh" }}
            center={position}
            zoom={15}
          >
          <CircleF 
            center={position}
            radius={500}
            options={{
              strokeColor: '#FF0000',
              strokeWeight: 1,
              strokeOpacity: 1,
              fillColor: '#FF0000',
              fillOpacity: 0.2,
            }}
          />
          </GoogleMap>
          ) : <></>
        }
      </div>
    </section>
  )
}

export default SafeAlert