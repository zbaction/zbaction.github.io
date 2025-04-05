import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { to: '/', text: '首页', exact: true },
        { to: '/recommend', text: '书籍推荐' },
        { to: '/analysis', text: '数据分析' },
        { to: '/messages', text: '留言板' }
    ];

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="navigation">
            <div className="container nav-container">
                <div className="logo">
                    <NavLink to="/">书籍推荐系统</NavLink>
                </div>

                <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link, index) => (
                        <li key={index} className="nav-item">
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                end={link.exact}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation; 