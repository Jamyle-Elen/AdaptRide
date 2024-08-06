import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../../assets/images'
import "./sign-up.css"

const SignUp = () => {
  return (
    <main className="main">
                <form>
            <section className="section">
                    <div className="sign_in_area">
                        <img src={images.logoAdapt} alt="Logo Adapt" />
                        <div className="sign_in_text">
                            <h2>Olá, <span>passageiro</span>! Que bom ver você novamente.</h2>
                            <p>Acesse sua conta</p>
                        </div>
                        <Link to="/sign-in"><button className='sign_in_area_button'>Entrar</button></Link>
                    </div>
                    <div className="sign_up">
                        <div className="sign_up_text">
                            <h2>Crie sua conta</h2>
                            <p>Preencha seus dados</p>
                        </div>
                        <div className="sign_up_input">
                            <input type="text" name="" id="" placeholder="Ex.: Maria Ferreira Oliveira"/>
                            <input type="number" name="" id="" placeholder="Ex.: 123.456.789-10" />
                            <input type="email" name="" id="" placeholder="Ex.: mariaferreiraoliveira@gmail.com" />
                            <input type="tel" name="" id="" placeholder="Ex.: +55 81 99999-9999"/>
                            <input type="date" name="" id="" placeholder="Ex.: 22/04/1500" />
                            <input type="password" name="" id="" placeholder="Ex.: #Maria2697V" />
                        </div>
                        <button>Cadastrar</button>
                </div>
            </section>
                </form>
        </main>
  )
}

export default SignUp
