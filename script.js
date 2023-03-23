// JS File that only applies to searching up the Pokemon
const pokeCard = document.querySelector('[pokeCard]');
const pokeName = document.querySelector('[pokeName]');
const pokeType = document.querySelector('[pokeType]');
const pokeContainer = document.querySelector('[pokeContainer]');
const pokeImg = document.querySelector('[pokeImg]');
const pokeID = document.querySelector('[pokeID]');
const pokeAbility = document.querySelector('[pokeAbility]');
const pokeHP = document.querySelector('[pokeHP]');
const pokeAttack = document.querySelector('[pokeAttack]');
const pokeSpecialAttack = document.querySelector('[pokeSpecialAttack]');
const pokeDef = document.querySelector('[pokeDef]');
const pokeSpecialDef = document.querySelector('[pokeSpecialDef]');
const pokeSpeed = document.querySelector('[pokeSpeed]');

const colors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  default: '#FFFFFF',
};

const search = event => {
  event.preventDefault();
  const {value} = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
  .then(data => data.json())
  .then(response => outPokemon(response))
  .catch(err => noPokemon())
}

const PokemonTypes = types => {
  pokeType.innerHTML = '';
  types.forEach(type => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = colors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeType.appendChild(typeTextElement);
  })
}

const cardColor = types => {
  const colorType = colors[types[0].type.name];
  pokeImg.style.background =  colorType;
  pokeImg.style.backgroundSize = '50px 50px';
}

const outPokemon = data => {
  console.log(data);
  const sprite = data.sprites.front_default;
  const {stats, types} = data;
  pokeName.textContent = data.name;
  PokemonTypes(types);
  pokeImg.setAttribute('src', sprite);
  pokeID.textContent = `ID Number: ${data.id}`;
  pokeAbility.textContent = `Abilities: ${data.abilities.map(ability => ability.ability.name).join(", ")}`;
  pokeHP.textContent = `Base HP: ${data.stats.find(stat => stat.stat.name === "hp").base_stat}`;
  pokeAttack.textContent = `Attack: ${data.stats.find(stat => stat.stat.name === "attack").base_stat}`;
  pokeSpecialAttack.textContent = `Special Attack: ${data.stats.find(stat => stat.stat.name === "special-attack").base_stat}`;
  pokeDef.textContent = `Defense: ${data.stats.find(stat => stat.stat.name === "defense").base_stat}`;
  pokeSpecialDef.textContent =  `Special Defense: ${data.stats.find(stat => stat.stat.name === "special-defense").base_stat}`;
  pokeSpeed.textContent = `Speed: ${data.stats.find(stat => stat.stat.name === "speed").base_stat}`;
  cardColor(types);
}

const noPokemon = () => {
  pokeName.textContent = 'Pokemon not found. Please check your spelling.';
  pokeImg.setAttribute('src', '');
}