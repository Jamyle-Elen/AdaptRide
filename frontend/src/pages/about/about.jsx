import React from "react";
import "./about.css";
import images from "../../assets/images";
import NavBar from "../../components/NavBar/navbar.jsx";

const AboutPage = () => {
  return (
    <>
    <NavBar />
    <main className="aboutPage">
      <section className="page">
        <div className="aboutPage_text">
          <h2>Quem somos nós?</h2>
          <p>
            Somos o AdaptRide que está comprometido em ajudar e melhorar a
            qualidade de vida de brasileiros portadores de deficiência.
          </p>
        </div>
        <div className="aboutPage_img">
          <img src={images.about} alt="about image" />
          <img className="aboutPage_img2" src={images.logoAdapt2} alt="about image2" />
        </div>

        <div className="aboutPage_text">
          <h2>O que fazemos?</h2>
          <p>
            Nosso objetivo é promover acessibilidade e oferecer às pessoas com
            deficiência, condições de uso dos espaços urbanos e dos serviços de
            transporte.
            <p>
              Eliminando barreiras e garantindo a inclusão social, flexibilidade
              e ajudando a transformar a mobilidade para todos.
            </p>
          </p>
        </div>
      </section>
    </main>
    </>
  );
};

export default AboutPage;
