const quizData = [
    {
        question: "Which planet is known as the 'Earth's twin'?",
        options: ["A) Venus", "B) Mars", "C) Jupiter", "D) Saturn"],
        correct: 0
    },
    {
        question: "Which planet has a day longer than its year?",
        options: ["A) Venus", "B) Mars", "C) Earth", "D) Mercury"],
        correct: 0
    },
    {
        question: "What is the largest moon of Saturn?",
        options: ["A) Ganymede", "B) Titan", "C) Callisto", "D) Europa"],
        correct: 1
    },
    {
        question: "Which planet is known for its Great Red Spot?",
        options: ["A) Mars", "B) Jupiter", "C) Saturn", "D) Neptune"],
        correct: 1
    },
    {
        question: "Which planet has the most volcanoes in the Solar System?",
        options: ["A) Venus", "B) Mars", "C) Earth", "D) Jupiter"],
        correct: 0
    },
    {
        question: "Which planet is famous for its massive dust storms?",
        options: ["A) Mars", "B) Mercury", "C) Venus", "D) Saturn"],
        correct: 0
    },
    {
        question: "Which planet has the longest rotation period?",
        options: ["A) Neptune", "B) Venus", "C) Earth", "D) Mars"],
        correct: 1
    },
    {
        question: "Which planet is known as the 'Ice Giant'?",
        options: ["A) Neptune", "B) Uranus", "C) Saturn", "D) Jupiter"],
        correct: 1
    },
    {
        question: "Which planet has the most extreme temperature variation?",
        options: ["A) Mercury", "B) Venus", "C) Mars", "D) Uranus"],
        correct: 0
    },
    {
        question: "Which is the smallest planet in our Solar System?",
        options: ["A) Mars", "B) Mercury", "C) Venus", "D) Earth"],
        correct: 1
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
