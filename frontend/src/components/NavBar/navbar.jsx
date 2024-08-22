import React from "react";
import { Link } from "react-router-dom";
import '../NavBar/navbar.css';
import images from "../../assets/images.js";

const NavBar = () => {
  return (
    <>
      <div className="menu-nav">
        <div className="menu-content">
          <div className="class1">
            <Link to="/"><img src={images.logoAdapt} alt="Logo" /></Link>
            <ul className="list">
              <li>
                <Link to="/sign-in/driver" className="list-item">Dirigir</Link>
              </li>
              <li>
                <Link to="/aboutpage" className="list-item">Sobre</Link>
              </li>
            </ul>
          </div>
          <div className="list" id="list-two">
            <ul className="list">
              <li>
                <Link to="/help" className="list-item">Ajuda</Link>
              </li>
              <li>
                <Link to="/sign-in" className="list-item">Login</Link>
              </li>
            </ul>
            <Link to="/sign-up"><button>Cadastre-se</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
