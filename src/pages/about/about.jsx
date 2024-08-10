import React from "react";
import "./about.css"

const AboutPage = () => {
    return (
            <main className="aboutPage">
                <section className="aboutPage_text1">
                    <h2>Quem somos nós?</h2>
                    <p>
                    Somos o AdaptRide que está comprometido em ajudar e melhorar a qualidade de vida de brasileiros portadores de deficiência física e de mobilidade reduzida.
                    </p>
                </section>
                <section className="aboutPage_text2">
                    <h2>O que fazemos?</h2>
                    <p>
                    Nosso objetivo é promover acessibilidade e oferecer às pessoas com deficiência condições de uso dos espaços urbanos e dos serviços de transporte. Eliminando barreiras e garantindo a inclusão social, flexibilidade e ajudando a transformar a mobilidade para todos aqueles que apresentam alguma condição de deficiência.   
                    </p>
                </section>
                <section className="aboutPage_text3">
                    <h2>Onde vamos?</h2>
                    <p>
                    
Nossa missão é fortalecer e sustentar o direito de ir e vir garantindo oportunidades comprometimento em ajudar passageiros e motoristas, realizando pesquisa de usuários e comunicação/políticas a criar soluções que possam ajudar todos a se locomoverem em suas comunidades.
                    </p>
                </section>
            </main>
    )
}

export default AboutPage;