import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../NavBar/navbar.css';
import images from "../../assets/images.js";
import { sucessToast } from "../../utils/toastUtils.jsx";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");

    console.log("userFromStorage:", userFromStorage);

    if (userFromStorage && userFromStorage !== 'undefined') {
      try {
        const loggedInUser = JSON.parse(userFromStorage);
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error("Erro ao parsear o JSON do usuário:", error);
      }
    } else {
      console.log("Nenhum usuário encontrado no localStorageee");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
    window.location.reload();
    sucessToast("Logout efetuado com sucesso");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
    <div className="menu-nav">
      <div className="menu-content">
        <div className="class1">
          <Link to="/">
            <img src={images.logoAdapt} alt="Logo" className="logo" />
          </Link>
          <ul className="list">
            <li>
              <Link to="/sign-in/driver" className="list-item" id="list-item-drive">Dirigir</Link>
            </li>
            <li>
              <Link to="/aboutpage" className="list-item" id="list-item-about">Sobre</Link>
            </li>
          </ul>
        </div>

        <div className="list" id="list-two">
          {user ? (
            <div className="user-dropdown">
              <span className="user-info" onClick={toggleDropdown}>
                <img
                  src={images.contact}
                  alt="Profile"
                  className="profile-pic"
                />
                {user.name || 'Usuário'} <i className="bx bx-chevron-down"></i>
              </span>

              {dropdownVisible && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate(`/teste/${user.id}`)}>Perfil</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-options">
              <ul className="list">
                <li>
                  <Link to="/help" className="list-item" id="list-item-help">Ajuda</Link>
                </li>
                <li>
                  <Link to="/sign-in" className="list-item">Login</Link>
                </li>
              </ul>
              <Link to="/sign-up">
                <button className="sign-up-btn">Cadastre-se</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default NavBar;
