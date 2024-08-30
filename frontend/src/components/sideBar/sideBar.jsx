import React from 'react';
import { Link } from 'react-router-dom';
import "./sideBar.css";

const SideBar = () => {
    return (
        <div className="sidebar-container">
            <nav className="sidebar">
                <Link to="/"><abbr title="Início"><i className='bx bx-home-alt-2'></i></abbr></Link>
                <Link to="/trip"><abbr title="Corrida"><i className='bx bx-trip'></i></abbr></Link>
                <Link to="/history"><abbr title="Histórico"><i className='bx bx-time-five'></i></abbr></Link>
                <Link to="/help"><abbr title="Central de Atendimento"><i className='bx bx-user-voice'></i></abbr></Link>
                <Link to="/exit"><abbr title="Sair"><i className='bx bx-log-out'></i></abbr></Link>
                <Link to="/historyPassenger"><abbr title="Histórico"><i className='bx bx-time-five'></i></abbr></Link>
            
            </nav>
        </div>
    );
}

export default SideBar;

