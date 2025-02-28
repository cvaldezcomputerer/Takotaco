const { createClient } = supabase;
const _supabase = createClient(
  "https://ktzdepgmhlcjbbhhrwgv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0emRlcGdtaGxjamJiaGhyd2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwOTQzOTksImV4cCI6MjA1NTY3MDM5OX0.wmA3cPMovh01IoAyajHNTt6lo_hJUb1SJx6LMSKwe40"
);

console.log("Supabase Instance: ", _supabase);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentIndex = 0;
let collectedLetters = [];
let timer;
let seconds = 0;

document.addEventListener("DOMContentLoaded", function () {
  showStartModal();
});

function getRandomLetters(exclude, count) {
  const available = alphabet.filter((letter) => letter !== exclude);
  const options = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    const selectedLetter = available[randomIndex];
    options.push(selectedLetter);
  }
  return options;
}

function displayOptions() {
  if (currentIndex >= alphabet.length) {
    showCelebration();
    return;
  }

  const correctLetter = alphabet[currentIndex];
  const wrongOptions = getRandomLetters(correctLetter, 2);
  const options = [...wrongOptions, correctLetter];

  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = options
    .map(
      (letter) =>
        `<button class="option" data-letter="${letter}">${letter}</button>`
    )
    .join("");

  document.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", handleOptionClick);
  });
}

function handleOptionClick(event) {
  const selectedLetter = event.target.dataset.letter;
  const correctLetter = alphabet[currentIndex];

  if (selectedLetter === correctLetter) {
    event.target.classList.add("correct");
    collectedLetters.push(correctLetter);
    currentIndex++;
    updateCollectedLetters();

    setTimeout(() => {
      displayOptions();
    }, 500);
  } else {
    event.target.classList.add("incorrect");
    setTimeout(() => {
      event.target.classList.remove("incorrect");
    }, 300);
  }
}

function updateCollectedLetters() {
  const container = document.getElementById("collected-letters");
  container.innerHTML = collectedLetters
    .map((letter) => `<div class="collected-letter">${letter}</div>`)
    .join("");
}

function showStartModal() {
  document.querySelector(".cheerleader").classList.remove("active");
  document.getElementById("start-modal").classList.add("active");
}

function showInstructions() {
  // You can implement instructions modal later
  alert("Click the correct next letter in the alphabet!");
}

function shareScore() {
  const score = document.getElementById("final-time").textContent;
  // You can implement sharing functionality later
  alert(`You completed the alphabet in ${score} seconds!`);
}

function showCelebration() {
  clearInterval(timer);
  document.getElementById("final-time").textContent = seconds;
  document.getElementById("celebration").classList.add("active");

  document.querySelector(".cheerleader").classList.remove("active");
  saveScore(collectedLetters.length, seconds);
}

function updateTimer() {
  seconds++;
  document.getElementById("time").textContent = seconds;
}

function startNewGame() {
  currentIndex = 0;
  collectedLetters = [];
  seconds = 0;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  updateCollectedLetters();
  document.getElementById("celebration").classList.remove("active");
  document.getElementById("start-modal").classList.remove("active");

  document.querySelector(".cheerleader").classList.add("active");

  displayOptions();
}

function toggleLanguage() {
  const btn = document.querySelector(".translate-btn");
  const currentLang = btn.textContent === "日本語" ? "ja" : "en";
  const newLang = currentLang === "en" ? "ja" : "en";

  // Update button text
  btn.textContent = newLang === "en" ? "日本語" : "English";

  // Update all translatable elements
  document.querySelector(".title-section h2").textContent =
    translations[newLang].about;
  document.querySelector(".content h2:first-of-type").textContent =
    translations[newLang].hello;
  document.querySelector(".content h3").textContent =
    translations[newLang].welcome;
  document.querySelector(".content p:first-of-type").textContent =
    translations[newLang].intro;
  document.querySelector(".content h2:last-of-type").textContent =
    translations[newLang].siteTitle;
  document.querySelector(".content p:last-of-type").textContent =
    translations[newLang].siteDesc;
  document.querySelector(".links-box h2").textContent =
    translations[newLang].links;
}

// Add this after your supabase initialization
async function testConnection() {
  try {
    // Simple test query - using _supabase instead of supabase
    const { data, error } = await _supabase
      .from("scores")
      .select("count")
      .single();

    if (error) {
      console.error("Connection error:", error.message);
      return false;
    }

    console.log("Successfully connected to Supabase!");
    return true;
  } catch (error) {
    console.error("Connection error:", error.message);
    return false;
  }
}

// Test the connection when the page loads
testConnection();

// Modified saveScore function
async function saveScore(score, timeTaken) {
  try {
    const {
      data: { user },
    } = await _supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in to save scores");

    const { data, error } = await _supabase
      .from("scores")
      .insert([
        {
          user_id: user.id,
          score: score,
          time_taken: timeTaken,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving score:", error.message);
    return null;
  }
}

// READ - Get all scores (with optional limit)
async function getHighScores(limit = 10) {
  try {
    const { data, error } = await _supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching scores:", error.message);
    return [];
  }
}

// Modified updateScore function
async function updateScore(scoreId, newScore) {
  try {
    const {
      data: { user },
    } = await _supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in to update scores");

    const { data, error } = await _supabase
      .from("scores")
      .update({ score: newScore })
      .eq("id", scoreId)
      .eq("user_id", user.id) // Ensures user can only update their own scores
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating score:", error.message);
    return null;
  }
}

// Modified deleteScore function
async function deleteScore(scoreId) {
  try {
    const {
      data: { user },
    } = await _supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in to delete scores");

    const { error } = await _supabase
      .from("scores")
      .delete()
      .eq("id", scoreId)
      .eq("user_id", user.id); // Ensures user can only delete their own scores

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting score:", error.message);
    return false;
  }
}

// Example usage in your game:--------------------------------------------------------
async function handleGameComplete(userName, score, timeTaken) {
  // Save the score when game completes
  const savedScore = await saveScore(score, timeTaken);
  if (savedScore) {
    // Get and display high scores
    const highScores = await getHighScores();
    displayHighScores(highScores); // You'll need to create this function
  }
}

// Example function to display high scores
function displayHighScores(scores) {
  const scoresList = document.getElementById("high-scores"); // Add this element to your HTML
  if (!scoresList) return;

  scoresList.innerHTML = scores
    .map(
      (score) => `
        <li>
            ${score.user_name}: ${score.score} points (${score.time_taken}s)
        </li>
    `
    )
    .join("");
}

// Add event listener for restart button
document.getElementById("restart")?.addEventListener("click", startNewGame);

// Add this at the bottom of your script, just before the closing </script> tag
