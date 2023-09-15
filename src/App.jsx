import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/CardRestaurant.jsx'
import CardRestaurant from './components/CardRestaurant.jsx'
import Restaurants from './pages/Restaurant'
import DetailRestaurant from './pages/DetailRestaurant';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<DetailRestaurant />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
