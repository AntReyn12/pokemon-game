// Elements grabbed from the DOM //
const pokemonsEl = document
  .querySelector(".select-screen")
  .querySelectorAll(".character");
const battleScreenEl = document.querySelector("#battle-screen");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const attackBtnsEl = battleScreenEl.querySelectorAll(".attack");

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
  currentUserAttack: "",
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
    gameState.currentPokemon = pokemonDB.filter(function (pokemon) {
      return pokemon.name == gameState.Userpokemon;
    });
    player1Img[0].src = gameState.currentPokemon[0].img;
    // select data from current cpu pokemon //
    gameState.currentRivalPokemon = pokemonDB.filter(function (pokemon) {
      return pokemon.name == gameState.rivalPokemon;
    });
    player2Img[0].src = gameState.currentRivalPokemon[0].img;

    gameState.currentPokemon[0].health = calculateInitialHealth(
      gameState.currentPokemon
    );
    gameState.currentRivalPokemon[0].health = calculateInitialHealth(
      gameState.currentRivalPokemon
    );
    console.log(gameState);
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

for (i = 0; i < attackBtnsEl.length; i++) {
  attackBtnsEl[i].onclick = function () {
    const attackName = this.dataset.attack;
    gameState.currentUserAttack = attackName;
    play(attackName, cpuAttack());
  };
}

const cpuAttack = function () {
  const attacks = ["rock", "paper", "scissors"];
  return attacks[randomNumber(0, 3)];
};

const calculateInitialHealth = function (user) {
  return 0.2 * (Math.sqrt(user[0].level) * user[0].defense) * user[0].hp;
};

const attackMove = function (attack, level, stack, critical, enemy, attacker) {
  console.log(enemy.name + " before: " + enemy.health);
  const attackAmount = attack * level * (stack + critical);
  enemy.health = enemy.health - attackAmount;
  checkWinner(enemy, attacker);
  console.log(enemy.name + " after: " + enemy.health);
};

const checkWinner = function (enemy, attacker) {
  if (enemy.health <= 0) {
    console.log("YOU WIN " + attacker.name);
  }
};

const play = function (userAttack, cpuAttack) {
  const currentPokemon = gameState.currentPokemon[0];
  const currentRivalPokemon = gameState.currentRivalPokemon[0];
  switch (userAttack) {
    case "rock":
      if (cpuAttack == "paper") {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            0.5,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              2,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      } else if (cpuAttack == "scissors") {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            2,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              0.5,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      } else {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            1,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              1,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      }
      break;
    case "paper":
      if (cpuAttack == "rock") {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            2,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              0.5,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      } else if (cpuAttack == "scissors") {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            0.5,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              2,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      } else {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            1,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              1,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      }
      break;
    case "scissors":
      if (cpuAttack == "paper") {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            2,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              0.5,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      } else if (cpuAttack == "rock") {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            0.5,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              2,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      } else {
        if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
          // user //
          attackMove(
            currentPokemon.attack,
            currentPokemon.level,
            0.8,
            1,
            currentRivalPokemon,
            currentPokemon
          );
          if (currentRivalPokemon.health >= 1) {
            // cpu //
            attackMove(
              currentRivalPokemon.attack,
              currentRivalPokemon.level,
              0.8,
              1,
              currentPokemon,
              currentRivalPokemon
            );
          }
        }
      }
      break;
  }
};

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
