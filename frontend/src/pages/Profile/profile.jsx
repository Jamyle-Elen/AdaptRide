import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Ou outra biblioteca para requisições HTTP
import images from "../../assets/images";
import "./profile.css";

const ProfilePassenger = () => {
    const { id } = useParams(); // Recupera o ID da URL
    const [passengerData, setPassengerData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5173/passengers`)
            .then(response => {
                setPassengerData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the passenger data!", error);
            });
    }, [id]);

    if (!passengerData) {
        return <p>Loading...</p>;
    }

    return (
        <main className="main-profile-passenger">
            <section className="img-profile-passenger">
                <img src={images.profileAdapt} alt="Profile" />
            </section>
            <section className="info-profile-passenger">
                <h2>{passengerData.name}</h2>
                <div className="info-section">
                    <h5>Informações Pessoais</h5>
                    <p><strong>Date of Birth:</strong> {passengerData.birthDate}</p>
                    <p><strong>Email:</strong> {passengerData.email}</p>
                    <p><strong>Phone:</strong> {passengerData.phone}</p>
                </div>
                <div className="contact-section">
                    <h5>Emergency Contact Details</h5>
                    <p><strong>Name:</strong> {passengerData.emergencyContactName}</p>
                    <p><strong>Phone:</strong> {passengerData.emergencyContactPhone}</p>
                </div>
                <div className="disability-section">
                    <h5>Disability Information</h5>
                    <p><strong>Type of Disability:</strong> {passengerData.disabilityType}</p>
                    <p><strong>Special Needs:</strong> {passengerData.specialNeeds}</p>
                </div>
            </section>
        </main>
    );
};

export default ProfilePassenger;


// import React from "react";
// import images from "../../assets/images";
// import "./profile.css";

// const ProfilePassenger = () => {
//     return (
//         <main className="main-profile-passenger">
//             <section className="img-profile-passenger">
//                 <img src={images.profileAdapt} alt="Profile" />
//             </section>
//             <section className="info-profile-passenger">
//                 <h2>Maria Oliveira</h2>
//                 <div className="info-section">
//                     <h5>Informações Pessoais Básicas</h5>
//                     <p><strong>Data de Nascimento:</strong> 01/01/1980</p>
//                     <p><strong>E-mail:</strong> maria.oliveira@example.com</p>
//                     <p><strong>Telefone:</strong> (11) 98765-4321</p>
//                 </div>
//                 <div className="contact-section">
//                     <h5>Detalhes de Contato de Emergência</h5>
//                     <p><strong>Nome:</strong> João Oliveira</p>
//                     <p><strong>Telefone:</strong> (11) 91234-5678</p>
//                 </div>
//                 <div className="disability-section">
//                     <h5>Informações sobre a Deficiência</h5>
//                     <p><strong>Tipo de Deficiência:</strong> Mobilidade Reduzida</p>
//                     <p><strong>Necessidades Especiais:</strong> Necessidade de veículo adaptado com rampa</p>
//                 </div>
//             </section>
//         </main>
//     );
// };

// export default ProfilePassenger;
