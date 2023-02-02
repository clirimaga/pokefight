import {useState,useEffect} from 'react'
import axios from 'axios';
import './pokemon.css'
import { Link } from "react-router-dom";
import pokemonsJson from './pokemonsJson';

export default function Pokemons({pokemonsFrontPage, setPokemonsFrontPage,postsPerPage,totalPosts,paginate}) {
const [searchTerm,setSearchTerm] = useState('');
useEffect(()=>{
  axios
  .get('http://localhost:4001/pokemon')
  .then((res)=>{
    console.log(res.data)
    setPokemonsFrontPage(res.data)
  })
  .catch(err=> console.log(err))
},[])

// console.log(pokemonsJson);


  return (
<>
<div>
  <input type='text' placeholder='Search a pokemon' onChange={(e)=> setSearchTerm(e.target.value)} />
</div>
<div className="recipes">
  {pokemonsFrontPage.filter((pokemon) =>{
    if(searchTerm == ""){return pokemon}
    else if (pokemon.name.english.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
      return pokemon
    }
  })?.map((pokemon) => {
    return (
      <div>
      <div className="recipe" key={pokemon.id}>
{/*         <div className="imagediv">
          {pokemon.fields.recipeImages?.map((image) => {
            return (
              <img
                className="image margin-bottom1"
                src={image.fields?.file.url}
                key={image.sys.id}
              ></img>
            );
          })}
        </div> */}
        <div className="recipetitle text-with-shadow">
          {pokemon.id}
          {pokemon.name.english}
          {<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png' alt='pokemon image'/>}
        </div>

        <div className="rating lineheight margin-bottom-half">
            {pokemon.type}
        </div>
        <Link to={`/pokemon/${pokemon.id}`}>
                <button
                  type="button"
                  className="btn btn-secondary btn-m recipedetailbutton"
                  >
                  view details
                </button>
              </Link>
              <Link to={`/pokemon/selectedpokemon/${pokemon.name.english}`}>
                <button
                  type="button"
                  className="btn btn-secondary btn-m recipedetailbutton"
                  >
                  Select
                </button>
              </Link>
    </div>
    </div>
  );
})}
</div>
</>

)
}