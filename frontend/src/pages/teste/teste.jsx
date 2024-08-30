import React, { useState, useEffect } from 'react'; 
import { useParams, Link, useNavigate } from 'react-router-dom';
import images from "../../assets/images"
import "./teste.css";
import SideBar from '../../components/sideBar/sideBar.jsx';
import { api } from '../../../config/axios.js'
import SignUpDriver from "../driver/Sign_up/sign-up-driver";
import { errorToast } from '../../utils/toastUtils.jsx';

const Teste = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await api.get(`/profile/driver/${id}`);
                setUser(response.data);
                navigate(`/teste/${response.data.id}`);
            } catch (error) {
                errorToast("Falha ao buscar dados do motorista. Tente novamente mais tarde.");
                if (error.response && error.response.data && error.response.data.message) {
                  errorToast(error.response.data.message);
                } else {
                  errorToast("Falha ao realizar login, tente novamente!");
                }
                console.error("Erro ao fazer login:", error.response ? error.response.data : error.message);
              }
        };
        fetchUserData();
    }, [id]);
    if(!user) return null

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
                    <label><strong>Name:</strong> {user.name}</label>
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
