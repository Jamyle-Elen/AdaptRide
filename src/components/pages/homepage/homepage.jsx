import React from "react"
import "./homepage.css"

const HomePage = () => {
    return(
        <main>
            <section className="search">
                <div className="left-side">
                    <div className="text">
                        <h1>Seu transporte inclusivo e seguro!!</h1>
                        <p>Viagens confortáveis, solicite agora.</p>
                    </div>
                    <div className="input">
                        <input type="text" placeholder="Insira o local de partica" />
                        <input type="text" placeholder="Pra onde você quer ir?" />
                    </div>
                </div>
                <div className="car-img">
                    <img src="./src/assets/car-adapt.png" alt="car adapt" />
                </div>
            </section>

            <section className="search2">
                <div className="search2-left-side">
                    <div className="text">
                        <h1>Acessibilidade, mobilidade e segurança.</h1>
                    </div>
                    <div className="button">
                        <button>Cadastro</button>
                        <p>Já possui uma conta?</p>
                        <a href="">Fazer Login</a>
                    </div>
                </div>
                <div className="people-img">
                    <img src="./src/assets/people-adapt.png" alt="Imagem ilustrativa de pessoas" />
                    <p>Ter a liberdade de se locomover com facilidade, conforto e segurança.</p>
                </div>
            </section>

            <section className="search3">
                <div className="content">
                    <div className="content-img">
                        <img src="./src/assets/car2-adapt.png" alt="imagem de carro" />
                    </div>
                    <div className="content-text1">
                        <h2>Não conhece a área?</h2>
                        <p>O mapa indicará locais onde a entrada requer atenção:</p>
                        <span>EM VERMELHO</span>
                        <p>Quando o SAFE notificar um alerta, siga os passos a seguir:</p>
                        <ul>
                            <li>Ligue o pisca alerta!</li>
                            <li>Abaixe os vidros!</li>
                            <li>Ligue a luz de salão (Noite)</li>
                            <li>Retire o celular do suporte</li>
                        </ul>
                    </div>
                    <div className="content-text2">
                        <h2>Corridas <span>BÔNUS</span>!</h2>
                        <p>Passageiros idosos ou que tenha alguma deficiência são corridas bônus.</p>
                        <img src="./src/assets/money-adapt.png" alt="simbolo da dinheiro" />
                    </div>
                </div>
                <div className="search3-button">
                    <button>Quero ser motorista</button>
                </div>
            </section>
        </main>
    )
}

export default HomePage