import React from "react";
import "./about.css";
import images from "../../assets/images.js";
import NavBar from "../../components/NavBar/navbar.jsx";
import Footer from "../../components/Footer/footer.jsx";

const AboutPage = () => {
  return (
    <>
    <main className="aboutPage">
      <NavBar/>
      <section className="page">
        <div className="aboutPage-text">
          <h2>Quem somos nós?</h2>
          <p>
            Somos o AdaptRide, uma empresa comprometida em melhorar a qualidade de vida 
            dos brasileiros portadores de deficiência, 
            oferecendo uma solução de transporte acessível e inclusiva. 
            Nossa plataforma conecta usuários a motoristas treinados e veículos adaptados, 
            garantindo uma experiência de mobilidade segura e confortável. 
            Além disso, estamos dedicados a promover a conscientização sobre 
            a importância da inclusão e acessibilidade, 
            contribuindo para a construção de um Brasil mais inclusivo, 
            onde a mobilidade seja um direito garantido para todos.
          </p>
        </div>
        <div className="aboutPage-text2">
          <h2>O que fazemos?</h2>
          <p>
            Nosso objetivo é promover acessibilidade e garantir que pessoas com deficiência 
            possam utilizar os espaços urbanos 
            e serviços de transporte de forma independente e digna. 
            Trabalhamos para eliminar barreiras físicas e sociais, 
            conectando usuários a motoristas qualificados e veículos adaptados, 
            proporcionando mobilidade segura e flexível. 
            Além de facilitar o acesso ao transporte, buscamos transformar 
            a percepção da sociedade sobre a inclusão, 
            criando um ambiente mais acolhedor e acessível para todos.
          </p>
        </div>
        <div className="aboutPage-img">
          <img className="aboutPage-img2" src={images.logoAdapt2} alt="about image2" />
          <img className="aboutPage-img1" src={images.about} alt="about image" />
        </div>
      </section>
      <Footer/>
    </main>
    </>
  );
};

export default AboutPage;