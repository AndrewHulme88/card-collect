import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'

const Navbar: React.FC = () => {
    return (
        <nav className='nav-bar'>
            <div className='navbar-left'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                        <Link to="/set/:setId">Card Sets</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
