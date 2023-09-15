import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardRestaurant from '../components/CardRestaurant';
import './Restaurant.css';

const Restaurants = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get('https://restaurant-api.dicoding.dev/list')
      .then((response) => {
        // Menyaring lokasi unik dari data restoran
        const uniqueLocations = Array.from(
          new Set(response.data.restaurants.map((restaurant) => restaurant.city))
        );
        setLocations(uniqueLocations);
        // Mengambil data semua restoran
        setRestaurants(response.data.restaurants);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredRestaurants = selectedLocation
    ? restaurants.filter((restaurant) => restaurant.city === selectedLocation)
    : restaurants;

  return (
    <>
      <div className="title">
        <h1>Restaurants</h1>
        <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </p>
      </div>
      <div className="filter">
        <p>Filter By: </p>
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="list">
        <h2>All Restaurants</h2>
      </div>
      <div className="card-main">
        <CardRestaurant filteredRestaurants={filteredRestaurants} />
      </div>
    </>
  );
};

export default Restaurants;
