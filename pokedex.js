const pokemonCount = 151;
var pokedex = {}; // {1 : {"name" : bulbasaur, "img" : url, "type" : ["grass", "poison"], "desc" : "...." }}

window.onload = async function(){
    //getPokemon(1);

    for (let i = 1; i <= pokemonCount; i++){
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        document.getElementById("pokemon-list").append(pokemon);
    }

    console.log(pokedex);
}

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();
   
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"]

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types": pokemonType, "desc" : pokemonDesc}
}