const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);


buttonClear.addEventListener('click' , deletePokemons);


function insertPokemon() {
  window.fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    .then(response =>{
      if (response.status === 404) {
        alert("This pokemon is not available. Try with another one!");
      } else {
        return response.json();
      }
    })
    .then(responseJSON => {
      const allItems = [];

      const result = []; //*para guardar la respuesta en el array

      for (let pokemonInfo in responseJSON) { //*objeto JSON a array
        result.push([pokemonInfo , responseJSON[pokemonInfo]]);
      }

     
      //*Crear imagen
      const pokemonImage = document.createElement('img');
      pokemonImage.src = result[14][1].front_default; //*Imagen de  pokemon

      //*Nombre de pokemon e ID
      const pokemonName = document.createElement('h2');
      pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`; //* nombre o id de pokemon 

      //*Tipo de pokemon
      const pokemonType = document.createElement('h2');
      pokemonType.innerText = `Type: ${result[16][1][0].type.name}`; //tipo de pokemon

      //*Crear contenedor
      const container = document.createElement('div');
      container.append(pokemonImage , pokemonName ,pokemonType);
      container.classList.add('container');

      allItems.push(container);

      appNode.append(...allItems);
    });
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}