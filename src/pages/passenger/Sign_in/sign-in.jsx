import React from 'react'
import images from '../../../assets/images'
import { Link } from 'react-router-dom'
import './sign-in.css'

const SignIn = () => {
  return (
    <main className="main">
        <section className="section">
            <div className="sign-in">
                <div className="sign-in-text">
                    <h2>Login</h2>
                    <p>Insira seus dados</p>   
                </div>
                <div className="sign-in-input">
                    <input type="email" name="" id="" placeholder="E-mail" />
                    <input type="password" name="" id="" placeholder="Senha" />
                    <p>Esqueci minha senha</p>
                </div>
                <Link to="/profile-passenger"><button className="profile-passenger">Entrar</button></Link>
                </div>
                <div className="sign-up-area">
                    <img src={images.logoAdapt} alt="Logo Adapt" />
                    <div className="sign-up-text">
                    <h2>Ainda não possui conta?</h2>
                    <p>Crie sua conta</p>
                </div>
                <button className="sign-up-area-button">Cadastrar</button>
            </div>
        </section>
    </main>
  )
}

export default SignIn
