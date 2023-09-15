import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailRestaurant.css';
import { Link } from 'react-router-dom';

export default function DetailRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoadLess, setShowLoadLess] = useState(false);
  const [visibleDataCount, setVisibleDataCount] = useState(3);

  useEffect(() => {
    axios
      .get(`https://restaurant-api.dicoding.dev/detail/${id}`)
      .then((response) => {
        setRestaurant(response.data.restaurant);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
      </div>
    );
  }

  if (!restaurant) {
    return <div>Data not found</div>;
  }

  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    return '★'.repeat(starCount);
  };

  const handleLoadMoreClick = () => {
    if (showLoadLess) {
      setVisibleDataCount(3);
      setShowLoadLess(false);
    } else {
      const newVisibleDataCount = visibleDataCount + 3;
      setVisibleDataCount(newVisibleDataCount);
      if (newVisibleDataCount >= restaurant.customerReviews.length) {
        setShowLoadLess(true);
      }
    }
  };

  return (
    <>
      <div className="body">
        <div className="detail-restaurant">
          <div className="image">
            <img src={`https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`} alt={restaurant.name} />
          </div>
          <div className="detail">
            <div className="title">
              <h1>{restaurant.name}</h1>
              <div className="link">
                <Link to="/">Back to Home</Link>
              </div>
            </div>
            <div className="category">
              {restaurant.categories.map((category, index) => (
                <span key={index}>
                  {category.name}
                  {index < restaurant.categories.length - 1 && ', '}
                </span>
              ))}
            </div>
            <div className="rate">
              <p>{renderStars(restaurant.rating)}</p>
            </div>
            <p>{restaurant.description}</p>
            <div className="map">
              {restaurant.city} - {restaurant.address}
            </div>
          </div>
        </div>
        <div className="menu">
          <h2>Menu</h2>
          <div className="food-drink">
            <div className="food">
              <h3>Food</h3>
              <ol start="1">
                {restaurant.menus.foods.slice(0, 5).map((food, index) => (
                  <li key={index}>{food.name}</li>
                ))}
              </ol>
            </div>
            <div className="drink">
              <h3>Drink</h3>
              <ol start="1">
                {restaurant.menus.drinks.slice(0, 5).map((drink, index) => (
                  <li key={index}>{drink.name}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-wp">
        <div className="customerReviews">
          <h2>Review</h2>
          {restaurant.customerReviews.slice(0, visibleDataCount).map((review, index) => (
            <div className="review" key={index}>
              <div className="review-header">
                <div className="text">
                  <h3>{review.name}  </h3>
                  <span>{review.date}</span>
                </div>
                <p>{review.review}</p>
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

    </>
  );
}
