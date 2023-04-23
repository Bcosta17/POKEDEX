const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('LoadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons) =>{
    const newHtml = pokemons.map((pokemon) => 
    `
        <a href="./pokemon-detail.html?id=${pokemon.number}" class="name" data-pokemon-id="${pokemon.id}">
        <li class="pokemon ${pokemon.type}">
            <span class="number">
              ${pokemon.number < 10 ? "#00" + pokemon.number : 
                pokemon.number < 100 ? "#0" + pokemon.number : 
                "#" + pokemon.number}
            </span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                  ${pokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join('')}
              </ol>

              <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
      </li>
      </a>
    `).join('')

    pokemonList.innerHTML += newHtml


  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () =>{
  offset += limit
  
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
      const newLimit = maxRecords - offset
      loadPokemonItems(offset, newLimit)

      loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
      loadPokemonItems(offset, limit)
  }
})

