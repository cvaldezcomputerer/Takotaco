const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let currentIndex = 0;
let collectedLetters = [];
let timer;
let seconds = 0;

const translations = {
  en: {
    about: "About",
    hello: "Hello!",
    welcome: "Welcome to my Website.",
    intro:
      'My name is Cristian Valdez. I came to 田子町(Takko town) in January of 2023. I am from the United States 🇺🇸. I came to Japan via the JET program and I am working here as an "ALT". Basically, I help teach English to the students in town. As of the 2023-2024 school year, I am working at Takko Kindergarten and Takko Elementary school. I am also working at the Takko Board of Education.',
    siteTitle: "Takkotaco.com",
    siteDesc:
      "I am creating Takkotaco.com to provide an easily accessible English learning resource for the students of Takko town. I plan to make various additions to the site in the future, such as simple English news posts, games, and general information about Takko town from the perspective of a foreigner resident. I'm also learning about web Development as I go, so the site quality should hopefully improve over time.",
    links: "LINKS",
  },
  ja: {
    about: "概要",
    hello: "こんにちは！",
    welcome: "ウェブサイトへようこそ。",
    intro:
      "クリスチャン・バルデスと申します。2023年1月に田子町に来ました。アメリカ出身です🇺🇸。JETプログラムを通じて来日し、「ALT」として働いています。基本的に、町の生徒たちに英語を教えるのを手伝っています。2023-2024学年度は、田子幼稚園と田子小学校で働いています。田子町教育委員会でも働いています。",
    siteTitle: "Takkotaco.com",
    siteDesc:
      "Takkotaco.comは、田子町の生徒たちが簡単にアクセスできる英語学習リソースを提供するために作成しています。将来的には、シンプルな英語のニュース記事、ゲーム、外国人居住者の視点から見た田子町に関する一般的な情報など、さまざまな追加を行う予定です。また、ウェブ開発についても学んでいるところなので、サイトの品質は徐々に向上していくはずです。",
    links: "リンク",
  },
};

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

document.addEventListener("DOMContentLoaded", () => {
  showStartModal();
});
