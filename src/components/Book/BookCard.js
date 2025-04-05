import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
    const { id, title, author, cover, category } = book;

    return (
        <div className="book-card">
            <Link to={`/books/${id}`} className="book-link">
                <div className="book-cover">
                    <img src={cover} alt={title} />
                    <div className="book-category">{category}</div>
                </div>

                <div className="book-info">
                    <h3 className="book-title">{title}</h3>
                    <p className="book-author">{author}</p>
                </div>
            </Link>
        </div>
    );
};

export default BookCard; 