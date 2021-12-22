// Elements grabbed from the DOM //
const pokemonsEl = document
  .querySelector(".select-screen")
  .querySelectorAll(".character");
const battleScreenEl = document.querySelector("#battle-screen");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

// This is the database //
const pokemonDB = [
  {
    name: "charmander",
    type: "fire",
    hp: 39,
    attack: 52,
    defense: 43,
    level: 1,
    img: "http://www.smogon.com/dex/media/sprites/xy/charmander.gif",
  },
  {
    name: "bulbasaur",
    type: "grass",
    hp: 45,
    attack: 49,
    defense: 49,
    level: 1,
    img: "http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif",
  },
  {
    name: "squirtle",
    type: "water",
    hp: 44,
    attack: 48,
    defense: 65,
    level: 1,
    img: "http://www.smogon.com/dex/media/sprites/xy/squirtle.gif",
  },
];
// State of the game //
const gameState = {
  Userpokemon: "",
  rivalPokemon: "",
};
// Initial loop //
for (i = 0; i < pokemonsEl.length; i++) {
  // add function to all characters on screen select //
  pokemonsEl[i].onclick = function () {
    // current selected pokemon name //
    const pokemonName = this.dataset.pokemon;
    // elements for images on battle screen //
    const player1Img = player1.getElementsByTagName("img");
    const player2Img = player2.getElementsByTagName("img");
    // save the current pokemon to game state //
    gameState.Userpokemon = pokemonName;
    // cpu picks pokemon //
    cpuPick();
    // change select screen to battle screen //
    battleScreenEl.classList.toggle("active");
    // select data from current user pokemon //
    let currentPokemon = pokemonDB.filter(function (pokemon) {
      return pokemon.name == gameState.Userpokemon;
    });
    player1Img[0].src = currentPokemon[0].img;
    // select data from current cpu pokemon //
    let currentRivalPokemon = pokemonDB.filter(function (pokemon) {
      return pokemon.name == gameState.rivalPokemon;
    });
    player2Img[0].src = currentRivalPokemon[0].img;

    // user choose attack //

    // cpu health goes down //

    // cpu attack //

    // user health goes down //

    // rock > scissors //

    // paper > rock //

    // scissors > paper //

    // logic for how attacks impact individual pokemon stats //

    // who ever gets to health <= 0 loses //
  };
}

const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const cpuPick = function () {
  gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon;
};

// // pokemon
// // create data for 3 different pokemons, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)
// const pokemons = [
//   {
//     name: "charmander",
//     type: "fire",
//     attack: 52,
//     stamina: 39,
//     level: 1,
//   },
//   {
//     name: "charmander",
//     type: "fire",
//     attack: 52,
//     stamina: 39,
//     level: 1,
//   },
// ];

// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var stamina = 39;

// // create a formula for attacks
// console.log((attack * level * stack) / 7);

// // create a formula for health
// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(0.2 * Math.sqrt(level) * stamina * 15);

// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// // p1 vs p2

// // when one user loses all his health declare a winner
