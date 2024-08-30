import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import images from "../../assets/images"
import "./Profilepassenger.css";
// import api from '../../../config/axios.jsx'
import SignUpDriver from "../driver/Sign_up/sign-up-driver";

const Passenger = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [image, setImage] = useState(images.profileAdapt);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const User = {
                    name: "",
                    cpf: "",
                    email: "",
                    phone: "",
                    dateBirth: "",
                    passengerDisability: "",
                    passengerIllness: "",
                    passengerAllergy: "",  
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
        <main className="profile-driver">
            <nav className="navbar">
                <Link to="/history"><i className='bx bx-time-five'></i></Link>
                <Link to="/"><abbr title="Sair"><i className='bx bx-log-out'></i></abbr></Link>
                <Link to="/"><i className='bx bx-home-alt-2'></i></Link>
            </nav>
            <section className="info-profile-driver">
                <section className='driver'> 
                    <figure>
                        <img className='profile-img' src={image} alt="Profile"/>
                        <input type="file" onChange={handleImageChange} />
                    </figure>
                </section>

                <section className="personal-info" title="Informação Pessoal">
                    <label><strong className='dados'>Dados Pessoais</strong></label>
                    <label><strong>Name:</strong>{user.name}</label>
                    <label><strong>Cpf:</strong> {user.cpf}</label>
                    <label><strong>Email:</strong> {user.email}</label>
                    <label><strong>Telefone:</strong> {user.phone}</label>
                    <label><strong>Data de Nascimento:</strong> {user.dateBirth}</label>
                </section>

                <section className="accessibility-info" title="Acessibilidade do passageiro">
                    <div className='title'>
                        <label><strong className='title-veiculo'>Acessibilidade</strong></label>
                    </div>
                    <label><strong>Deficiência:</strong> {user.passengerDisability}</label>
                    <label><strong>Doença:</strong> {user.passengerIllness}</label> 
                    <label><strong>Alergia:</strong> {user.passengerAllergy}</label> 
                </section>
            </section>
        </main>
    );
};

export default Passenger;

