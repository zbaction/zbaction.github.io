import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthForms.css';

const LoginForm = ({ onSuccess, onRegisterClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // 验证表单
        if (!email || !password) {
            setErrorMessage('请填写所有必填字段');
            return;
        }

        try {
            setIsLoading(true);
            // 调用登录方法
            const result = await login(email, password);

            if (result.success) {
                onSuccess();
            } else {
                setErrorMessage('邮箱或密码错误，请重试');
            }
        } catch (error) {
            setErrorMessage('登录失败，请稍后再试');
            console.error('登录失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>登录账号</h2>

            {errorMessage && (
                <div className="auth-error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">电子邮箱</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="请输入您的邮箱"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">密码</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入您的密码"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? '登录中...' : '登录'}
                </button>
            </form>

            <div className="auth-form-footer">
                <p>
                    还没有账号？
                    <button
                        onClick={onRegisterClick}
                        className="auth-text-button"
                        disabled={isLoading}
                    >
                        立即注册
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm; 