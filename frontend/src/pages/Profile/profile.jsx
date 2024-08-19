import React, { useState, useEffect } from 'react'; 
import images from "../../assets/images";
import "./profile.css";
import api from '../../../config/axios.jsx'
import SignUpDriver from "../driver/Sign_up/sign-up-driver";



const ProfilePassenger = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Adicionar estado de carregamento
    const [error, setError] = useState(null); 
    useEffect(() => {
        // Função assíncrona para buscar os dados
        const fetchUserData = async () => {
            try {
                const response = await api.get('/info'); // Busca os dados
                setUser(response.data); // Atualiza o estado com os dados recebidos
            } catch (error) {
                setError("Failed to fetch user data"); // Define o estado de erro em caso de falha
            } finally {
                setLoading(false); // Atualiza o estado de carregamento para false
            }
        };

        fetchUserData(); // Chama a função para buscar os dados
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user data available</p>;
    return (
        <main className="profile-passenger">
            <section className="img-profile-passenger">
                <img src={images.profileAdapt} alt="Profile"/>
            </section>
            <section className="info-profile-passenger">
                <h2>{user.name}</h2>
                <section title="Personal Information">
                    <p><strong>Gênero:</strong> geee</p>
                    <p><strong>Data de nascimento:</strong> {user.date}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </section>
                <section title="accessibility">
                    <p><strong>Deficiência:</strong> deficienciaa</p>
                    <p><strong>Doença:</strong> doençaa</p>
                    <p><strong>Alergia:</strong> alergiaaa</p>
                </section>
                <section title="history">

                </section>
            </section>
        </main>
    );
};

export default ProfilePassenger;