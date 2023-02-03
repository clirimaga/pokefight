import {useState} from 'react'

function Fight() {
    const [pokemon1, setPokemon1] = useState({
        name: 'Pikachu',
        health: 100,
        attack: 15,
        defense: 18,
        url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/136.png'

      });
      const [pokemon2, setPokemon2] = useState({
        name: 'bulbasaur',
        health: 100,
        attack: 20,
        defense: 10,
        url:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/168.png'
      });
    
      const handleAttack1 = () => {
        const attackPokemon1 = pokemon1.attack;
        const defensePokemon2 = pokemon2.defense;
        const healthPokemon2 = pokemon2.health;

        const damage = attackPokemon1 - defensePokemon2;
        
        setPokemon2((prevState) => ({
            ...prevState,
            health: prevState.health - damage
          }));
      }

      const handleAttack2 = () => {
        const attackPokemon2 = pokemon2.attack;
        const defensePokemon1 = pokemon1.defense;
        const healthPokemon1 = pokemon1.health;

        const damage = attackPokemon2 - defensePokemon1;
        
        setPokemon1((prevState) => ({
            ...prevState,
            health: prevState.health - damage
          }));
      }

    return (<div>
        <div className="row">
            <div className="col-md-2 offset-md-3">
                <img src={pokemon1.url} style={{ opacity: pokemon1.health / 100 }}/>
                <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon1.health} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon1.health}%`}}></div>
</div>
{pokemon1.health > 0 ? (
<button onClick={handleAttack1}>Fight!</button>
) : (
    <div>
    <iframe src="https://giphy.com/embed/Y3qaJQjDcbJPyK7kGk" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/DaveandBusters-winner-you-win-dave-and-busters-Y3qaJQjDcbJPyK7kGk">via GIPHY</a></p>
    </div>
)
}
            </div>
            <div className="col-md-2 offset-md-2"><img src={pokemon2.url} style={{ opacity: pokemon2.health / 100 }}/>
            <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={pokemon2.health} aria-valuemin="0" aria-valuemax="100" style={{width: `${pokemon2.health}%`}}></div>
</div>
<button onClick={handleAttack2}>Fight!</button>
            </div>

        </div>
            </div>)
}


export default Fight;