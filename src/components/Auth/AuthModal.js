import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthForms.css';

const AuthModal = ({ initialView = 'login', onClose }) => {
    const [currentView, setCurrentView] = useState(initialView);

    useEffect(() => {
        // 阻止背景滚动
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSuccessfulAuth = () => {
        onClose();
    };

    const switchToLogin = () => {
        setCurrentView('login');
    };

    const switchToRegister = () => {
        setCurrentView('register');
    };

    const handleBackdropClick = (e) => {
        // 只有点击背景时才关闭，点击内容区域不关闭
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="auth-modal-overlay" onClick={handleBackdropClick}>
            <div className="auth-modal">
                <button className="auth-modal-close" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="auth-modal-header">
                    <h2>{currentView === 'login' ? '登录' : '注册'}</h2>
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${currentView === 'login' ? 'active' : ''}`}
                            onClick={switchToLogin}
                        >
                            登录
                        </button>
                        <button
                            className={`auth-tab ${currentView === 'register' ? 'active' : ''}`}
                            onClick={switchToRegister}
                        >
                            注册
                        </button>
                    </div>
                </div>

                <div className="auth-modal-content">
                    {currentView === 'login' ? (
                        <LoginForm
                            onSuccess={handleSuccessfulAuth}
                            onRegisterClick={switchToRegister}
                        />
                    ) : (
                        <RegisterForm
                            onSuccess={handleSuccessfulAuth}
                            onLoginClick={switchToLogin}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal; 