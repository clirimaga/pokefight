import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./pokemon.css";
import { TypeAnimation } from "react-type-animation";
export default function SelectedPokemon() {
  const [pokemon, setPokemon] = useState();
  const [pokemons, setPokemons] = useState([]);
  const [pokemonRandom, setPokemonRandom] = useState();
  const [winning, setWinning] = useState();
  const [loosing, setLoosing] = useState();
  const [gameOn, setGameOn] = useState(true);

  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(name);
    axios
      .get(`https://fair-lime-mussel-tam.cyclic.app/pokemon/selectedpokemon/${name}`)
      .then((res) => {
        res.data.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`;
        setPokemon(res.data);
      })
      .catch((err) => {
        console.error(`Error fetching pokemon data: ${err}`);
      });
  }, [name]);

  useEffect(() => {
    axios
      .get("https://fair-lime-mussel-tam.cyclic.app/pokemon")
      .then((res) => {
        const random = res.data[Math.floor(Math.random() * res.data.length)];
        random.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random.id}.png`;
        setPokemonRandom(random);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAttack = () => {
    const attackPokemon = pokemon.base.Attack;
    const defensePokemon = pokemon.base.Defense;
    const healthPokemon = pokemon.base.HP;

    const attackPokemonRandom = pokemonRandom.base.Attack;
    const defensePokemonRandom = pokemonRandom.base.Defense;
    const healthPokemonRandom = pokemonRandom.base.HP;

    const damagePokemon = attackPokemon; // Math.max()-Math.min
    const damagePokemonRandom = attackPokemonRandom;

    setPokemon({
      ...pokemon,
      base: { ...pokemon.base, HP: pokemon.base.HP - damagePokemonRandom / 10 },
    });
    setPokemonRandom({
      ...pokemonRandom,
      base: {
        ...pokemonRandom.base,
        HP: pokemonRandom.base.HP - damagePokemon / 10,
      },
    });
    if (pokemon.base.HP - damagePokemonRandom / 10 <= 0) {
      setWinning(pokemonRandom);
      updateLeaderboard(pokemonRandom);
      setLoosing(pokemon);
    }

    if (pokemonRandom.base.HP - damagePokemon / 10 <= 0) {
      setWinning(pokemon);
      setLoosing(pokemonRandom);
      updateLeaderboard(pokemon);
    }
    if (
      pokemon.base.HP - damagePokemonRandom / 10 <= 0 ||
      pokemonRandom.base.HP - damagePokemon / 10 <= 0
    ) {
      setGameOn(false);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const updateLeaderboard = (winning) => {
    axios
      .post("http://localhost:4001/leaderboard", winning)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="pokemonFightPage">
        <div className="fightingPokemon d-flex flex-col flex-wrap">
          <div className="fightingPokeCard">
            {pokemon ? (
              <div>
                <p>
                  <b>Your Pokemon</b>
                </p>
                <p>{pokemon.name.english}</p>
                <p>
                  Pokemon life:{" "}
                  {pokemon.base.HP.toFixed(0) > 0
                    ? pokemon.base.HP.toFixed(0)
                    : 0}
                </p>
                <div class="progress">
                  {pokemon.base.HP <= 0 ? (
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      aria-valuenow={pokemon.base.HP}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "0%" }}
                    ></div>
                  ) : (
                    <div
                      class="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      aria-valuenow={pokemon.base.HP}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${pokemon.base.HP}%` }}
                    ></div>
                  )}
                </div>
                <img
                  src={pokemon.url}
                  style={{ height: 200 }}
                  alt="pokemon user"
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="fightScore">
            <h5>Speed</h5>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                aria-valuenow={pokemon?.base?.Speed}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${pokemon?.base?.Speed}%` }}
              ></div>
            </div>
            <br />
            <h5>Attack</h5>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                aria-valuenow={pokemon?.base?.Attack}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${pokemon?.base?.Attack}%` }}
              ></div>
            </div>
            <br />
            <h5>Defense</h5>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped bg-success"
                role="progressbar"
                aria-valuenow={pokemon?.base?.Defense}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${pokemon?.base?.Defense}%` }}
              ></div>
            </div>
            <br />
          </div>

          <div className="fightScore">
            <h5>Speed</h5>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped bg-danger"
                role="progressbar"
                aria-valuenow={pokemonRandom?.base?.Speed}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${pokemonRandom?.base?.Speed}%` }}
              ></div>
            </div>
            <br />
            <h5>Attack</h5>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped bg-danger"
                role="progressbar"
                aria-valuenow={pokemonRandom?.base?.Attack}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${pokemonRandom?.base?.Attack}%` }}
              ></div>
            </div>
            <br />
            <h5>Defense</h5>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped bg-danger"
                role="progressbar"
                aria-valuenow={pokemonRandom?.base?.Defense}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${pokemonRandom?.base?.Defense}%` }}
              ></div>
            </div>
            <br />
          </div>

          <div className="fightingPokeCard">
            {pokemonRandom ? (
              <div>
                <p>
                  <b>Computer Pokemon</b>
                </p>
                <p>{pokemonRandom.name?.english}</p>
                <p>
                  Pokemon life:{" "}
                  {pokemonRandom.base.HP.toFixed(0) > 0
                    ? pokemonRandom.base.HP.toFixed(0)
                    : 0}
                </p>
                <div class="progress">
                  {pokemonRandom.base.HP <= 0 ? (
                    <div
                      class="progress-bar progress-bar-striped bg-danger"
                      role="progressbar"
                      aria-valuenow={pokemonRandom.base.HP}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "0%" }}
                    ></div>
                  ) : (
                    <div
                      class="progress-bar progress-bar-striped bg-danger"
                      role="progressbar"
                      aria-valuenow={pokemonRandom.base.HP}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: `${pokemonRandom.base.HP}%` }}
                    ></div>
                  )}
                </div>
                <img
                  src={pokemonRandom.url}
                  style={{ height: 200 }}
                  alt="pokemon random"
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="d-flex flex-row gap-3">
          <button
            onClick={handleAttack}
            className="btn btn-primary"
            disabled={!gameOn}
          >
            Fight
          </button>
          <button onClick={refreshPage} className="btn btn-primary">
            Play again
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="btn btn-primary"
          >
            See Leaderboard
          </button>
        </div>
        {loosing ? (
          <div className="winnerCard">
            <h4>
              The winner is:
              <TypeAnimation
                sequence={[
                  `   ${winning?.name.english} (English)`, // Types 'One'
                  1300, // Waits 1s
                  `   ${winning?.name.french} (French)`, // Deletes 'One' and types 'Two'
                  1300, // Waits 2s
                  `   ${winning?.name.japanese} (Japanese)`, // Types 'Three' without deleting 'Two'
                  1300,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                speed={40}
                style={{ fontSize: "3rem" }}
                className="winnerName"
              />{" "}
              🎉
            </h4>
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      <div>
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate(-1)}
        >
          Choose a different pokemon
        </button>
      </div>
    </>
  );
}
