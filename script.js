"use strict";

let playerSelection;
let computerSelection;
const selectionBtns = [...document.querySelectorAll("button")];
const results = document.querySelector(".results-text");
const playerPoints = document.querySelector(".player-score");
const computerPoints = document.querySelector(".computer-score");
const winner = document.querySelector(".winner");

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

/*
const getPlayerChoice = function () {
  playerSelection = prompt("Rock, Paper, or Scissors?")?.toLowerCase();
  if (!whatBeatsWhat[playerSelection]) getPlayerChoice();
};
*/

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
    return;
  }

  if (+computerPoints.textContent > 4) {
    winner.textContent = "The computer wins the game!";
    return;
  }
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
    // return 1;
  }

  if (whatBeatsWhat[computerSelection] === playerSelection) {
    results.textContent = `You lose! ${capitalize(
      computerSelection
    )} beats ${capitalize(playerSelection)}`;
    updateScore("computer");
    // return 0;
  }

  if (playerSelection === computerSelection) {
    results.textContent = "Tie!";
    // return playRound();
  }

  checkWinner();
};

const game = function () {
  let playerScore = 0;
  let computerScore = 0;
  for (let i = 0; i < 5; i++) {
    const current = playRound();
    if (current === -1) return;
    if (current) {
      playerScore++;
      console.log(
        `You win the round! ${capitalize(playerSelection)} beats ${capitalize(
          computerSelection
        )}!`
      );
    } else {
      computerScore++;
      console.log(
        `You lose the round! ${capitalize(
          computerSelection
        )} beats ${capitalize(playerSelection)}!`
      );
    }
  }
  return playerScore > computerScore
    ? `You win the game with a score of ${playerScore} to ${computerScore}!`
    : `The computer wins the game with a score of ${computerScore} to ${playerScore}!`;
};

// Event listeners
selectionBtns.forEach((btn) => btn.addEventListener("click", playRound));
