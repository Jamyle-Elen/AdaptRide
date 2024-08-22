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

  return (
    <div className="ride-history-page">
      <section className="ride-history-section">
        <h1>Atividade</h1>
        <h2 className="title">Corridas</h2>
        <table className="ride-list">
          <tbody>
            <tr>
              <td>
                <img src={images.carAdapt} alt="" />
              </td>
              <td>
                <div className="ride-info">
                  <span>
                    <strong>Data: 12/12/12</strong>
                  </span>
                  <span>
                    <strong>Horário: 12:20</strong>
                  </span>
                  <span>
                    <strong>de: Lima e Abreu</strong>
                  </span>
                  <span>
                    <strong>Para: Guararapes</strong>
                  </span>
                  <span>
                    <strong>Valor:70</strong>
                  </span>
                </div>
              </td>
              <td>
                <button> Detalhes </button>
              </td>
            </tr>
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
