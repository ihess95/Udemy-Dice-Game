'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRollDie = document.querySelector('.btn--roll');
const btnHoldDie = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const scores = [0, 0];
let diceRoll = Math.trunc(Math.random() * 6) + 1;
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//function for resetting game to starting state
const init = function () {
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  if (!player0El.classList.contains('player--active'))
    player0El.classList.toggle('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  makeHidden(diceEl);
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  makeHidden(diceEl);
};

//functions for hiding and unhiding elements
const makeHidden = function (element) {
  element.classList.add('hidden');
};
const unhide = function (element) {
  element.classList.remove('hidden');
};

//Generating random number for the roll
const reroll = function () {
  diceRoll = Math.trunc(Math.random() * 6) + 1;
};

//Switching Player function
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Reset current score function
const rollReset = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
};

// function for roll functionality
const rollFunc = function () {
  if (diceRoll !== 1) {
    //add dice to current score
    currentScore += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch player
    rollReset();
    switchPlayer();
  }
};

//New Game Button functionality
btnNewGame.addEventListener('click', function () {
  startFunc();
});

//Roll dice button functionality
btnRollDie.addEventListener('click', function () {
  if (playing) {
    //Make sure die is not hidden
    unhide(diceEl);
    //Roll die using predefined function
    reroll();
    //Display correct picture based on number rolled
    diceEl.src = `dice-${diceRoll}.png`;
    //Check if roll is a 1: if true change player
    rollFunc();
    console.log(diceRoll);
  }
});

//Hold Dice button functionality
btnHoldDie.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is >= 100
    // Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      makeHidden(diceEl);
      // activePlayer === 0
      //   ? player0El.classList.toggle('player--winner')
      //   : player1El.classList.toggle('player--winner');
    } else {
      // Switch player
      rollReset();
      switchPlayer();
    }
  }
});

init();
