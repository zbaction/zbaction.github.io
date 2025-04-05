import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ slides, interval = 5000, autoPlay = true }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // 自动轮播
    useEffect(() => {
        if (!autoPlay) return;

        const slideInterval = setInterval(() => {
            setCurrentSlide(current => (current + 1) % slides.length);
        }, interval);

        return () => clearInterval(slideInterval);
    }, [autoPlay, interval, slides.length]);

    // 手动切换到上一张
    const prevSlide = () => {
        setCurrentSlide(current => (current === 0 ? slides.length - 1 : current - 1));
    };

    // 手动切换到下一张
    const nextSlide = () => {
        setCurrentSlide(current => (current + 1) % slides.length);
    };

    // 手动切换到指定幻灯片
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="carousel">
            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                        style={{
                            backgroundImage: `url(${slide.image})`
                        }}
                    >
                        <div className="carousel-caption">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            {slide.button && (
                                <a href={slide.buttonLink} className="carousel-btn">
                                    {slide.button}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-control prev" onClick={prevSlide}>
                &lt;
            </button>
            <button className="carousel-control next" onClick={nextSlide}>
                &gt;
            </button>

            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel; 