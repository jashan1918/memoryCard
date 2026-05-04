import axios from "axios";
import { useState } from "react";
import Card from "./Card";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [gameState, setGameState] = useState("start"); //start playing win lose

  /* when card is clicked
    check if its alrady clicked? YES -> Lose 
    ELSE :- 
    increase score
    store card
    check win
    shuffle
    
    */

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

  function shuffledArray(array) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));

      [newArray[i], newArray[random]] = [newArray[random], newArray[i]];
    }

    return newArray;
  }

  const handleClick = (name) => {
    if (clickedCards.includes(name)) {
      // ❌ LOSE
      setGameState("Lose");

      if (score > highScore) {
        setHighScore(score);
      }

      if (clickedCards.includes(name)) {
        setGameState("Lose");

        if (score > highScore) {
          setHighScore(score);
        }

        return;
      }
      return;
    }

    // ✅ CORRECT CLICK
    setScore((prev) => {
      const updated = prev + 1;

      if (updated === pokemon.length) {
        setGameState("Win");
      }

      return updated;
    });
    setClickedCards((prev) => [...prev, name]);

    // ✅ WIN CHECK
    if (score === pokemon.length) {
      setGameState("Win");
      return;
    }

    // 🔁 SHUFFLE
    setPokemon(shuffledArray(pokemon));
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

        {gameState === "Lose" && <h1 className="text-white text-2xl font-bold">You Lost</h1>}
        {gameState === "Win" && <h1 className="text-white text-2xl font-bold">You Won</h1>}

        <h1 className="text-white text-2xl font-bold">Score:- {score}</h1>
        <h1 className="text-white text-2xl font-bold">HighScore {highScore}</h1>

        {pokemon.map((elem, idx) => (
          // <img key={idx} src={elem.sprites.front_default} />
          <Card
            key={elem.name}
            pokemon={elem}
            onClick={() => handleClick(elem.name)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
