"use strict";

let playerSelection;
let computerSelection;

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

const getPlayerChoice = function () {
  playerSelection = prompt("Rock, Paper, or Scissors?")?.toLowerCase();
  if (!whatBeatsWhat[playerSelection]) getPlayerChoice();
};

const playRound = function () {
  getComputerChoice();
  getPlayerChoice();

  if (!playerSelection) return -1;

  if (whatBeatsWhat[playerSelection] === computerSelection) {
    return 1;
  }

  if (whatBeatsWhat[computerSelection] === playerSelection) {
    return 0;
  }

  if (playerSelection === computerSelection) {
    alert("It's a tie!");
    return playRound();
  }
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

console.log(game());
