function GameStart({startGame}) {
  console.log("game has started");
  return (
    <>
    <div className="h-screen w-screen flex justify-center items-center flex-col" >

       
        

      <button onClick={startGame} className="bg-purple-500 text-white font-bold px-5 py-3 cursor-pointer relative z-10">
        Start Game
      </button>

    
      </div>
    </>
  );
}

export default GameStart;
