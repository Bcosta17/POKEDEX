const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonTypeAndName = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonSpeciesDetail = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`

  const pokeSpecies = fetch(speciesUrl)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody)

  const pokeDetail = fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody)

  return Promise.all([pokeSpecies, pokeDetail])
    .then(([speciesResult, detailResult]) => ({
      ...speciesResult,
      ...detailResult
    }));
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url) // fetch retorna um readableStream
    .then((response) => response.json()) // converte a resposta para JSON 
    .then((jsonBody) => jsonBody.results) // pegar a lista de pokemon
    .then((pokemons) => pokemons.map(pokeApi.getPokemonTypeAndName)) // criar a lista de pokemons com os detalhe
    .then((detailRequest) => Promise.all(detailRequest)) // esperar todas as requisições serem feitas 
    .then((pokemonsDetails) => pokemonsDetails)
}