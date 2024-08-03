import React from "react";
import images from "../../assets/images";
import "./profile.css"

const ProfilePassenger = () => {
    return(
        <main className="main-profile-passenger">
            <section className="img-profile-passenger">
                <img src={images.profileAdapt} alt="Imagem de perfil" />
            </section>
            <section className="text-profile-passenger">
                <h2>Maria Oliveira</h2>
                <div className="text-bio">
                    <h5>BIO</h5>
                    <p className="text-bio-item">Lorem, ipsum dolor sit amet consectetur adipisicing elit. At et aperiam minima possimus fugiat doloremque quisquam obcaecati amet cupiditate dolores reiciendis ratione odio quo veniam ad, quam explicabo repudiandae quae.</p>
                </div>
                <div className="text-suport">
                    <h5>SUPORTE</h5>
                    <div className="suport-items">
                        <p className="item">Cadeira de Rodas</p>
                        <p className="item">Kit de primeiros socorros</p>
                    </div>
                </div>
                <h3>Informações</h3>
            </section>
        </main>
    )
}

export default ProfilePassenger