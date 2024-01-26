import React, { useEffect, useState } from "react";
import Error from "./Error";
import Card from "./Card";
import Loader from "./Loader";

function Cards(props) {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);
  const [displayNumber, setDisplayNumber] = useState(40);
  const [text, setText] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  function handleChange(e) {
    setDisplayNumber(parseInt(e.target.value));
  }

  function handleChangeText(e) {
    setText(e.target.value);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    setSelectedType(props.CardSelected);
    fetchPokemon();
  }, [props.CardSelected, displayNumber, fetchPokemon]);

  const fetchPokemon = async () => {
    try {
      const promises = [];
      for (let i = 1; i <= displayNumber; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
      }
      const results = await Promise.all(promises);

      const pokemon = results.map((result) => {
        let primaryType = result.types[0].type.name;
        if (result.types.length >= 2) {
          const validTypes = [
            "water",
            "fire",
            "flying",
            "dragon",
            "psychic",
            "grass",
            "electric",
            "poison",
            "normal",
          ];
          primaryType =
            result.types.find((type) => validTypes.includes(type.type.name))
              ?.type.name || result.types[1].type.name;
        }
        return {
          name: result.name,
          image: result.sprites["front_default"],
          type: primaryType,
          id: result.id,
          ability: result.abilities
            .map((ability) => ability.ability.name)
            .join(", "),
        };
      });
      setPokemonList(pokemon);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <Error />;
  }

  let filteredPokemonList = pokemonList;

  if (selectedType !== "All") {
    filteredPokemonList = pokemonList.filter(
      (pokemon) => capitalizeFirstLetter(pokemon.type) === selectedType
    );
  }

  let filteredPokemontext = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(text.toLowerCase())
  );

  const renderFilteredPokemon = (pokemonArray) => {
    return pokemonArray.map((pokemon) => (
      <Card
        key={pokemon.id}
        name={capitalizeFirstLetter(pokemon.name)}
        img={pokemon.image}
        type={capitalizeFirstLetter(pokemon.type)}
        ability={pokemon.ability}
      />
    ));
  };

  return (
    <div>
      {selectedType === "All" && (
        <div>
          <h4 style={{ textAlign: "center", margin: "1rem", color: "white" }}>
            Input Number of Pokemons You want to Display (1 - 500)
          </h4>
          <div className="input-container">
            <input
              type="number"
              value={displayNumber}
              min={1}
              max={500}
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              value={text}
              placeholder="Search Pokemon..."
              onChange={handleChangeText}
            />
          </div>
        </div>
      )}
      {/* Display filteredPokemonList */}
      <div className="row row-cols-3 justify-content-center align-items-center cards">
        {selectedType === "All" ? (
          filteredPokemonList.length === 0 ? (
            <Loader />
          ) : text === "" ? (
            renderFilteredPokemon(filteredPokemonList)
          ) : (
            renderFilteredPokemon(filteredPokemontext)
          )
        ) : filteredPokemonList.length === 0 ? (
          <div className="no-pokemon">
            <h1>
              No Pokemon of the selected type were found, Try Increasing number
              of Pokemons
            </h1>
          </div>
        ) : (
          renderFilteredPokemon(filteredPokemonList)
        )}
      </div>
    </div>
  );
}

export default Cards;
