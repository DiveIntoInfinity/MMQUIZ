const quizData = [
    {
        question: "What does dark matter not emit?",
        options: ["A) Light", "B) Heat", "C) Radiation", "D) All of these"],
        correct: 3
    },
    {
        question: "What is dark matter detected by?",
        options: ["A) Light", "B) Gravity", "C) X-rays", "D) Neutrinos"],
        correct: 1
    },
    {
        question: "What percent of the universe is dark matter?",
        options: ["A) 27%", "B) 50%", "C) 70%", "D) 90%"],
        correct: 0
    },
    {
        question: "Which galaxy property suggests dark matter exists?",
        options: ["A) Color", "B) Shape", "C) Rotation", "D) Size"],
        correct: 2
    },
    {
        question: "What particles might make up dark matter?",
        options: ["A) Quarks", "B) WIMPs", "C) Neutrons", "D) Gluons"],
        correct: 1
    },
    {
        question: "Dark matter interacts mainly through:",
        options: ["A) Gravity", "B) Light", "C) Heat", "D) Sound"],
        correct: 0
    },
    {
        question: "What evidence supports dark matter?",
        options: ["A) Star colors", "B) Galaxy rotation", "C) Supernovae", "D) Cosmic rays"],
        correct: 1
    },
    {
        question: "What tool detects dark matter effects?",
        options: ["A) Microscopes", "B) Space telescopes", "C) Radio telescopes", "D) Gravity maps"],
        correct: 3
    },
    {
        question: "Dark matter helps explain:",
        options: ["A) Black holes", "B) Galaxy formation", "C) Planet orbits", "D) Solar flares"],
        correct: 1
    },
    {
        question: "What kind of matter is visible?",
        options: ["A) Baryonic", "B) Dark", "C) Antimatter", "D) Quantum"],
        correct: 0
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
