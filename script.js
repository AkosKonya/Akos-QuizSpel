// Har finns alla fragor och svar
const quizData = [
    {
        question: "Vad betyder Pectoralis major?",
        options: ["Stora brostmuskeln", "Stora ryggmuskeln", "Deltamuskeln", "Kappmuskeln"],
        correct: 0,
        image: ""
    },
    {
        question: "Vilken muskel kallas Biceps brachii?",
        options: ["Trehovdade armmuskeln", "Tva-hovdade armmuskeln", "Fyrhovdade larmuskeln", "Stora brostmuskeln"],
        correct: 1,
        image: ""
    },
    {
        question: "Vad heter den trehovdade armmuskeln pa latin?",
        options: ["Deltoideus", "Biceps brachii", "Triceps brachii", "Trapezius"],
        correct: 2,
        image: ""
    },
    {
        question: "Vilken muskel kallas Quadriceps femoris?",
        options: ["Stora ryggmuskeln", "Deltamuskeln", "Kappmuskeln", "Fyrhovdade larmuskeln"],
        correct: 3,
        image: ""
    },
    {
        question: "Vad betyder Deltoideus?",
        options: ["Deltamuskeln", "Stora brostmuskeln", "Tva-hovdade armmuskeln", "Kappmuskeln"],
        correct: 0,
        image: ""
    },
    {
        question: "Vilken muskel kallas Trapezius?",
        options: ["Stora larmuskeln", "Kappmuskeln", "Stora brostmuskeln", "Stora ryggmuskeln"],
        correct: 1,
        image: ""
    },
    {
        question: "Vad heter den stora ryggmuskeln pa latin?",
        options: ["Trapezius", "Deltoideus", "Latissimus dorsi", "Pectoralis major"],
        correct: 2,
        image: ""
    }
];
// Variabler som haller koll pa quizet
let currentQuestion = 0;
let score = 0;
let answered = false;
let playerName = "";
// Startar quizet
function startQuiz() {
    playerName = document.getElementById("player-name").value;
    if (playerName === "") {
        playerName = "Spelare";
    }
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    loadQuestion();
}
// Visar aktuell fraga
function loadQuestion() {
    answered = false;
    document.getElementById("next-button").disabled = true;
    let question = quizData[currentQuestion];
    document.getElementById("question-number").innerText = "Fraga " + (currentQuestion + 1) + " av " + quizData.length;
    document.getElementById("score").innerText = "Poang: " + score;
    document.getElementById("question").innerText = question.question;
    // Visar bild om det finns en bildadress
    let image = document.getElementById("question-image");
    let fallback = document.getElementById("image-fallback");
    if (question.image !== "") {
        image.src = question.image;
        image.style.display = "block";
        fallback.style.display = "none";
        image.onerror = function() {
            image.style.display = "none";
            fallback.style.display = "block";
        };
    } else {
        image.style.display = "none";
        fallback.style.display = "block";
    }
    // Skapar svarsalternativen
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach(function(option, index) {
        let button = document.createElement("button");
        button.innerText = option;
        button.className = "option-button";
        button.onclick = function() {
            checkAnswer(index, button);
        };
        optionsDiv.appendChild(button);
    });
}
// Kontrollerar om svaret ar ratt
function checkAnswer(selectedAnswer, selectedButton) {
    if (answered === true) {
        return;
    }
    answered = true;
    let correctAnswer = quizData[currentQuestion].correct;
    let buttons = document.querySelectorAll(".option-button");
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    // Markerar ratt och fel svar
    buttons.forEach(function(button, index) {
        button.disabled = true;
        if (index === correctAnswer) {
            button.classList.add("correct");
        } else if (index === selectedAnswer) {
            button.classList.add("incorrect");
        }
    });
    document.getElementById("score").innerText = "Poang: " + score;
    document.getElementById("next-button").disabled = false;
}
// Gar vidare till nasta fraga
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}
// Visar resultatet nar quizet ar klart
function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("final-score").innerText = playerName + ", du fick " + score + " av " + quizData.length + " poang!";
    let summary = document.getElementById("answer-summary");
    summary.innerHTML = "<h3>Ratta svar:</h3>";
    quizData.forEach(function(question, index) {
        summary.innerHTML += "<p>" + (index + 1) + ". " + question.question + "<br>Ratt svar: " + question.options[question.correct] + "</p>";
    });
}
// Borjar om quizet
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
}