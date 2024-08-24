import React, { useState, useEffect } from "react";
import "./history.css";
import api from "../../../config/axios.jsx";
import images from "../../assets/images.js";

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
  const corridas = [
    { valor: 50, data: '12/12/12', horario: '12:20', origem: 'Curado IV', destino: 'Igarassu' },
    { valor: 500, data: '13/12/12', horario: '13:30', origem: 'Boa Viagem', destino: 'Olinda' },
  ];

  const toggleDetails = (index) => {
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !updatedShowDetails[index];
    setShowDetails(updatedShowDetails);
  };
    for (let i = 0; i < 2; i++){
      list.push(
        <tr key={i}>
          <div className="ride-item">
        <td>
          <img src={images.carAdapt} alt="" />
        </td>
        <td>
          <div className="ride-info">
          <div>
              <strong>Data: {corridas[i].data}</strong>
              <strong>Horário: {corridas[i].horario}</strong>
            </div>
            <div>
              <strong>De: {corridas[i].origem} </strong>
              <strong>Para: {corridas[i].destino}</strong>
            </div>
            <div>
              <strong>Valor: R$ {corridas[i].valor}</strong>
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
              <p>Informações adicionais sobre a corrida #{i + 1}</p>
              <p>Data e horário: {corridas[i].data} às {corridas[i].horario}</p>
              <p>Origem: {corridas[i].origem}</p>
              <p>Destino: {corridas[i].destino}</p>
              <p>Valor: R$ {corridas[i].valor}</p>
              <p>Outras informações: ...</p>
            </div>
          </td>
        )}
      </div>
      </tr>

      ) 
    }

    return (
      <div className="ride-history-page">
        <section className="ride-history-section">
          <label><h1>Atividade</h1></label>
          <h2 className="title">Corridas</h2>
          <table className="ride-list">
            <tbody>
              
              {
                list}

            </tbody>
          </table>
        </section>
      </div>
    );
  };

const handleViewDetails = (rideId) => {
  // Redireciona para uma página de detalhes da corrida ou abre um modal
  console.log(`Viewing details for ride ${rideId}`);
};

export default RideHistory;
