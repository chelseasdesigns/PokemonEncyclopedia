// JS File that displays all of the Pokemon and their names

const spriteContainer = document.createElement('div');
spriteContainer.classList.add('allpoke-container');

const types = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];

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

for (let i = 1; i <= 898; i++) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then(response => response.json())
    .then(data => {
      const pokemonContainer = document.createElement('div');
      pokemonContainer.style.display = 'flex';
      pokemonContainer.style.flexDirection = 'column';
      pokemonContainer.style.alignItems = 'center';
      pokemonContainer.style.margin = '3%';

      const pokeName = document.createElement('p');
      pokeName.textContent = data.name;

      const spriteUrl = data.sprites.front_default;
      const spriteImg = document.createElement('img');

      const cardColor = pokemonTypes => {
        const colorType = colors[pokemonTypes[0]];
        spriteImg.style.background = colorType;
        spriteImg.style.backgroundSize = '200px 120px';
        spriteImg.style.borderRadius = '10%';
      }

      spriteImg.src = spriteUrl;
      pokemonContainer.appendChild(pokeName);
      pokemonContainer.appendChild(spriteImg);

      cardColor(data.types.map(type => type.type.name));
      spriteContainer.appendChild(pokemonContainer);
    });
}

spriteContainer.style.display = 'flex';
spriteContainer.style.flexWrap = 'wrap';
document.body.appendChild(spriteContainer);
