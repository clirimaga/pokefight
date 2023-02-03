
import './App.css';
// import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import Header from './components/Header';
import Pokemons from './components/Pokemons';
import  { Pagination } from './components/Pagination';
import Pokemon from './components/Pokemon';
import SelectedPokemon from './components/SelectedPokemon';
import Fight from './components/Fight';
import {useState} from 'react';
function App() {
  const [pokemonsFrontPage, setPokemonsFrontPage] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [currentPage,setCurrentPage]=useState(1);
  const [postsPerPage,setPostsPerPage]=useState(809);

  const index = Math.floor(Math.random() * pokemonsFrontPage.length);
  const pokemon2 = pokemonsFrontPage.slice(index, index+1)
  console.log(pokemon2)
  

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
        <Route path="/pokemon/selectedpokemon/:name" element={<SelectedPokemon  pokemon2={pokemon2} pokemon={pokemon} setPokemon={setPokemon} />}   />
        <Route path="/pokemon/:id" element={<Pokemon pokemon={pokemon} setPokemon={setPokemon} />} />
        <Route path="/Fight/" element={<Fight  />} />
        
      </Routes>
      
    </div>
  );
}

export default App;
