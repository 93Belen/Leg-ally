import {Showcase} from './components/showcase/Showcase.js';
import { appStyle } from './AppStyle.js';
import { Form } from './components/form/Form.jsx';
import { Map } from './components/map/Map.js';
import Navbar from './components/navbar/Navbar.jsx';
import { Routes, Route } from "react-router-dom";
import React from 'react';



function App() {
  return (
      <div style={appStyle} className="App">
        <Navbar />
        <Form />
            <Routes>
              <Route path='/' element={
              <Showcase />
              }></Route>
              <Route path='/states' element={
              <Map />
              }></Route>
            </Routes>
      </div>
  );
}

export default App;
