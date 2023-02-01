
import './App.css';
// import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import Header from './components/Header';
import Pokemons from './components/Pokemons';
import  { Pagination } from './components/Pagination';
import Pokemon from './components/Pokemon';

import {useState} from 'react';
function App() {
  const [pokemonsFrontPage, setPokemonsFrontPage] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage,setPostsPerPage]=useState(40);


   //get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = pokemonsFrontPage.slice(indexOfFirstPost,indexOfLastPost)
 // change page
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<div><Pokemons pokemonsFrontPage={currentPosts} setPokemonsFrontPage={setPokemonsFrontPage} />
   <Pagination postsPerPage={postsPerPage} totalPosts={pokemonsFrontPage.length} paginate={paginate} />
        </div> }></Route> 
        <Route path="/pokemon/:id" element={<Pokemon pokemon={pokemon} setPokemon={setPokemon} />} />
      </Routes>
    </div>
  );
}

export default App;
