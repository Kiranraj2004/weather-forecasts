import React,{useState} from 'react'
import { assets } from '../assets/assets.js'
import './sidebar.css'
function Sidebar() {
  return (
  
    <div className='sidebar'>
      <div className='topsidebar'>
        <div className='searchbar'>
          <img src={assets.searchbar} alt='' ></img>
          <input placeholder='Search for places...' ></input>

        </div>
      <img  className="mainimage" src={assets.cloude}></img>
      <p className='temp'> 12<sup>o C</sup></p>
      <p className='date'>Monday<span>16:00</span></p>
      
      </div> 

      <div className='bottomsidebar'>
        <img src={assets.situation} alt="" />
        <p>Mostly cloudy</p>
        <img src="https://cdn-icons-png.flaticon.com/128/6744/6744989.png" alt="" />
        <p> Rain -30%</p>
      </div>
    </div>
  );
}

export default Sidebar
