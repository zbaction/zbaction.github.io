import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthForms.css';

const RegisterForm = ({ onSuccess, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // 表单验证
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('请填写所有必填字段');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('两次输入的密码不一致');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('密码长度至少为6个字符');
            return;
        }

        try {
            setIsLoading(true);
            // 调用注册方法
            const result = await register(name, email, password);

            if (result.success) {
                onSuccess();
            } else {
                setErrorMessage(result.message || '注册失败，请稍后再试');
            }
        } catch (error) {
            setErrorMessage('注册失败，请稍后再试');
            console.error('注册失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>创建新账号</h2>

            {errorMessage && (
                <div className="auth-error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="name">姓名</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="请输入您的姓名"
                        disabled={isLoading}
                    />
                </div>

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
                        placeholder="请设置密码（至少6个字符）"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">确认密码</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="请再次输入密码"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? '注册中...' : '注册'}
                </button>
            </form>

            <div className="auth-form-footer">
                <p>
                    已有账号？
                    <button
                        onClick={onLoginClick}
                        className="auth-text-button"
                        disabled={isLoading}
                    >
                        立即登录
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm; 