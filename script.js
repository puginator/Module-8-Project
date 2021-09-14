const poke_container = document.getElementById("poke_container");
const random_btn = document.getElementById("random-btn");
const sortBtn = document.getElementById("sort-btn");
const active = 'active';
const filterButtons = document.querySelectorAll('li');
const dataFilter = '[data-filter]';
const pokemonData = '[data-item]';
const pokemonName = '[data-name]';

const pokemonArray = []

let pokemons_number;
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#93B5C6',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#f5f5f5',
  ice: '#DEF3FD',
  ghost: '#BFA2DB',
  steel: '#9D9D9D'
};

const main_types = Object.keys(colors);
// console.log(main_types)

const fetchPokemons = async () => {
  await getPokemon(pokemons_number)
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};



function createPokemonCard(pokemon) {


  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map(el => el.type.name);
  const type = poke_types.find(type => poke_types.indexOf(type) > -1)
  const ability = pokemon.abilities[0].ability.name
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
  <div id="heart-btn"  class="heart-container"> <i  class="far fa-heart"></i></div>
  <div class="img-container">
    <img src="https://img.pokemondb.net/sprites/ruby-sapphire/normal/${pokemon.name}.png" />
  </div>
  <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
    <br>
    <small class="type">Ability: <span>${ability}</span></small>
  </div>
  `;

  pokemonEl.classList.add(type)
  pokemonEl.setAttribute('data-name', name)
  pokemonEl.setAttribute('data-item', type)
  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
  pokemonArray.push(name)
}

for (let i = 0; i < 32; i++) {
  pokemons_number = Math.floor(Math.random() * 386) + 1
  fetchPokemons()
}
console.log(pokemonArray)



function randomPokemon(event) {
  pokemons_number = Math.floor(Math.random() * 493) + 1
  console.log(pokemons_number)
  fetchPokemons();
}

random_btn.addEventListener('click', randomPokemon);

//Filtering Features


const setActive = (elm) => {
  if (document.querySelector(`.${active}`) !== null) {
    document.querySelector(`.${active}`).classList.remove(active)
  }
  elm.classList.add(active)

}



const filterLink = document.querySelectorAll(dataFilter);
const pokemonItems = document.querySelectorAll(pokemonData);


for (const link of filterLink) {
  link.addEventListener('click', function () {
    setActive(link);
    const filter = this.dataset.filter;
    pokemonItems.forEach((card) => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
  })
}

//Alphabetical sorting

sortBtn.addEventListener('click', resortByName)

function resortByName() {
  const pokemonList = [...document.querySelectorAll('.pokemon')]
  console.log(pokemonList)


  let alphabeticallyOrderedDivs = pokemonList.sort(function (a, b) {
    return a.dataset.name === b.dataset.name ? 0 : (a.dataset.name > b.dataset.name ? 1 : -1);
  });
  console.log(alphabeticallyOrderedDivs)
  let container = document.querySelector('.poke_container');

  container.childNodes.forEach(pokemon => pokemon.remove())
  alphabeticallyOrderedDivs.forEach(pokemon => container.appendChild(pokemon))

}





// const heart_btn = document.getElementById("heart-btn")
// heart_btn.addEventListener('click', function () {

//   console.log('click')
// })