import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Components/sidebar.jsx';
import './App.css';
import EnhancedWeatherForecast from './Components/Single.jsx';
import { Button } from './Components/ui/button.jsx';

function App() {
  return (
    <div className="demo">
      {/* <Sidebar></Sidebar> */}
      <EnhancedWeatherForecast></EnhancedWeatherForecast>
      {/* <button>count</button> */}
    </div>
  );
 
}

export default App;
