const translations = {
  en: {
    about: "About",
    game: "Game",
    blog: "Blog",
    contact: "Contact",
    hello: "Hello!",
    welcome: "Welcome to my Website.",
    intro:
      'My name is Cristian Valdez. I came to 田子町(Takko town) in January of 2023. I am from the United States 🇺🇸. I came to Japan via the JET program and I am working here as an "ALT". Basically, I help teach English to the students in town. As of the 2023-2024 school year, I am working at Takko Kindergarten and Takko Elementary school. I am also working at the Takko Board of Education.',
    siteTitle: "Takkotaco.com",
    siteDesc:
      "I am creating Takkotaco.com to provide an easily accessible English learning resource for the students of Takko town. I plan to make various additions to the site in the future, such as simple English news posts, games, and general information about Takko town from the perspective of a foreigner resident. I'm also learning about web Development as I go, so the site quality should hopefully improve over time.",
    links: "LINKS",
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
    hello: "こんにちは！",
    welcome: "ウェブサイトへようこそ。",
    intro:
      "クリスチャン・バルデスと申します。2023年1月に田子町に来ました。アメリカ出身です🇺🇸。JETプログラムを通じて来日し、「ALT」として働いています。基本的に、町の生徒たちに英語を教えるのを手伝っています。2023-2024学年度は、田子幼稚園と田子小学校で働いています。田子町教育委員会でも働いています。",
    siteTitle: "Takkotaco.com",
    siteDesc:
      "Takkotaco.comは、田子町の生徒たちが簡単にアクセスできる英語学習リソースを提供するために作成しています。将来的には、シンプルな英語のニュース記事、ゲーム、外国人居住者の視点から見た田子町に関する一般的な情報など、さまざまな追加を行う予定です。また、ウェブ開発についても学んでいるところなので、サイトの品質は徐々に向上していくはずです。",
    links: "リンク",
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
