const quizData = [
    {
        question: "What is the primary evidence for the existence of dark matter?",
        options: ["A) Gravitational lensing", "B) Cosmic microwave background", "C) Dark energy", "D) Galactic rotation curves"],
        correct: 3
    },
    {
        question: "What percentage of the universe is believed to be made of dark matter?",
        options: ["A) 10%", "B) 25%", "C) 50%", "D) 85%"],
        correct: 1
    },
    {
        question: "What type of particles are hypothesized to make up dark matter?",
        options: ["A) Neutrinos", "B) Photons", "C) WIMPs", "D) Electrons"],
        correct: 2
    },
    {
        question: "Which of the following does dark matter NOT do?",
        options: ["A) Interact via gravity", "B) Absorb light", "C) Emit radiation", "D) Weigh galaxies"],
        correct: 2
    },
    {
        question: "Which space telescope helped provide evidence for dark matter?",
        options: ["A) Hubble", "B) James Webb", "C) Chandra", "D) Kepler"],
        correct: 0
    },
    {
        question: "Dark matter cannot be detected by which of the following methods?",
        options: ["A) Gravitational lensing", "B) Emission of X-rays", "C) Visible light detection", "D) Radio waves"],
        correct: 2
    },
    {
        question: "The mass of dark matter is primarily responsible for the:",
        options: ["A) Expansion of the universe", "B) Rotation of galaxies", "C) Formation of stars", "D) Formation of black holes"],
        correct: 1
    },
    {
        question: "Which of the following galaxies shows a large amount of dark matter?",
        options: ["A) Milky Way", "B) Andromeda", "C) Messier 87", "D) NGC 253"],
        correct: 0
    },
    {
        question: "What is the hypothetical name for dark matter particles?",
        options: ["A) Higgs bosons", "B) WIMPs", "C) Quarks", "D) Gluons"],
        correct: 1
    },
    {
        question: "Dark matter is thought to interact primarily through which force?",
        options: ["A) Strong nuclear force", "B) Electromagnetic force", "C) Gravity", "D) Weak nuclear force"],
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

    setTimeout(showNextQuestion, 2000);
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
        <button class="btn" onclick="goHome()">Home</button>
        <button class="btn" id="share-quiz-btn">Share Your Score</button>
    `;

    document.getElementById('share-quiz-btn').addEventListener('click', shareScore);
}

function shareScore() {
    const shareText = `I scored ${score}/100 on this awesome quiz! Can you beat my score?`;
    const shareUrl = 'https://diveintoinfinity.github.io/MMQUIZ/'; 

    if (navigator.share) {
        navigator.share({
            title: 'Quiz Score',
            text: shareText,
            url: shareUrl
        })
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Error sharing:', error));
    } else {

        alert('Sharing is not supported in this browser. You can copy the link: ' + shareUrl);
    }
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
