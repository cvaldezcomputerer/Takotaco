const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentIndex = 0;
let collectedLetters = [];

function getRandomLetter(exclude) {
  let letter;
  do {
    letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  } while (exclude.includes(letter));
  return letter;
}

function createOptions() {
  const correctLetter = alphabet[currentIndex];
  const options = [correctLetter];

  // Add two random wrong options
  while (options.length < 3) {
    const randomLetter = getRandomLetter([...options, ...collectedLetters]);
    if (!options.includes(randomLetter)) {
      options.push(randomLetter);
    }
  }

  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
}

function updateCollectedLetters() {
  const container = document.getElementById("collected-letters");
  container.innerHTML = collectedLetters
    .map(
      (letter) => `
      <div class="collected-letter">
        ${letter}
        <span class="leaf">🍃</span>
      </div>
    `
    )
    .join("");
}

function handleOptionClick(event) {
  const selectedLetter = event.target.textContent;
  const correctLetter = alphabet[currentIndex];

  if (selectedLetter === correctLetter) {
    // Visual feedback for correct answer
    event.target.classList.add("correct");

    // Add random encouragement message
    const encouragements = [
      "よくできました！", // Well done!
      "すごい！", // Amazing!
      "がんばって！", // Keep going!
      "Perfect! ��",
      "Great job! 🍃",
    ];
    const message =
      encouragements[Math.floor(Math.random() * encouragements.length)];

    // Create and show encouragement message
    const feedback = document.createElement("div");
    feedback.className = "feedback-message";
    feedback.textContent = message;
    event.target.parentNode.appendChild(feedback);

    setTimeout(() => {
      feedback.remove();
      collectedLetters.push(correctLetter);
      currentIndex++;
      updateCollectedLetters();

      if (currentIndex >= alphabet.length) {
        showCelebration();
      } else {
        displayOptions();
      }
    }, 800);
  } else {
    // Visual feedback for incorrect answer
    event.target.classList.add("incorrect");
    setTimeout(() => {
      event.target.classList.remove("incorrect");
    }, 500);
  }
}

function displayOptions() {
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  const options = createOptions();
  options.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = letter;
    button.addEventListener("click", handleOptionClick);
    optionsContainer.appendChild(button);
  });
}

function showCelebration() {
  document.getElementById("celebration").style.display = "block";
}

function startNewGame() {
  currentIndex = 0;
  collectedLetters = [];
  updateCollectedLetters();
  document.getElementById("celebration").style.display = "none";
  displayOptions();
}

// Initialize game
document.getElementById("restart").addEventListener("click", startNewGame);
startNewGame();
