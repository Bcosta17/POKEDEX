const params = new URLSearchParams(window.location.search);
const pokemonId = params.get('id');
const pokemonHeader = document.getElementById('contentDetail')

function loadDetail() {
  pokeApi.getPokemonSpeciesDetail(pokemonId).then((pokemon) =>{
    console.log(pokemon)
    const nameAndType = 
    `
    <div id="header" class="header">
    <div class="col">
      <h1>${pokemon.name}</h1>
      <div class="types">
          ${pokemon.types.map((item) =>
            `<p class="type ${item.type.name}">
                ${item.type.name}
             </p>`
            ).join('')}  
      </div>
      </div>
      <span class="number">
      ${pokemonId < 10 ? "#00" + pokemonId : 
        pokemonId < 100 ? "#0" + pokemonId : 
        "#" + pokemonId}
      </span>
      </div>
      </div>
    `

    const img = 
    `
    <img src="${pokemon.sprites.other.dream_world.front_default}"
      alt="${pokemon.name}">
    `

    const speciesEN = pokemon.genera[7].genus 
    const specie =  speciesEN.slice(0, speciesEN.lastIndexOf(" "))
    
    const tableInformation = `
      <div id="information" class="information">
      <nav>
        <a class="active">About</a>
        <a>Base Status</a>
        <a>Evolution</a>
        <a>Moves</a>
      </nav>
      <table class="infoTable">
        <tr class="rowTable">
          <td class="col-1">Species</td>
          <td class="col-2">${specie}</td>
        </tr>
        <tr class="rowTable">
          <td class="col-1">height</td>
          <td class="col-2">${pokemon.height*10} cm</td>
        </tr>
        <tr class="rowTable">
          <td class="col-1">Weigth</td>
          <td class="col-2">${pokemon.weight/10} kg</td>
        </tr>
        <tr class="rowTable">
          <td class="col-1">Abilities</td>
          <td class="col-2">
            ${pokemon.abilities.map(ability => ability.ability.name).join(", ")}
          </td>
        </tr>
      </table>
      <h2 class="breeeding">Breeding</h2>
      <table class="infoTable">
        <tr class="rowTable">
          <td class="col-1">Gender</td>
          <td class="col-2">
            <i class="fa fa-mars"></i>
            ${(8 - pokemon.gender_rate) * 12.5}%
          </td>
          <td class="col-2">
            <i class="fa fa-venus"></i>
            ${pokemon.gender_rate * 12.5}%
          </td>
        </tr>
        <tr class="rowTable">
          <td class="col-1">Egg Groups</td>
          <td class="col-2">
          ${pokemon.egg_groups.map(item => item.name).join(', ')}
          </td>
        </tr>
        <tr class="rowTable">
          <td class="col-1">Egg Cycle</td>
          <td 
          class="col-2" 
          style="${pokemon.evolves_from_species !== null ? 'text-align:center' : ''}" 
          >
            ${pokemon.evolves_from_species != null ? "-" :   255*pokemon.hatch_counter + 1 + " steps"} 
          </td>
        </tr>
      </table>
    `

    const type = pokemon.types[0].type.name
    const elemento = document.getElementById("contentDetail");
    elemento.classList.add(`${type}`);
    
    pokemonHeader.innerHTML += nameAndType + img + tableInformation
  })
}

loadDetail()