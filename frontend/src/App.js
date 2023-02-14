import "./App.css";
// import {useState,useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Pokemons from "./components/Pokemons";
import Pokemon from "./components/Pokemon";
import SelectedPokemon from "./components/SelectedPokemon";
import { useState } from "react";
import Footer from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
function App() {
  const [pokemonsFrontPage, setPokemonsFrontPage] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(809);

  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemonsFrontPage.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Pokemons
                pokemonsFrontPage={currentPosts}
                setPokemonsFrontPage={setPokemonsFrontPage}
              />
            </div>
          }
        ></Route>
        <Route
          path="/pokemon/selectedpokemon/:name"
          element={
            <SelectedPokemon pokemon={pokemon} setPokemon={setPokemon} />
          }
        />
        <Route
          path="/pokemon/:id"
          element={<Pokemon pokemon={pokemon} setPokemon={setPokemon} />}
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
