document.addEventListener("DOMContentLoaded", function () {
    let splashScreen = document.querySelector(".splash-screen-container");
    let mainContent = document.querySelector(".index-main");

    splashScreen.style.visibility = "visible";
    splashScreen.style.opacity = "0";
    splashScreen.style.transition = "opacity 1.5s ease-in";

    setTimeout(() => {
        splashScreen.style.opacity = "1";
    }, 100);

    setTimeout(() => {
        splashScreen.style.transition = "opacity 1.5s ease-out";
        splashScreen.style.opacity = "0";
    }, 2500);

    setTimeout(() => {
        splashScreen.style.display = "none";
        mainContent.style.display = "block";
    }, 4000);
});

function changeDisplay() {
    let mainContent = document.querySelector(".index");
    let gameContent = document.querySelector(".main-content");

    if (mainContent && gameContent) {
        mainContent.style.display = "none";
        gameContent.style.display = "block";
    } else {
        console.error("One or both elements not found!");
    }
}



const allQuestions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Text Machine Language", correct: false },
        ]
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers: [
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "background", correct: false },
        ]
    },
    {
        question: "Which of the following is the correct syntax for referring to an external script called 'script.js' in HTML?",
        answers: [
            { text: "&lt;script src='script.js'&gt", correct: true },
            { text: "&lt;script href='script.js'&gt", correct: false },
            { text: "&lt;script file='script.js'&gt", correct: false },
            { text: "&lt;script link='script.js'&gt", correct: false },
        ]
    },
    {
        question: "What does the 'console.log()' function do in JavaScript?",
        answers: [
            { text: "It logs data to the browser's console", correct: true },
            { text: "It prints data to the webpage", correct: false },
            { text: "It opens a new tab in the browser", correct: false },
            { text: "It creates a log file in the server", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "&lt;style&gt;", correct: true },
            { text: "&lt;css&gt;", correct: false },
            { text: "&lt;script&gt;", correct: false },
            { text: "&lt;head&gt;", correct: false },
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ]
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/*", correct: false },
            { text: "#", correct: false },
            { text: "--", correct: false },
        ]
    },
    {
        question: "What is the output of typeof null in JavaScript?",
        answers: [
            { text: "'null'", correct: false },
            { text: "'object'", correct: true },
            { text: "'undefined'", correct: false },
            { text: "'string'", correct: false },
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
            { text: "onmouseover", correct: false },
            { text: "onclick", correct: true },
            { text: "onchange", correct: false },
            { text: "onload", correct: false },
        ]
    }
];

const questionElement = document.getElementById("questions");
const reultElement = document.getElementById("reult");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const qqButton = document.getElementById("qq");
const quizContent = document.getElementById("quiz-content");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions() {
    let shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); 
}

function startQuiz() {
    questions = shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.disabled = false;
    showQuestion();

    // qqButton.style.display = "block";
    quizContent.style.display = "none";
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    qqButton.style.display = "block";
    quizContent.style.display = "none";
    nextButton.disabled = false;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    nextButton.disabled = false;
}

function showScore() {
    resetState();
    quizContent.style.display = "block";
    reultElement.style.display = "block";
    reultElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    qqButton.style.display = "none";
    questionElement.style.display = "none";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
