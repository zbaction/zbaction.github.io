import React, { useState } from 'react';
import './MessageForm.css';

const MessageForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // 实时验证
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = '请输入您的姓名';
        }

        if (!formData.email.trim()) {
            newErrors.email = '请输入您的电子邮箱';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = '请输入有效的电子邮箱地址';
        }

        if (!formData.message.trim()) {
            newErrors.message = '请输入留言内容';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (onSubmit) {
                onSubmit(formData);
            }

            // 重置表单
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            setSubmitSuccess(true);

            // 5秒后隐藏成功消息
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('提交失败:', error);
            setErrors({ submit: '提交失败，请稍后再试' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="message-form-container">
            <h2 className="form-title">留下您的留言</h2>

            {submitSuccess && (
                <div className="success-message">
                    感谢您的留言！我们会尽快回复您。
                </div>
            )}

            {errors.submit && (
                <div className="error-message">
                    {errors.submit}
                </div>
            )}

            <form className="message-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">姓名</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="请输入您的姓名"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">电子邮箱</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="请输入您的电子邮箱"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="message">留言内容</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="请输入您的留言内容"
                        rows="5"
                    ></textarea>
                    {errors.message && <span className="error">{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '提交中...' : '提交留言'}
                </button>
            </form>
        </div>
    );
};

export default MessageForm; 