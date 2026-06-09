// Complete Database for 3 Languages
const datasets = {
  tamil: [
    { foreign: "வணக்கம்", phonetic: "(Vanakkam)", english: "Hello / Welcome", options: ["Thank you", "Hello / Welcome", "Goodbye", "Sorry"] },
    { foreign: "நன்றி", phonetic: "(Nandri)", english: "Thank you", options: ["Yes", "Please", "Thank you", "No"] },
    { foreign: "மகிழ்ச்சி", phonetic: "(Magizhchi)", english: "Happy / Joy", options: ["Happy / Joy", "Angry", "Sad", "Tired"] },
    { foreign: "வரவேற்பு", phonetic: "(Varavaerpu)", english: "Welcome", options: ["Goodbye", "Welcome", "Please", "Excuse me"] }
  ],
  japanese: [
    { foreign: "こんにちは", phonetic: "(Konnichiwa)", english: "Good Afternoon", options: ["Good Morning", "Goodbye", "Good Afternoon", "Thank you"] },
    { foreign: "ありがとう", phonetic: "(Arigatou)", english: "Thank you", options: ["Thank you", "Excuse me", "Yes", "Please"] },
    { foreign: "すみません", phonetic: "(Sumimasen)", english: "Excuse me / Sorry", options: ["Goodbye", "Welcome", "No", "Excuse me / Sorry"] },
    { foreign: "さようなら", phonetic: "(Sayounara)", english: "Goodbye", options: ["Hello", "Goodbye", "Good Night", "Please"] }
  ],
  espanol: [
    { foreign: "Hola", phonetic: "(Oh-lah)", english: "Hello", options: ["Goodbye", "Please", "Hello", "Thank you"] },
    { foreign: "Gracias", phonetic: "(Grah-syas)", english: "Thank you", options: ["Thank you", "You're welcome", "Sorry", "Please"] },
    { foreign: "Por favor", phonetic: "(Por fah-vor)", english: "Please", options: ["Excuse me", "Please", "Good morning", "Yes"] },
    { foreign: "Amigo", phonetic: "(Ah-mee-go)", english: "Friend", options: ["Family", "Brother", "Friend", "Teacher"] }
  ]
};

let currentLang = "tamil";
let currentIndex = 0;

// Element Selectors
const flashcard = document.getElementById('flashcard');
const nativeWord = document.getElementById('native-word');
const phoneticHint = document.getElementById('phonetic-hint');
const englishMeaning = document.getElementById('english-meaning');
const frontBadge = document.getElementById('front-badge');
const cardProgress = document.getElementById('card-progress');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const questionText = document.getElementById('question-text');
const quizOptions = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');

// Flip Action Click Trigger
flashcard.addEventListener('click', () => {
  flashcard.classList.toggle('flipped');
});

// Switch Selected Language Framework 
function switchLanguage(lang) {
  currentLang = lang;
  currentIndex = 0;
  
  // Update structural Active Tabs State highlight
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  renderActiveCard();
  buildQuiz();
}

// Render dynamic visual representations
function renderActiveCard() {
  flashcard.classList.remove('flipped');
  
  const currentItem = datasets[currentLang][currentIndex];
  
  setTimeout(() => {
    frontBadge.innerText = currentLang.toUpperCase();
    nativeWord.innerText = currentItem.foreign;
    phoneticHint.innerText = currentItem.phonetic;
    englishMeaning.innerText = currentItem.english;
    cardProgress.innerText = `${currentIndex + 1} / ${datasets[currentLang].length}`;
  }, 150);
}

// Setup Interactive Multiple Choice Quiz Module
function buildQuiz() {
  const currentQuizItem = datasets[currentLang][currentIndex];
  questionText.innerHTML = `What does state word <strong>"${currentQuizItem.foreign}"</strong> mean?`;
  quizOptions.innerHTML = '';
  quizFeedback.innerText = '';

  currentQuizItem.options.forEach(option => {
    const btn = document.createElement('button');
    btn.classList.add('quiz-opt');
    btn.innerText = option;
    btn.onclick = () => evaluateQuizAnswer(option, currentQuizItem.english);
    quizOptions.appendChild(btn);
  });
}

function evaluateQuizAnswer(chosen, realAnswer) {
  if (chosen === realAnswer) {
    quizFeedback.innerText = "🎯 Correct! Awesome recall!";
    quizFeedback.className = "feedback msg correct";
  } else {
    quizFeedback.innerText = "❌ Incorrect option. Try again!";
    quizFeedback.className = "feedback msg wrong";
  }
}

// Nav Controls Listeners
nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % datasets[currentLang].length;
  renderActiveCard();
  buildQuiz();
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + datasets[currentLang].length) % datasets[currentLang].length;
  renderActiveCard();
  buildQuiz();
};

// Start Initialize Setup Engine Launch
renderActiveCard();
buildQuiz();