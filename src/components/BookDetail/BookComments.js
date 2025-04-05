import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { useAuth } from '../../context/AuthContext';
import './BookComments.css';

const BookComments = ({ bookId }) => {
    const { addComment, getBookComments, toggleCommentLike, deleteComment } = useBook();
    const { user } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // 获取当前书籍的评论
    const comments = getBookComments(bookId);

    // 处理评论提交
    const handleSubmitComment = (e) => {
        e.preventDefault();

        if (!user) {
            setError('请先登录后再评论');
            return;
        }

        if (!newComment.trim()) {
            setError('评论内容不能为空');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const result = addComment(bookId, newComment, rating);

            if (result.success) {
                setNewComment('');
                setRating(5);
                setSuccess('评论已发布');

                // 3秒后清除成功消息
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
            } else {
                setError(result.message || '评论发布失败');
            }
        } catch (err) {
            setError('评论发布时出错');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    // 处理评论点赞
    const handleLikeComment = (commentId) => {
        if (!user) {
            setError('请先登录后再点赞');
            return;
        }

        toggleCommentLike(bookId, commentId);
    };

    // 处理删除评论
    const handleDeleteComment = (commentId) => {
        if (!user) {
            setError('请先登录');
            return;
        }

        const result = deleteComment(bookId, commentId);

        if (!result.success) {
            setError(result.message || '删除评论失败');
        }
    };

    return (
        <div className="book-comments-section">
            <h3 className="comments-title">读者评论</h3>

            {/* 评论表单 */}
            <div className="comment-form-container">
                <h4>发表您的评论</h4>

                {error && <div className="comment-error">{error}</div>}
                {success && <div className="comment-success">{success}</div>}

                <form className="comment-form" onSubmit={handleSubmitComment}>
                    <div className="rating-input">
                        <label>您的评分:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= rating ? 'filled' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="comment-input">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="请分享您对这本书的看法..."
                            rows={4}
                            disabled={submitting || !user}
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-comment-btn"
                        disabled={submitting || !user}
                    >
                        {submitting ? '发布中...' : '发表评论'}
                    </button>

                    {!user && (
                        <p className="login-prompt">请先登录后发表评论</p>
                    )}
                </form>
            </div>

            {/* 评论列表 */}
            <div className="comments-list">
                {comments.length === 0 ? (
                    <p className="no-comments">暂无评论，快来发表第一条评论吧！</p>
                ) : (
                    <>
                        <p className="comments-count">{comments.length} 条评论</p>

                        {comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-header">
                                    <div className="comment-user">
                                        <div className="user-avatar">
                                            {comment.userName.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="user-name">{comment.userName}</span>
                                    </div>
                                    <div className="comment-rating">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span
                                                key={index}
                                                className={`star ${index < comment.rating ? 'filled' : ''}`}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="comment-content">
                                    {comment.content}
                                </div>

                                <div className="comment-footer">
                                    <span className="comment-date">
                                        {new Date(comment.createdAt).toLocaleDateString('zh-CN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>

                                    <div className="comment-actions">
                                        <button
                                            className={`like-button ${comment.userLiked ? 'liked' : ''}`}
                                            onClick={() => handleLikeComment(comment.id)}
                                        >
                                            <i className="icon-like"></i>
                                            <span>{comment.likes}</span>
                                        </button>

                                        {user && user.id === comment.userId && (
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteComment(comment.id)}
                                            >
                                                <i className="icon-delete"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookComments; 