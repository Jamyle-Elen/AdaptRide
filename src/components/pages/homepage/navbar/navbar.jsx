import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';
// import images from "../../../../assets/images.js";

const NavBar = () => {
  const ModeAccess = () => {
    console.log('A');
  };

  return (
    <>
      <div className="menu">
        <div className="menu-content">
          <div className="class1">
            {/* <Link to="/"><img src={logoAdapt} alt="Logo" /></Link> */}
            <ul className="list">
              <li>
                <Link to="/request-a-ride">Solicitar Corrida</Link>
              </li>
              <li>
                <Link to="/driver">Dirigir</Link>
              </li>
              <li className="drop_down_item">
                <Link to="/about">Sobre<i className="bx bx-chevron-down"></i></Link>
              </li>
            </ul>
          </div>
          <div className="list" id="list-two">
            {/* <button className="access" onClick={ModeAccess}>A</button> */}
            <ul className="list">
              <li className="drop_down_item">
                <Link to="/help">Ajuda<i className="bx bx-chevron-down"></i></Link>
              </li>
              <li>
                <Link to="/sign-in">Login</Link>
              </li>
            </ul>
            <Link to="/sign-in"><button>Cadastre-se</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
