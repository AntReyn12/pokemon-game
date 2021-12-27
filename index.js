// Elements grabbed from the DOM //
const pokemonsEl = document
  .querySelector(".select-screen")
  .querySelectorAll(".character");
const battleScreenEl = document.querySelector("#battle-screen");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const attackBtnsEl = battleScreenEl.querySelectorAll(".attack");

// State of the game //
const gameState = {
  userPokemon: "",
  rivalPokemon: "",
  currentUserAttack: "",
  pokemonDB: [
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
  ],
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
    gameState.userPokemon = pokemonName;
    // cpu picks pokemon //
    cpuPick();
    // change select screen to battle screen //
    battleScreenEl.classList.toggle("active");
    // select data from current user pokemon //
    gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
      return pokemon.name == gameState.userPokemon;
    });
    player1Img[0].src = gameState.currentPokemon[0].img;
    // select data from current cpu pokemon //
    gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (
      pokemon
    ) {
      return pokemon.name == gameState.rivalPokemon;
    });
    player2Img[0].src = gameState.currentRivalPokemon[0].img;

    gameState.currentPokemon[0].health = calculateInitialHealth(
      gameState.currentPokemon
    );
    gameState.currentPokemon[0].originalHealth = calculateInitialHealth(
      gameState.currentPokemon
    );

    gameState.currentRivalPokemon[0].health = calculateInitialHealth(
      gameState.currentRivalPokemon
    );
    gameState.currentRivalPokemon[0].originalHealth = calculateInitialHealth(
      gameState.currentRivalPokemon
    );
    console.log(gameState);
  };
}

for (i = 0; i < attackBtnsEl.length; i++) {
  attackBtnsEl[i].onclick = function () {
    const attackName = this.dataset.attack;
    gameState.currentUserAttack = attackName;
    play(attackName, cpuAttack());
  };
}

const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const cpuPick = function () {
  do {
    gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon;
    console.log("Looping " + gameState.rivalPokemon);
  } while (gameState.userPokemon == gameState.rivalPokemon);
  console.log(gameState.userPokemon);
};

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
  const userHP = player1
    .querySelector(".stats")
    .querySelector(".health")
    .querySelector(".health-bar")
    .querySelector(".inside");
  const cpuHP = player2
    .querySelector(".stats")
    .querySelector(".health")
    .querySelector(".health-bar")
    .querySelector(".inside");
  if (enemy.owner == "user") {
    const minusPercent = (enemy.health * 100) / enemy.originalHealth;
    userHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + "%";
  } else {
    const minusPercent = (enemy.health * 100) / enemy.originalHealth;
    cpuHP.style.width = (minusPercent < 0 ? 0 : minusPercent) + "%";
  }
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
  currentPokemon.owner = "user";
  currentRivalPokemon.owner = "cpu";
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
