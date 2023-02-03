import {useState} from "react";


export default function Searchbar ({setPokemons, setAllPokemonBtn}) {

    const [searchValue, setSearchValue] = useState("");


    //call the Contentful-client to fetch the data
        const contentful = require("contentful");
            const client = contentful.createClient({
            space: "3nafpp0jo6h4",
            environment: "master", // defaults to 'master' if not set
            accessToken: "hsNzkIL8Lrero_6ljmPQHYT7gn9_0sho0Akw6R7tQ_s",
        });

    // getSearchResults with click on Search
     const getSearchResults = () => {
            // fetch for search
            client.getEntries({
                'content_type':"ourCookbook",
                'query': searchValue
                })
            .then((response) => {
                setRecipes(response.items);
                setAllRecipesBtn(false)
                })
            .catch(console.error)
            .finally(() => {
                setSearchValue('');
            })
     }

      const getSearchValue = (e) => {
        setSearchValue(e.target.value)
      }

      const searchWithEnter = (e) => {
        if (e.key === 'Enter'){
            getSearchResults()
        };
      }



return(

        <div className="searchfield">
            <input aria-label="Search" className="searchinput" type="text" value={searchValue} placeholder="recipe, ingredient, ..." onChange={getSearchValue} onKeyDown={searchWithEnter}></input>
            <button className="searchbutton btn btn-secondary" onClick={getSearchResults}>Search</button>
        </div>
)
}