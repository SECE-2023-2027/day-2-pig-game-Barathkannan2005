'use strict';

// ---------- Selecting elements -----------------
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El  = document.getElementById('score--0');
const score1El  = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl  = document.querySelector('.dice');
const btnNew  = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// ---------- Game state --------------------------
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores       = [0, 0];
  currentScore = 0;
  activePlayer = 0;   // 0 → Player 1, 1 → Player 2
  playing      = true;

  score0El.textContent  = 0;
  score1El.textContent  = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// ---------- Helper: switch active player -------
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ---------- Roll‑dice button --------------------
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  // 1. Random dice
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Show dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.jpg`;

  // 3. Check
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// ---------- Hold button -------------------------
btnHold.addEventListener('click', function () {
  if (!playing) return;

  // 1. Add to total
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // 2. Win?
  if (scores[activePlayer] >= 100) {   // ← target score
    playing = false;
    diceEl.classList.add('hidden');

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

// ---------- New‑game button ---------------------
btnNew.addEventListener('click', init);
