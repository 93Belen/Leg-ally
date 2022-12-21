import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="container">
        <svg className="logo" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_27_47)">
<path d="M24.75 12.5C24.75 19.2655 19.2655 24.75 12.5 24.75C5.73453 24.75 0.250015 19.2655 0.250015 12.5C0.250015 5.73451 5.73453 0.25 12.5 0.25C19.2655 0.25 24.75 5.73451 24.75 12.5Z" fill="url(#paint0_linear_27_47)" stroke="#F8EEE2" stroke-width="0.5"/>
<path d="M3.26981 4.53201C2.33373 26.2739 24.9228 2.4136 20.4471 21.8062" stroke="#F8EEE2" stroke-width="0.5" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_i_27_47" x="1.52588e-05" y="0" width="25" height="29" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_27_47"/>
</filter>
<linearGradient id="paint0_linear_27_47" x1="5.75001" y1="22" x2="19.75" y2="3.25001" gradientUnits="userSpaceOnUse">
<stop stop-color="#B88378"/>
<stop offset="1" stop-color="#E6C0B8"/>
</linearGradient>
</defs>
</svg>

        <div className="title">
          <h1>Leg-ally</h1>
        </div>
        <div className="tab-container">
              <NavLink to="/" className={({ isActive }) =>
              isActive ? 'active-tab' : 'tab'
            } >
                Home
              </NavLink>
              <NavLink to="/states" className={({ isActive }) =>
              isActive ? 'active-tab' : 'tab'
            } >
                States
              </NavLink>
        </div>
    </div>
  );
}

export default Navbar
