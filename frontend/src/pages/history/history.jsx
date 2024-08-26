import React, { useState, useEffect } from "react";
import "./history.css";
import api from "../../../config/axios.jsx";
import images from "../../assets/images.js";
import NavBar from "../../components/NavBar/navbar.jsx";
import SideBar from "../../components/sideBar/sideBar.jsx";
const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //     const fetchRideHistory = async () => {
  //         try {
  //             const response = await api.get('/rides/history'); // Endpoint para obter o histórico de corridas
  //             setRides(response.data);
  //         } catch (error) {
  //             setError('Falha ao buscar o histórico de viagens');
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchRideHistory();
  // }, []);

  // if (loading) return <p>Carregando...</p>;
  // if (error) return <p>{error}</p>;
  // if (rides.length === 0) return <p>Nenhum histórico de viagens disponível</p>;

  //   <div class="ride-item">
  //     <Link to = "/"><i className="ride-link" class='bx bx-car'></i></Link>
  //   <div/>

  const [showDetails, setShowDetails] = useState([false, false]); // Estado para controlar a exibição dos detalhes para cada corrida

  const list = [];
  const ride = [
    { valor: 50, data: '12/12/12', horario: '12:20', origem: 'Curado IV', destino: 'Igarassu' },
   
 
  ];

  const toggleDetails = (index) => {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !updatedShowDetails[index];
    setShowDetails(updatedShowDetails);
  };
  
    for (let i = 0; i < 1; i++){
      list.push(
        <tr key={i}>
          <div className="ride-item">
        <td>
          <img src={images.carAdapt} alt="" />
        </td>
        <td>
          <div className="ride-info">
            <div className="ride-details">
                <label><strong>Data: {ride[i].data}</strong></label>
                <label><strong>Horário: {ride[i].horario}</strong></label>
              </div>
              <div>
                <label><strong>De: {ride[i].origem} </strong></label>
                <label><strong>Para: {ride[i].destino}</strong></label>
              </div>
              <div>
                <label><strong>Valor: R$ {ride[i].valor}</strong></label>
            </div>
          </div>
        </td>
        <td>
          <button onClick={() => toggleDetails(i)}>
            {showDetails[i] ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
          </button>
        </td>
        {showDetails[i] && (
          <td colSpan="3">
            <div className="more-info">
              <p>Data e horário: {ride[i].data} às {ride[i].horario}</p>
              <p>Origem: {ride[i].origem}</p>
              <p>Destino: {ride[i].destino}</p>
              <p>Valor: R$ {ride[i].valor}</p>
              <p>Outras informações: ...</p>
            </div>
          </td>
        )}
      </div>
      </tr>
      ) 
    }

    return (
      <>
      <SideBar/>
      <div className="ride-history-page">
        <section className="ride-history-section">
          <h1>Atividade</h1>
          <h2 className="title">Corridas</h2>
          <table className="ride-list">
            <tbody>
              {ride.map((corrida, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td>
                      <img src={images.carAdapt} alt="Carro adaptado" />
                    </td>
                    <td className="ride-item">
                      <div className="ride-info">
                        <div>
                          <strong>Data: {ride.data}</strong>
                        </div>
                        <div>
                          <strong>Destino: {ride.destiny}</strong>
                        </div>
                        <div>
                          <strong>Valor: R$ {ride.valor}</strong>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => toggleDetails(i)}>
                        {showDetails[i] ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
                      </button>
                    </td>
                  </tr>
                  {showDetails[i] && (
                    <tr>
                      <td colSpan="3">
                        <div className="more-info">
                          <p>Passageiro: {ride.driver}</p>
                          <p>horário: {ride.time}</p>
                          <p>De: {ride.destiny}</p>
                          <p>Para: {ride.destiny}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </section>
      </div></>
    );
  };

const handleViewDetails = (rideId) => {
  // Redireciona para uma página de detalhes da corrida ou abre um modal
  console.log(`Viewing details for ride ${rideId}`);
};

export default RideHistory;
