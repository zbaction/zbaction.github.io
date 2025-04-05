import React from 'react';
import './MessageList.css';

const MessageList = ({ messages = [] }) => {
    if (messages.length === 0) {
        return (
            <div className="message-list empty">
                <p className="empty-message">暂时没有留言，成为第一个留言的人吧！</p>
            </div>
        );
    }

    return (
        <div className="message-list">
            <h2 className="message-list-title">用户留言</h2>

            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <div className="message-header">
                            <div className="message-author">
                                <span className="author-name">{message.name}</span>
                                <span className="author-email">{message.email}</span>
                            </div>
                            <span className="message-date">{message.date}</span>
                        </div>

                        <div className="message-content">
                            <p>{message.message}</p>
                        </div>

                        {message.reply && (
                            <div className="message-reply">
                                <div className="reply-header">
                                    <span className="reply-title">管理员回复：</span>
                                    <span className="reply-date">{message.replyDate}</span>
                                </div>
                                <p className="reply-content">{message.reply}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {messages.length > 10 && (
                <div className="message-pagination">
                    <button className="pagination-btn">上一页</button>
                    <span className="pagination-info">1 / 3</span>
                    <button className="pagination-btn">下一页</button>
                </div>
            )}
        </div>
    );
};

export default MessageList; 