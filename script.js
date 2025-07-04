const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  // ERROR 1 corrected: Template literal now uses backticks ``
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove("hidden");
  // ERROR 2 corrected: Template literal now uses backticks ``
  diceEl.src = `dice-${dice}.png`; // Assuming the dice images are .png based on common practice. If they are .jpeg, keep that extension.

  if (dice !== 1) {
    currentScore += dice;
    // Template literal now uses backticks ``
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  if (!playing) return;

  // Add current score to active player's total score
  scores[activePlayer] += currentScore;
  // Template literal now uses backticks ``
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  // Check if player has won
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");
    // Template literal now uses backticks ``
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    // Template literal now uses backticks ``
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  } else {
    // If no winner, switch player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);