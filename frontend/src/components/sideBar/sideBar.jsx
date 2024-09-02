import React from 'react';
import { Link } from 'react-router-dom';
import "./sideBar.css";

const SideBar = () => {
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authTokenDriver");
        setUser(null);
        navigate("/");
        window.location.reload();
        sucessToast("Logout efetuado com sucesso");
      };
    return (
        <div className="sidebar-container">
            <nav className="sidebar">
                <Link to="/"><abbr title="Início"><i className='bx bx-home-alt-2'></i></abbr></Link>
                <Link to="/dashboard/driver"><abbr title="Corrida"><i className='bx bx-trip'></i></abbr></Link>
                <Link to="/history"><abbr title="Histórico"><i className='bx bx-time-five'></i></abbr></Link>
                <Link to="/help"><abbr title="Central de Atendimento"><i className='bx bx-user-voice'></i></abbr></Link>
                <Link to="/"><abbr onClick={handleLogout} title="Sair"><i className='bx bx-log-out'></i></abbr></Link>
                
            </nav>
        </div>
    );
}

export default SideBar;

