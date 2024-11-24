const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["A) Earth", "B) Mars", "C) Jupiter", "D) Saturn"],
        correct: 1
    },
    {
        question: "What is the name of the galaxy that contains our Solar System?",
        options: ["A) Andromeda", "B) Whirlpool", "C) Milky Way", "D) Triangulum"],
        correct: 2
    },
    {
        question: "What is the largest planet in our Solar System?",
        options: ["A) Venus", "B) Neptune", "C) Earth", "D) Jupiter"],
        correct: 3
    },
    {
        question: "Which planet has the most extensive ring system?",
        options: ["A) Saturn", "B) Uranus", "C) Neptune", "D) Mars"],
        correct: 0
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["A) Mercury", "B) Venus", "C) Earth", "D) Mars"],
        correct: 0
    },
    {
        question: "How long does it take for light from the Sun to reach Earth?",
        options: ["A) 5 minutes", "B) 8 minutes", "C) 15 minutes", "D) 20 minutes"],
        correct: 1
    },
    {
        question: "Which celestial object is known as the Evening Star?",
        options: ["A) Mars", "B) Venus", "C) Jupiter", "D) Mercury"],
        correct: 1
    },
    {
        question: "What is the hottest planet in the Solar System?",
        options: ["A) Venus", "B) Mercury", "C) Mars", "D) Earth"],
        correct: 0
    },
    {
        question: "Which planet has the highest number of moons?",
        options: ["A) Jupiter", "B) Saturn", "C) Neptune", "D) Uranus"],
        correct: 1
    },
    {
        question: "What type of galaxy is the Milky Way?",
        options: ["A) Elliptical", "B) Irregular", "C) Spiral", "D) Lenticular"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    document.getElementById("result").textContent = "";
    const questionData = quizData[currentQuestion];
    document.getElementById("question").textContent = `${currentQuestion + 1}. ${questionData.question}`;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
    document.getElementById("progress").textContent = `${currentQuestion + 1} of ${quizData.length} Questions`;
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;
    clearInterval(timer);
    startTimer();
}

function checkAnswer(selected) {
    clearInterval(timer);
    const correct = quizData[currentQuestion].correct;
    const options = document.getElementsByClassName("option");
    Array.from(options).forEach((btn, idx) => {
        if (idx === correct) {
            btn.classList.add("correct");
        }
        if (idx === selected && selected !== correct) {
            btn.classList.add("incorrect");
        }
        btn.onclick = null;
    });
    if (selected === correct) {
        score += 10;
        document.getElementById("score").textContent = `Score: ${score} / 100`;
    }
    document.getElementById("next-btn").style.display = "block";
}

function showNextQuestion() {
    clearInterval(timer);
    document.getElementById("next-btn").style.display = "none";
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

function nextQuestion() {
    showNextQuestion();
}

function showFinalScore() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Your Final Score: ${score}/100</h2>
        <button class="btn" onclick="playAgain()">Play Again</button>
        <button class="btn" onclick="goHome()">Home</button>`;
}

function playAgain() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("quiz-container").innerHTML = `
        <div id="score">Score: 0 / 100</div>
        <div id="timer">Time Left: <span id="time">10</span>s</div>
        <div id="question"></div>
        <div id="options"></div>
        <div id="result"></div>
        <button id="next-btn" class="btn" onclick="nextQuestion()">Next</button>
        <div id="progress">1 of ${quizData.length} Questions</div>
    `;
    loadQuestion();
}

function goHome() {
    window.location.href = "index.html";
}
window.onload = loadQuestion;
