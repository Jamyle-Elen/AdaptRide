import React from "react";
import { Link } from "react-router-dom";
import images from "../../../assets/images.js";
import "./benefitssection.css";

const BenefitsSection = () => {
    return (
        <section className="benefits-section">
            <div className="benefits-content">
                <figure>
                    <figurecaption>
                        SAFE
                    </figurecaption>
                    <img className="car-safe" src={images.car3Adapt} alt="car image" />
                </figure>
                <div className="description">
                    <p>SAFE é um mecanismo de defesa para lugares onde requer uma atenção extra na hora de dirigir.</p>
                    <p>Ele é ativado assim que entrar em áreas de riscos.</p>
                    <Link to="/safealert">
                        <p>Saiba mais</p>
                    </Link>
                    {/* <abbr title="Indisponivel">
                        <p>Saiba mais</p>
                    </abbr> */}
                    <Link to="/sign-up/driver" className="description-button"><button>Quero ser motorista</button></Link>
                </div>
            </div>
            <div className="card-benefits">
                <figure className="card">
                    <img className="def-icon" src={images.def1Icon} alt="icon" />
                </figure>
                <figure className="card">
                    <img className="def-icon" src={images.def2Icon} alt="icon" />
                </figure>
                <figure className="card">
                    <img className="def-icon" src={images.def3Icon} alt="icon" />
                </figure>
                <figure className="card">
                    <img className="def-icon" src={images.def4Icon} alt="icon" />
                </figure>
                <figure className="card">
                    <img className="def-icon" src={images.def5Icon} alt="icon" />
                </figure>
                <figure className="card">
                    <img className="def-icon" src={images.def6Icon} alt="icon" />
                </figure>
            </div>
            <div className="benefits">
                <p>Seu direito de ir e vir!</p>
            </div>
        </section>
    )
}

export default BenefitsSection;
