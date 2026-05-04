function Card({ pokemon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        bg-linear-to-b from-purple-600 to-purple-800
        rounded-2xl
        p-4
        w-80
        h-85
        shadow-lg
        cursor-pointer
        gap-5
        transform transition duration-300
        hover:scale-105 hover:shadow-2xl
      "
    >
      <div className="bg-white rounded-xl p-2 flex justify-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-50 h-50 object-cover"
        />
      </div>

      <p className="text-white text-xl text-center mt-3 font-semibold capitalize">
        {pokemon.name}
      </p>
    </div>
  );
}

export default Card;