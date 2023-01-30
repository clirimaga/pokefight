
import './App.css';
// import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import Header from './components/Header';
import Pokemons from './components/Pokemons';
function App() {

  return (
    <div className="App">
      <Header />
      <Pokemons />
      <Routes>
        <Route path="/header" element={<div></div> } />
      </Routes>
    </div>
  );
}

export default App;
