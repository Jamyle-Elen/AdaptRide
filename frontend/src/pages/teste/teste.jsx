import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import images from "../../assets/images"
import "./teste.css";
// import api from '../../../config/axios.jsx'
// import SignUpDriver from "../driver/Sign_up/sign-up-driver";
import SideBar from '../../components/sideBar/sideBar.jsx';

const Teste = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const User = {
                    name: "",
                    cpf: "",
                    email: "",
                    phone: "",
                    dateBirth: "",
                    numCNH: "",
                    vehiclePlate: "",
                    vehicleBrand: "",
                    vehicleModel: "",  
                    vehicleColor: "",          // user.vehicleColor
                    typesAdaptations: "", // user.typesAdaptations
                    totalCapacity: "",  // user.totalCapacity
                    descriptionAdaptations: "" // user.descriptionAdaptations
                }
                setUser(User); // Atualiza o estado com os dados recebidos
            } catch (error) {
                setError("Failed to fetch user data"); 
            } finally {
                setLoading(false); 
            }
        };
        fetchUserData(); // Chama a função para buscar os dados
    }, []);
    
    if (loading) return <label>Loading...</label>;
    if (error) return <label>Error: {error}</label>;
    if (!user) return <label>No user data available</label>;
    return (
        <main className="profile-driver">
            <SideBar/>
            <section className="info-profile-driver">
                <section className='driver'> 
                <figure>
                    <img className='profile-img' src={images.profileAdapt} alt="Profile"/>
                </figure>
                </section>

                <section className="personal-info" title="Informação Pessoal">
                    <label><strong className='dados'>Dados Pessoais</strong></label>
                    <label><strong>Name:</strong>{user.name}</label>
                    <label><strong>Cpf:</strong> {user.cpf}</label>
                    <label><strong>Email:</strong> {user.email}</label>
                    <label><strong>Telefone:</strong> {user.phone}</label>
                    <label><strong>Data de Nascimento:</strong> {user.dateBirth}</label>
                    <label><strong>Número CNH:</strong> {user.numCNH}</label>
                </section>
                <section className="vehicle-info" title="Informação do veículo">
                    <div className='title'>
                        <label><strong className='title-veiculo'>Informações do veículo</strong></label>
                    </div>
                    <label><strong>Placa do veículo:</strong> {user.vehiclePlate}</label>
                    <label><strong>Marca do veículo:</strong> {user.vehicleBrand}</label> 
                    <label><strong>Modelo do veículo:</strong> {user.vehicleModel}</label> 
                    <label><strong>Cor do veículo:</strong> {user.vehicleColor}</label>
                    <label><strong>Tipos de adaptações:</strong> {user.typesAdaptations}</label>
                    <label><strong>Capacidade:</strong> {user.totalCapacity}</label> 
                    <label><strong>Descrição de adaptações:</strong> {user.descriptionAdaptations}</label>
                </section>
            </section>
        </main>
    );
};

export default Teste;
