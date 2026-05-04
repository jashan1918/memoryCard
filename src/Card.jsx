
function Card({pokemon, onClick}) {



    return(
        <>
        <div onClick={onClick} className="cursor-pointer bg-red-400 w-30">
            <img src = {pokemon.sprites.front_default} alt="" />
            <p>{pokemon.name}</p>
        </div>
        </>
    )
}

export default Card;