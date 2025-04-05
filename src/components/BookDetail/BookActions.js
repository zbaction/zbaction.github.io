import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import './BookActions.css';

const BookActions = ({ book }) => {
    const { isBookCollected, toggleCollection, getBookProgress, updateReadingProgress } = useBook();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState('');
    const [showProgressForm, setShowProgressForm] = useState(false);
    const [message, setMessage] = useState('');

    // 获取当前书籍的收藏状态
    const isCollected = isBookCollected(book.id);

    // 获取阅读进度
    const progress = getBookProgress(book.id);

    // 处理收藏/取消收藏
    const handleCollectionToggle = () => {
        const result = toggleCollection(book.id);

        if (result.success) {
            setMessage(result.message);

            // 3秒后清除消息
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } else {
            setMessage('请先登录后再收藏书籍');

            // 3秒后清除消息
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    // 显示/隐藏阅读进度表单
    const toggleProgressForm = () => {
        if (!user) {
            setMessage('请先登录后再记录阅读进度');

            // 3秒后清除消息
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }

        setShowProgressForm(!showProgressForm);

        // 如果有阅读进度，预填充当前页码
        if (progress && !currentPage) {
            setCurrentPage(progress.currentPage);
        }
    };

    // 更新阅读进度
    const handleProgressUpdate = (e) => {
        e.preventDefault();

        if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
            setMessage('请输入有效的页码');
            return;
        }

        if (currentPage > book.pages) {
            setMessage(`页码不能超过总页数 ${book.pages}`);
            return;
        }

        const result = updateReadingProgress(book.id, parseInt(currentPage), book.pages);

        if (result.success) {
            setMessage('阅读进度已更新');
            setShowProgressForm(false);

            // 3秒后清除消息
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } else {
            setMessage(result.message || '更新进度失败');
        }
    };

    return (
        <div className="book-actions">
            {message && <div className="action-message">{message}</div>}

            <div className="action-buttons">
                <button
                    className={`collection-button ${isCollected ? 'collected' : ''}`}
                    onClick={handleCollectionToggle}
                >
                    <i className={`icon-heart ${isCollected ? 'filled' : ''}`}></i>
                    {isCollected ? '已收藏' : '收藏'}
                </button>

                <button className="progress-button" onClick={toggleProgressForm}>
                    <i className="icon-book-open"></i>
                    {progress ? `阅读进度 ${progress.progress}%` : '记录阅读进度'}
                </button>
            </div>

            {progress && !showProgressForm && (
                <div className="reading-progress">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress.progress}%` }}
                        ></div>
                    </div>
                    <p className="progress-text">
                        当前阅读至第 {progress.currentPage} 页 | 共 {book.pages} 页
                    </p>
                </div>
            )}

            {showProgressForm && (
                <div className="progress-form-container">
                    <form className="progress-form" onSubmit={handleProgressUpdate}>
                        <div className="form-group">
                            <label htmlFor="currentPage">您阅读到的页码:</label>
                            <input
                                type="number"
                                id="currentPage"
                                min="1"
                                max={book.pages}
                                value={currentPage}
                                onChange={(e) => setCurrentPage(e.target.value)}
                                placeholder={`1-${book.pages}`}
                            />
                            <span className="page-total">/ {book.pages} 页</span>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="save-progress-btn">
                                保存进度
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setShowProgressForm(false)}
                            >
                                取消
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BookActions; 