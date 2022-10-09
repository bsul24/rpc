"use strict";

let playerSelection;
let computerSelection;
const selectionBtns = [...document.querySelectorAll(".btn-selection")];
const winningScore = document.querySelector(".winning-score-text");
const inlineScore = document.querySelector(".inline-score");
const results = document.querySelector(".results-text");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const playerPick = document.querySelector(".player-selection");
const computerPick = document.querySelector(".computer-selection");
const playerPoints = document.querySelector(".player-score");
const computerPoints = document.querySelector(".computer-score");
const winner = document.querySelector(".winner");
const resetBtn = document.querySelector(".btn-reset");

const options = {
  0: "rock",
  1: "paper",
  2: "scissors",
};

const symbols = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂",
};

const whatBeatsWhat = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const capitalize = function (str) {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

const getComputerChoice = function () {
  const pick = options[Math.floor(Math.random() * 3)];
  computerSelection = pick;
  computerPick.textContent = symbols[pick];
};

const getPlayerChoice = function (e) {
  const pick = e.target.dataset.selection;
  playerSelection = pick;
  playerPick.textContent = symbols[pick];
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

const updateWinningScore = function (e) {
  const score = e.target.value;

  if (score < 0 || score > 99) return;

  inlineScore.textContent = score;
  resetGame();
};

const checkWinner = function () {
  if (+playerPoints.textContent === +winningScore.value) {
    results.textContent = "You win the game!";
    endGame(computer);
    return;
  }

  if (+computerPoints.textContent === +winningScore.value) {
    results.textContent = "The computer wins the game!";
    endGame(player);
    return;
  }
};

const endGame = function (winner) {
  selectionBtns.forEach((btn) => btn.removeEventListener("click", playRound));
  results.classList.add("results-text-win");
  winner.textContent = "💥";
  resetBtn.classList.remove("hidden");
};

const playRound = function (e) {
  getComputerChoice();
  getPlayerChoice(e);

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
  results.textContent = " ";
  results.classList.remove("results-text-win");
  playerPoints.textContent = 0;
  computerPoints.textContent = 0;
  winner.textContent = "";
  playerPick.textContent = "❓";
  computerPick.textContent = "❓";
  player.textContent = "🧍";
  computer.textContent = "💻";
  resetBtn.classList.add("hidden");
  selectionBtns.forEach((btn) => btn.addEventListener("click", playRound));
};

// Event listeners
selectionBtns.forEach((btn) => btn.addEventListener("click", playRound));
selectionBtns.forEach((btn) =>
  btn.addEventListener("dblclick", (e) => e.preventDefault())
);
resetBtn.addEventListener("click", resetGame);
winningScore.addEventListener("input", updateWinningScore);
