import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./pokemon.css";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { MdLocalFireDepartment } from "react-icons/md";
import { MdGrass } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import { MdOutlineBugReport } from "react-icons/md";
import { GiElectric } from "react-icons/gi";

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Pokemons({
  pokemonsFrontPage,
  setPokemonsFrontPage,
  postsPerPage,
  totalPosts,
  paginate,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#8155ad");
const [searchTerm,setSearchTerm]= useState('');
  useEffect(() => {
    axios
      .get("https://fair-lime-mussel-tam.cyclic.app/pokemon")
      .then((res) => {
        AOS.init();
        // console.log(res.data);
        setPokemonsFrontPage(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
    <div className="d-flex mt-3 gap-3">
      <button
        onClick={() => navigate("/leaderboard")}
        className="btn btn-primary"
        >
        See Leaderboard
      </button>
      <input type='search' className="search"  placeholder="Search pokemon" onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>
      {loading ? (
        <ClipLoader
          className="cliploader"
          color={color}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="pokemonPage" >
          {pokemonsFrontPage.filter((val) => {
            if (searchTerm == '') {
              return val}
            else if (val.name.english.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map((pokemon) => {
            return (
              <div className="poke-card" key={pokemon.id} data-aos="zoom-in">
                <div className="pokeId">
                  #{pokemon.id}
                  <Link to={`/pokemon/${pokemon.id}`}>
                    <span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="black"
                        className="bi bi-info-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt="pokemon image"
                  />
                }
                <div className="pokeTitle">{pokemon.name.english}</div>

                <div className="poke-type">
                  {pokemon.type.includes("Fire") ? (
                    <MdLocalFireDepartment />
                  ) : (
                    ""
                  )}
                  {pokemon.type.includes("Grass") ? <MdGrass /> : ""}
                  {pokemon.type.includes("Poison") ? "Poison" : ""}
                  {pokemon.type.includes("Water") ? <MdWaterDrop /> : ""}
                  {pokemon.type.includes("Bug") ? <MdOutlineBugReport /> : ""}
                  {pokemon.type.includes("Normal") ? "Normal" : ""}
                  {pokemon.type.includes("Electric") ? <GiElectric /> : ""}
                  {pokemon.type.includes("Ground") ? "Ground" : ""}
                </div>
                <Link to={`/pokemon/selectedpokemon/${pokemon.name.english}`}>
                  <button className="btn btn-outline-primary">
                    Select to fight
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
