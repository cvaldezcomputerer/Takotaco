const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const image1 = "images/selfie/yay1.png";
const image2 = "images/selfie/yay2.png";
let currentImage = image1;
var currentLetter = "A";
var currentIndex = 0;
var stopwatchInterval;
var elapsedTime = 0;

$(document).ready(function () {
  setInterval(function () {
    currentImage = currentImage === image1 ? image2 : image1;
    $("#crisImage").attr("src", currentImage);
  }, 500); // Switch every second
  $("#playButton").on("click", startGame);
});

function startGame() {
  //resets vars incase the game is played again
  currentLetter = "A";
  currentIndex = 0;
  stopwatchInterval;
  elapsedTime = 0;
  $("#AlphabetScreen").empty();
  //hide stuff
  $("#endGameMessege").addClass("hidden");
  $("#gameControls").addClass("hidden");
  //show stuff
  $("#AlphabetScreen").removeClass("hidden");
  $("#chooseNextLetter").removeClass("hidden");
  $("#crisImageContainer").removeClass("hidden");

  startStopwatch();
  playMusic();
  runGameRound();
}

function playMusic() {
  // var audio = new Audio("./audio/abc.mp3");
  // audio.play();
}
function gameOver() {
  clearInterval(stopwatchInterval);
  $("#stopwatch").text("Game オヴァァァァ");
  $("#endGameMessege").removeClass("hidden");
  $("#endGameMessege").text("Your time was " + elapsedTime + "s");
  $("#chooseNextLetter").addClass("hidden");
  $("#gameControls").removeClass("hidden");
  $("#AlphabetScreen").addClass("hidden");
}
function runGameRound() {
  var randomCorrectChoice = getRandomNonRepeatingInts();
  //first randomize where the correct answwer will be
  var firstRandomLetter = getRandomCapitalLetter();
  //pick the random wrong asnwers based on the correct answer
  var secondRandomLetter = getAnotherRandomCapitalLetter(firstRandomLetter);

  //set the choices and add the click event handlers
  $("#letterChoice" + randomCorrectChoice[0])
    .text(currentLetter)
    .off("click")
    .on("click", handleCorrectLetter);
  $("#letterChoice" + randomCorrectChoice[1])
    .text(firstRandomLetter)
    .off("click")
    .on("click", handleIncorrectLetter);
  $("#letterChoice" + randomCorrectChoice[2])
    .text(secondRandomLetter)
    .off("click")
    .on("click", handleIncorrectLetter);
}

function startStopwatch() {
  elapsedTime = 0;
  $("#stopwatch").text("Time: 0s"); // Initialize the stopwatch display

  stopwatchInterval = setInterval(function () {
    elapsedTime++;
    $("#stopwatch").text("Time: " + elapsedTime + "s");
  }, 1000); // Update every second
}

function getRandomCapitalLetter() {
  var letter = letters[Math.floor(Math.random() * letters.length)];
  //make sure the letter is not the same as the current letter
  while (letter === currentLetter) {
    letter = letters[Math.floor(Math.random() * letters.length)];
  }
  return letter;
}

function getAnotherRandomCapitalLetter(letter) {
  var newLetter = letters[Math.floor(Math.random() * letters.length)];
  //make sure the letter is not the same as the current letter and not same as other random letter
  while (newLetter === letter || newLetter === currentLetter) {
    newLetter = letters[Math.floor(Math.random() * letters.length)];
  }
  return newLetter;
}

function getRandomNonRepeatingInts() {
  const numbers = [1, 2, 3];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.join("");
}

function handleCorrectLetter() {
  $("#AlphabetScreen").append(
    `<div style=" border: 2px solid rgb(30, 122, 242);">${currentLetter}</div>`
  );
  $("#AlphabetScreen").css("background-color", "#e9e9c7");
  nextRound();
}

function handleIncorrectLetter() {
  $("#AlphabetScreen").css("background-color", "red");
}

//a round is over when the user clicks on the correct letter.
function nextRound() {
  currentIndex++;
  //if there are still letters left to go through
  if (currentIndex < letters.length) {
    currentLetter = letters[currentIndex];
    runGameRound();
  } else {
    //change this to call game over function ***********
    gameOver();
  }
}

//goes through one instance of game based on the current corret letter
