import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>书籍推荐系统</h3>
            <p>发现您感兴趣的好书，获取个性化推荐</p>
          </div>
          
          <div className="footer-section">
            <h3>快速链接</h3>
            <ul className="footer-links">
              <li><Link to="/">首页</Link></li>
              <li><Link to="/recommend">书籍推荐</Link></li>
              <li><Link to="/analysis">数据分析</Link></li>
              <li><Link to="/messages">留言板</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>联系我们</h3>
            <p>邮箱: contact@bookrec.com</p>
            <p>电话: 123-456-7890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} 书籍推荐系统. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 