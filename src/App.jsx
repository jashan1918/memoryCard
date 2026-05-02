import axios from "axios";
import { useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);

  const getData = async () => {
    const response = await axios("https://pokeapi.co/api/v2/pokemon?limit=10");

    console.log(response.data.results);

    const results = response.data.results;

    const allData = await Promise.all(
      results.map(function (poke) {
        return axios(poke.url);
      }),
    );

    const pokemonData = allData.map((res) => res.data);

    setPokemon(pokemonData);
  };

  return (
    <>
      <div className="h-screen w-screen bg-purple-950 ">
        <div
          className="absolute top-0 left-0 w-full h-40 
                  bg-linear-to-b from-black to-transparent pointer-events-none"
        ></div>
        <button
          onClick={getData}
          className="bg-purple-500 text-white font-bold px-5 py-3 cursor-pointer relative z-10"
        >
          Get Data
        </button>
        {pokemon.map((elem, idx) => (
          <img key={idx} src={elem.sprites.front_default} />
        ))}
      </div>
    </>
  );
}

export default App;
