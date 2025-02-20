const translations = {
  en: {
    about: "About",
    game: "Game",
    blog: "Blog",
    contact: "Contact",
    welcome: "Welcome to Takko English",
    subtitle: "The Unofficial Takko English Website",
    startLearning: "Start Learning",
    interactiveLearning: "Interactive Learning",
    interactiveLearningDesc:
      "English games suitable for elementary schools and new learners!",
    englishBlog: "English Blog",
    englishBlogDesc:
      "Try reading some of my blog posts! Written in simple English for learners!",
    takkoTown: "Takko Town",
    takkoTownDesc: "Learn about the town from my perspective!",
    footer:
      "© 2025 Unofficial Takko Town English Website. All rights reserved.",
    underConstruction: "Under Construction",
    comingSoon: "Coming Soon!",
    backHome: "Back to Home",
  },
  ja: {
    about: "概要",
    game: "ゲーム",
    blog: "ブログ",
    contact: "お問い合わせ",
    welcome: "たっこイングリッシュへようこそ",
    subtitle: "非公式たっこ英語ウェブサイト",
    startLearning: "学習を始める",
    interactiveLearning: "インタラクティブ学習",
    interactiveLearningDesc: "小学生や初心者向けの英語ゲーム！",
    englishBlog: "英語ブログ",
    englishBlogDesc:
      "ブログ記事を読んでみましょう！学習者向けのシンプルな英語で書かれています！",
    takkoTown: "田子町",
    takkoTownDesc: "私の視点から町について学びましょう！",
    footer: "© 2025 非公式たっこ英語ウェブサイト. All rights reserved.",
    underConstruction: "準備中",
    comingSoon: "近日公開予定！",
    backHome: "ホームに戻る",
  },
};

let currentLang = "en";

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ja" : "en";
  updateContent();
  // Save language preference
  localStorage.setItem("preferredLanguage", currentLang);
  // Update button text
  const langText = document.querySelector(".lang-text");
  langText.textContent = currentLang === "en" ? "日本語" : "English";
}

function updateContent() {
  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });
}

// Initialize language from localStorage or default to English
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLanguage");
  if (savedLang) {
    currentLang = savedLang;
    updateContent();
    const langText = document.querySelector(".lang-text");
    langText.textContent = currentLang === "en" ? "日本語" : "English";
  }

  // Add click event listener to language toggle button
  document
    .getElementById("langToggle")
    .addEventListener("click", toggleLanguage);
});
