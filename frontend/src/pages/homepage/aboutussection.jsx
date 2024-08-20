import React from 'react'
import { Link } from 'react-router-dom';
import images from '../../assets/images'

function AboutUsSection() {
  return (
    <>
        <div className="about-us-section">
            <div className="accessibility">
                <h2>Acessibilidade,<br /> mobilidade e<br /> segurança.</h2>
                <div className="sign-in-up">
                    <Link to="/sign-up"><button className="sign-up">Cadastro</button></Link>
                    <span>
                        <p>Já possui uma conta?</p>
                        <Link to="/sign-in"><p className='link'>Fazer login</p></Link>
                    </span>
                </div>
            </div>
            <div className="section-accessibility">
                <figure>
                    <img className="people-adapt" src={images.peopleAdapt} alt="Pessoas com acessibilidade" />
                    <figcaption>
                    Ter a liberdade de se locomover com facilidade,<br /> conforto e segurança.
                    </figcaption>
                </figure>
                <div className="square">Conheça nossas vantagens!</div>
            </div>
        </div>
    </>
  )
}

export default AboutUsSection;
