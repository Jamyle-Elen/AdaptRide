import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../assets/images.js'

function BenefitsSection() {
  return (
    <>
    <div className="benefits-section">
        <div className="card-benefits">
            <div className="card">
                <img src={images.car2Adapt} alt="Carro" />
            </div>
            <div className="card">
                <h5>Não conhece a área?</h5>
                <p className="description">O mapa indicará locais onde a entrada requer atenção.:</p>
                <p className="alert">EM VERMELHO</p>
                <p className="safe">Quando o SAFE notificar um alerta, siga os passos a seguir:</p>
                <div className="icons">
                    <i className='bx bxs-alarm-exclamation' ></i>
                    <p>Ligue o pisca alerta!</p>
                </div>
                <div className="icons">
                    <i className='bx bxs-alarm-exclamation' ></i>
                    <p>Ligue o pisca alerta!</p>
                </div>
                <div className="icons">
                    <i className='bx bxs-alarm-exclamation' ></i>
                    <p>Ligue o pisca alerta!</p>
                </div>
                <div className="icons">
                    <i className='bx bxs-alarm-exclamation' ></i>
                    <p>Ligue o pisca alerta!</p>
                </div>
            </div>
            <div className="card">
                <h5>Corrida BÔNUS</h5>
                <p className="description">Passageiros idosos ou que tenha alguma deficência são corridas bônus!</p>
                <img src={images.moneyAdapt} alt="Moeda" />
            </div>
        </div>
    </div>
    </>
  )
}

export default BenefitsSection;
