"use strict";

const whatBeatsWhat = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const capitalize = function (str) {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};

const getComputerChoice = function () {
  const options = {
    0: "rock",
    1: "paper",
    2: "scissors",
  };
  return options[Math.floor(Math.random() * 3)];
};

const playerSelection = prompt("Rock, Paper, or Scissors?").toLowerCase();
const computerSelection = getComputerChoice();

const playRound = function (playerSelection, computerSelection) {
  if (whatBeatsWhat[playerSelection] === computerSelection) {
    return `You win! ${capitalize(playerSelection)} beats ${capitalize(
      computerSelection
    )}!`;
  }

  if (whatBeatsWhat[computerSelection] === playerSelection) {
    return `You lose! ${capitalize(computerSelection)} beats ${capitalize(
      playerSelection
    )}!`;
  }

  if (playerSelection === computerSelection) {
    return `It's a tie! You both selected ${capitalize(playerSelection)}!`;
  }
};

console.log(playRound(playerSelection, computerSelection));
