import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useI18n } from '../../context/I18nContext';
import UserProfileDropdown from '../Auth/UserProfileDropdown';
import AuthModal from '../Auth/AuthModal';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const { user, isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { t } = useI18n();
    const location = useLocation();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalView, setAuthModalView] = useState('login');
    const [profileOpen, setProfileOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    // 点击外部关闭个人资料下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 打开登录模态框
    const handleLogin = () => {
        setAuthModalView('login');
        setShowAuthModal(true);
    };

    // 打开注册模态框
    const handleRegister = () => {
        setAuthModalView('register');
        setShowAuthModal(true);
    };

    // 切换主题
    const toggleThemeMode = () => {
        toggleTheme(theme === 'light' ? 'dark' : 'light');
    };

    // 切换个人资料下拉菜单
    const toggleProfileDropdown = () => {
        setProfileOpen(!profileOpen);
    };

    // 检查链接是否激活
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <NavLink to="/">
                        <h1>{t('app.name')}</h1>
                    </NavLink>
                </div>

                <nav className="nav-links">
                    <NavLink to="/" className={isActive('/') ? 'active' : ''}>
                        {t('nav.home')}
                    </NavLink>
                    <NavLink
                        to="/recommendation"
                        className={isActive('/recommendation') ? 'active' : ''}
                    >
                        {t('nav.recommendation')}
                    </NavLink>
                    <NavLink
                        to="/analysis"
                        className={isActive('/analysis') ? 'active' : ''}
                    >
                        {t('nav.analysis')}
                    </NavLink>
                    <NavLink
                        to="/message"
                        className={isActive('/message') ? 'active' : ''}
                    >
                        {t('nav.messageBoard')}
                    </NavLink>
                </nav>

                <div className="auth-container">
                    <button
                        className="theme-toggle-btn"
                        onClick={toggleThemeMode}
                        title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>

                    {isAuthenticated ? (
                        <UserProfileDropdown />
                    ) : (
                        <div className="auth-buttons">
                            <button className="login-btn" onClick={handleLogin}>
                                登录
                            </button>
                            <button className="register-btn" onClick={handleRegister}>
                                注册
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showAuthModal && (
                <AuthModal
                    initialView={authModalView}
                    onClose={() => setShowAuthModal(false)}
                />
            )}
        </header>
    );
};

export default Header; 