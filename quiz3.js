const quizData = [
    {
        question: "Which galaxy is closest to the Milky Way?",
        options: ["A) Andromeda", "B) Triangulum", "C) Whirlpool", "D) Messier 87"],
        correct: 0
    },
    {
        question: "What is the shape of the Milky Way galaxy?",
        options: ["A) Elliptical", "B) Spiral", "C) Irregular", "D) Lenticular"],
        correct: 1
    },
    {
        question: "How many stars are estimated to be in the Milky Way galaxy?",
        options: ["A) 100 million", "B) 1 billion", "C) 100 billion", "D) 1 trillion"],
        correct: 2
    },
    {
        question: "Which galaxy is known for its irregular shape?",
        options: ["A) Andromeda", "B) Milky Way", "C) Messier 87", "D) Large Magellanic Cloud"],
        correct: 3
    },
    {
        question: "What is the most common type of galaxy in the universe?",
        options: ["A) Elliptical", "B) Spiral", "C) Irregular", "D) Lenticular"],
        correct: 0
    },
    {
        question: "What type of galaxy is the Andromeda Galaxy?",
        options: ["A) Elliptical", "B) Irregular", "C) Spiral", "D) Lenticular"],
        correct: 2
    },
    {
        question: "How far away is the Andromeda Galaxy from the Milky Way?",
        options: ["A) 2 million light years", "B) 5 million light years", "C) 10 million light years", "D) 50 million light years"],
        correct: 0
    },
    {
        question: "Which galaxy is the largest in the Local Group of galaxies?",
        options: ["A) Milky Way", "B) Andromeda", "C) Messier 87", "D) NGC 253"],
        correct: 1
    },
    {
        question: "The core of most galaxies contains a:",
        options: ["A) Black hole", "B) Nebula", "C) Supernova", "D) Quasar"],
        correct: 0
    },
    {
        question: "Which of the following is NOT a type of galaxy?",
        options: ["A) Lenticular", "B) Elliptical", "C) Planetary", "D) Irregular"],
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
