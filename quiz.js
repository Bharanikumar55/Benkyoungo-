// Day 1 Quiz Data
const quizData = [
  { word: "すみません", romaji: "sumimasen", meaning: "Excuse me / Sorry" },
  { word: "ありがとう", romaji: "arigatou", meaning: "Thank you" },
  { word: "こんにちは", romaji: "konnichiwa", meaning: "Hello" },
  { word: "さようなら", romaji: "sayonara", meaning: "Goodbye" },
  { word: "お願いします", romaji: "onegaishimasu", meaning: "Please" },
  { word: "わたし", romaji: "watashi", meaning: "I / Me" },
  { word: "あなた", romaji: "anata", meaning: "You" },
  { word: "にほんご", romaji: "nihongo", meaning: "Japanese language" },
  { word: "えいご", romaji: "eigo", meaning: "English" },
  { word: "すごい", romaji: "sugoi", meaning: "Amazing" }
];

let currentIndex = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadQuestion() {
  clearOptions();
  const current = quizData[currentIndex];
  questionEl.textContent = `${current.word} (${current.romaji})`;

  // Correct + 3 random wrong meanings
  const wrongOptions = quizData.filter(q => q.meaning !== current.meaning);
  const shuffledWrong = shuffle(wrongOptions).slice(0, 3);
  const choices = shuffle([current.meaning, ...shuffledWrong.map(q => q.meaning)]);

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = choice;
    btn.onclick = () => handleAnswer(btn, choice === current.meaning, current.meaning);
    optionsEl.appendChild(btn);
  });
}

function clearOptions() {
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
}

function handleAnswer(button, isCorrect, correctAnswer) {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach(btn => btn.disabled = true);
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    // Show the correct one
    buttons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  localStorage.setItem("day1Score", score);
  localStorage.setItem("day1Done", "true");
  nextBtn.style.display = "none";
}

// Start quiz
shuffle(quizData);
loadQuestion();