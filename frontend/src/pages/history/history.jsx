import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './../../components/sideBar/sideBar.jsx';
import './history.css';
import images from "../../assets/images.js";


// const RideHistory = () => {
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();


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

 // Componente RideDetails que renderiza os detalhes da corrida dinamicamente
 const rideData = [
  { data: "10/05/2023", destiny: "São Paulo", price: "R$ 50,00", origin: "Brasília", driver: "João", passenger: "Maria", time: "10:00" },
  { data: "15/05/2023", destiny: "Rio de Janeiro", price: "R$ 80,00", origin: "Brasília", driver: "João", passenger: "Maria", time: "10:00" },
  { data: "20/05/2023", destiny: "Curitiba", price: "R$ 100,00", origin: "Brasília", driver: "João", passenger: "Maria", time: "10:00" },
];
const RideDetails = ({ ride, userType = 'driver' }) => (
  <tr>
    <td colSpan="3">
      <div className="more-info">
        {/* Exibe o nome do passageiro se for um motorista, ou do motorista se for um passageiro */}
        <p>{userType === 'driver' ? `Passageiro: ${ride.passenger}` : `Motorista: ${ride.driver}`}</p>
        <p>Horário: {ride.time}</p>
        <p>De: {ride.origin}</p>
        <p>Para: {ride.destiny}</p>
      </div>
    </td>
  </tr>
);

// Componente RideItem que renderiza uma corrida na lista
const RideItem = ({ ride, i, showDetails, toggleDetails, userType }) => (
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
            <strong>Valor: R$ {ride.price}</strong>
          </div>
        </div>
      </td>
      <td>
        <button onClick={() => toggleDetails(i)}>
          {showDetails[i] ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
        </button>
      </td>
    </tr>
    {showDetails[i] && <RideDetails ride={ride} userType={userType} />}
  </React.Fragment>
);

// Componente principal RideHistory
const RideHistory = ({ userType }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState([false, false, false]); // Estado para controlar a exibição dos detalhes
  const navigate = useNavigate();


  const toggleDetails = (index) => {
    setShowDetails((prevDetails) =>
      prevDetails.map((show, i) => (i === index ? !show : show))
    );
  };

  

  return (
    <>
      <SideBar />
      <div className="ride-history-page">
        <section className="ride-history-section">
          <h2 className="title">Corridas</h2>
          <table className="ride-list">
            <tbody>
              {rideData.map((ride, i) => (
                <RideItem
                  key={i}
                  ride={ride}
                  i={i}
                  showDetails={showDetails}
                  toggleDetails={toggleDetails}
                  userType={userType}
                />
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default RideHistory;