import axios from "axios";
import { useState } from "react";
import Card from "./Card";
import GameStart from "./GameStart";

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

  const startGame = async () => {
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

    // ✅ RESET STATE
    setScore(0);
    setClickedCards([]);

    setGameState("playing");
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
    // ❌ LOSE
    if (clickedCards.includes(name)) {
      setGameState("Lose");

      if (score > highScore) {
        setHighScore(score);
      }

      return;
    }

    // ✅ CALCULATE NEXT STATE
    const newScore = score + 1;
    const newClickedCards = [...clickedCards, name];

    setScore(newScore);
    setClickedCards(newClickedCards);

    // ✅ WIN
    if (newScore === pokemon.length) {
      setGameState("Win");
      setHighScore(10);
      return;
    }

    // 🔁 SHUFFLE
    setPokemon(shuffledArray(pokemon));
  };

  return (
    <>
      <div className="h-screen w-screen bg-purple-950 ">
        {gameState === "start" && (
          <>
            <GameStart startGame={startGame} />
          </>
        )}
        <div
          className="absolute top-0 left-0 w-full h-40 
                  bg-linear-to-b from-black to-transparent pointer-events-none"
        ></div>

        {gameState === "playing" && (
          <>
            <div className="flex items-center pt-20 flex-col">
              <h1 className="text-white text-2xl font-bold">Score:- {score}</h1>
              <h1 className="text-white text-2xl font-bold">
                HighScore {highScore}
              </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {pokemon.map((elem) => (
                <Card
                  key={elem.name}
                  pokemon={elem}
                  onClick={() => handleClick(elem.name)}
                />
              ))}
            </div>
          </>
        )}

        {gameState === "Lose" && (
          <div className="flex items-center justify-center h-screen bg-purple-950">
            <div className="bg-linear-to-b from-purple-600 to-purple-800 p-8 rounded-2xl shadow-2xl text-center w-80">
              <h1 className="text-white text-3xl font-bold mb-4">
                You Lost 😔
              </h1>

              <p className="text-white text-lg mb-2">
                Your Score: <span className="font-semibold">{score}</span>
              </p>

              <p className="text-white text-lg mb-6">
                High Score: <span className="font-semibold">{highScore}</span>
              </p>

              <button
                onClick={startGame}
                className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                Restart Game
              </button>
            </div>
          </div>
        )}

        {gameState === "Win" && (
          <div className="flex items-center justify-center h-screen bg-purple-950">
            <div className="bg-linear-to-b from-purple-600 to-purple-800 p-8 rounded-2xl shadow-2xl text-center w-80">
              <h1 className="text-white text-3xl font-bold mb-4">You Won 🎉</h1>

              <p className="text-white text-lg mb-2">
                Your Score: <span className="font-semibold">{score}</span>
              </p>

              <p className="text-white text-lg mb-6">
                High Score: <span className="font-semibold">{highScore}</span>
              </p>

              <button
                onClick={startGame}
                className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-xl hover:bg-gray-200 transition"
              >
                Restart Game
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
