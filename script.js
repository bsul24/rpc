"use strict";

let playerSelection;
let computerSelection;
const selectionBtns = [...document.querySelectorAll(".btn-selection")];
const results = document.querySelector(".results-text");
const playerPoints = document.querySelector(".player-score");
const computerPoints = document.querySelector(".computer-score");
const winner = document.querySelector(".winner");
const resetBtn = document.querySelector(".btn-reset");

const options = {
  0: "rock",
  1: "paper",
  2: "scissors",
};

const whatBeatsWhat = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const capitalize = function (str) {
  if (!str) return;

  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

const getComputerChoice = function () {
  computerSelection = options[Math.floor(Math.random() * 3)];
};

const getPlayerChoice = function (e) {
  playerSelection = e.target.dataset.selection;
};

const updateScore = function (winner) {
  let score;

  if (winner === "player") {
    score = +playerPoints.textContent;
    score++;
    playerPoints.textContent = score;
  }

  if (winner === "computer") {
    score = +computerPoints.textContent;
    score++;
    computerPoints.textContent = score;
  }
};

const checkWinner = function () {
  if (+playerPoints.textContent > 4) {
    winner.textContent = "You win the game!";
    endGame();
    return;
  }

  if (+computerPoints.textContent > 4) {
    winner.textContent = "The computer wins the game!";
    endGame();
    return;
  }
};

const endGame = function () {
  selectionBtns.forEach((btn) => btn.removeEventListener("click", playRound));
};

const playRound = function (e) {
  getComputerChoice();
  getPlayerChoice(e);

  if (!playerSelection) return -1;

  if (whatBeatsWhat[playerSelection] === computerSelection) {
    results.textContent = `You win! ${capitalize(
      playerSelection
    )} beats ${capitalize(computerSelection)}`;
    updateScore("player");
  }

  if (whatBeatsWhat[computerSelection] === playerSelection) {
    results.textContent = `You lose! ${capitalize(
      computerSelection
    )} beats ${capitalize(playerSelection)}`;
    updateScore("computer");
  }

  if (playerSelection === computerSelection) {
    results.textContent = "Tie!";
  }

  checkWinner();
};

const resetGame = function () {
  results.textContent = "";
  playerPoints.textContent = 0;
  computerPoints.textContent = 0;
  winner.textContent = "";
  selectionBtns.forEach((btn) => btn.addEventListener("click", playRound));
};

// Event listeners
selectionBtns.forEach((btn) => btn.addEventListener("click", playRound));
selectionBtns.forEach((btn) =>
  btn.addEventListener("dblclick", (e) => e.preventDefault())
);
resetBtn.addEventListener("click", resetGame);
