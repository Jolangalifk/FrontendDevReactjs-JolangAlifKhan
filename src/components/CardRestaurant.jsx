import React, { useState } from 'react';
import './CardRestaurant.css';
import { Link } from 'react-router-dom';

const CardRestaurant = ({ filteredRestaurants }) => {
    const [visibleDataCount, setVisibleDataCount] = useState(10);
    const [showLoadLess, setShowLoadLess] = useState(false);

    const handleLoadMoreClick = () => {
        if (showLoadLess) {
            setVisibleDataCount(10);
            setShowLoadLess(false);
        } else {
            setVisibleDataCount((prevCount) => prevCount + 10);
            if (visibleDataCount + 10 >= filteredRestaurants.length) {
                setShowLoadLess(true);
            }
        }
    };

    return (
        <div>
            <div className="grid">
                {filteredRestaurants.slice(0, visibleDataCount).map((restaurant) => (
                    <div className="card" key={restaurant.id}>
                        <div className="image">
                            <img src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`} alt={restaurant.name} />
                        </div>
                        <div className="card-body">
                            <h1>{restaurant.name}</h1>
                            <div className="rate">
                                {/* Render bintang berdasarkan rating */}
                                <p>{renderStars(restaurant.rating)}</p>
                            </div>
                            <div className="price-status">
                                <p>{restaurant.name}</p>
                                <p>{restaurant.city}</p>
                            </div>
                        </div>
                        <div className="learn-more">
                            <Link to={`/restaurant/${restaurant.id}`}>Learn More</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="load-more-wp">
                <div className="load-more">
                    <button onClick={handleLoadMoreClick}>
                        {showLoadLess ? 'Load Less' : 'Load More'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const renderStars = (rating) => {
    const starCount = Math.round(rating);
    return '★'.repeat(starCount);
};

export default CardRestaurant;
