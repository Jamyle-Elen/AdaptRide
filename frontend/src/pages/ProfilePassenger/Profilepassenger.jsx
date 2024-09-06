import React, { useState, useEffect } from 'react'; 
<<<<<<< HEAD
import { useParams, Link } from 'react-router-dom';
import images from "../../assets/images.js"
import "./ProfilePassenger.css";
=======
import { useParams, Link, useNavigate } from 'react-router-dom';
import images from "../../assets/images"
import "./profilePassenger.css";
>>>>>>> backup-project
import SideBar from '../../components/sideBar/sideBar.jsx';
import { api } from '../../../config/axios.js'
import SignUpDriver from "../driver/Sign_up/sign-up-driver.jsx";

const Passenger = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [image, setImage] = useState(images.profileAdapt);
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchUserData = async () => {
            const token = JSON.parse(sessionStorage.getItem("authToken"))
            console.log(token)
            try {
                const response = await api.get(`/profile/passenger/${token}`)
                setUser(response.data)
                console.log(response.data)
                navigate('/profile/passenger/${token}')
                // setUser(user); // Atualiza o estado com os dados recebidos
            } catch (error) {
                setError("Failed to fetch user data"); 
            } finally {
                setLoading(false); 
            }
        };
        fetchUserData(); // Chama a função para buscar os dados
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (loading) return <label>Loading...</label>;
    if (error) return <label>Error: {error}</label>;
    if (!user) return <label>No user data available</label>;
    
    return (
        <main className="profile-passenger-page">
            <SideBar/>
            <section className="info-profile-passenger">
                <section className='passenger'> 
                    <figure>
                        <img className='profile-img-passenger' src={image} alt="Profile"/>
                    </figure>
                </section>

                <section className="personal-info-passenger" title="Informação Pessoal">
                    <label><strong className='personal-data-passenger'>Dados Pessoais</strong></label>
                    <label><strong>Name:</strong>{user.name}</label>
                    <label><strong>Cpf:</strong> {user.cpf}</label>
                    <label><strong>Email:</strong> {user.email}</label>
                    <label><strong>Telefone:</strong> {user.phone}</label>
                    <label><strong>Data de Nascimento:</strong> {user.date}</label>
                </section>

                <section className="accessibility-info" title="Acessibilidade do passageiro">
                    <div className='title-accessibility-passenger'>
                        <label><strong className='accessibility-passenger'>Acessibilidade</strong></label>
                    </div>
                    <label><strong>Deficiência:</strong> {user.disability}</label>
                    <label><strong>Nivel de assistência:</strong> {user.assistanceLevel}</label> 
                    <label><strong>Contato de Emergência:</strong> {user.contactName}</label> 
                    <label><strong>Informações adcionais :</strong> {user.emergencyContact}</label>
                </section>
            </section>
        </main>
    );
};

export default Passenger;

