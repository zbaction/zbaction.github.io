import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import { FaUser, FaBookmark, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './UserProfileDropdown.css';

const UserProfileDropdown = () => {
    const { user, logout } = useAuth();
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 处理点击事件
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 如果没有用户登录，不显示此组件
    if (!user) return null;

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <div className="user-profile-dropdown" ref={dropdownRef}>
            <div className="profile-trigger" onClick={toggleDropdown}>
                <div className="avatar-circle">
                    {user.name && user.name.charAt(0).toUpperCase()}
                </div>
                <span className="username">{user.name}</span>
                <i className={`dropdown-arrow ${isOpen ? 'open' : ''}`}></i>
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <div className="user-info">
                            <span className="user-name">{user.name}</span>
                            <span className="user-email">{user.email}</span>
                        </div>
                    </div>

                    <div className="dropdown-content">
                        <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
                            <FaUser className="dropdown-icon" />
                            <span>{t('profile.userProfile')}</span>
                        </Link>
                        <Link to="/collections" className="dropdown-item" onClick={() => setIsOpen(false)}>
                            <FaBookmark className="dropdown-icon" />
                            <span>{t('profile.collections')}</span>
                        </Link>
                        <Link to="/reading-progress" className="dropdown-item" onClick={() => setIsOpen(false)}>
                            <FaBook className="dropdown-icon" />
                            <span>{t('profile.readingProgress')}</span>
                        </Link>
                        <Link to="/settings" className="dropdown-item" onClick={() => setIsOpen(false)}>
                            <FaCog className="dropdown-icon" />
                            <span>{t('profile.settings')}</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item logout-button" onClick={handleLogout}>
                            <FaSignOutAlt className="dropdown-icon" />
                            <span>{t('auth.logout')}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfileDropdown; 