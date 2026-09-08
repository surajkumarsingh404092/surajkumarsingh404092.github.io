let quizData = [
    {
        question: "what is the capital of Japan?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        correct: "Tokyo",
    },
    {
        question: "what is the capital of France?",
        options: ["Tokyo", "Beijing", "Paris", "Bangkok"],
        correct: "Paris",
    },
    {
        question: "what is the capital of Austrailiya?",
        options: ["Tokyo", "Beijing", "Canberra", "Bangkok"],
        correct: "Canberra",
    },
    {
        question: "what is the capital of Canada?",
        options: ["Tokyo", "Ottawa", "Seoul", "Bangkok"],
        correct: "Ottawa",
    },
    {
        question: "what is the capital of Afganishtan?",
        options: ["Barasillia", "Beijing", "Kabul", "Bangkok"],
        correct: "Kabul",
    },
    {
        question: "what is the capital of Srilanka?",
        options: ["Tokyo", "Beijing", "Colambo", "Bangkok"],
        correct: "Colambo",
    },
    {
        question: "what is the capital of Pakistan?",
        options: ["Tokyo", "Beijing", "Canberra", "Islamabad"],
        correct: "Islamabad",
    },
    {
        question: "what is the capital of India?",
        options: ["Tokyo", "New Delhi", "Canberra", "Bangkok"],
        correct: "New Delhi",
    },
    {
        question: "In 4th period of periodic table the elements with the largest and smallest size respectively is:",
        options: ["K and Br", "Na and Cl", "K and Se", "Rb and Br"],
        correct: "K and Br",
    },
    {
        question: "what is the capital of Bhutan? ",
        options: ["Thimpu", "nagasaki", "Dhaka","Patna"],
        correct: "Thimpu",
    },    

];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 10;
let timerInterval;

const shuffleArray = array => {
      return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);
const resetLocalStorage = () => {
    for (i = 0; i <MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
}
    resetLocalStorage();


const checkAnswer = (e) => {
  let UserAnswer = e.target.innerHTML;
  if (UserAnswer === quizData[questionNumber].correct){
  score++;
  e.target.classList.add("correct");
} else {
   e.target.classList.add("incorrect");
}

localStorage.setItem(`UserAnswer_${questionNumber}`, UserAnswer);

let allOptions = document.querySelectorAll(".quiz-container .option")
allOptions.forEach((o) => {
    o.classList.add("disabled");
});
};

const createQuestion = () => {
    clearInterval(timerInterval);

  let secondsLeft = 19;
  const timerDisply = document.querySelector(".quiz-container .timer");
  timerDisply.classList.remove("danger");

  timerDisply.textContent = `Timer Left:20 Seconds`;
  
  timerInterval = setInterval(() => {
    timerDisply.textContent = `Time Left: ${secondsLeft.toString().padStart(2, 0)} Seconds`;
    secondsLeft--;

    if(secondsLeft < 5) {
        timerDisply.classList.add("danger")
    }

    if (secondsLeft <0) {
        clearInterval(timerInterval);
        displyNextQuestion();
    }
  },1000);

    options.innerHTML = "";
   question.innerHTML = `<span class= 'question-number'>${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
  
 quizData[questionNumber].options.forEach((o) => {
 const option = document.createElement("button");
 option.classList.add("option")
 option.innerHTML = o;
 option.addEventListener("click", (e) => {
    checkAnswer(e);
 })
 options.appendChild(option);
 });

};

const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
}


const displyQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2")
    resultHeading.innerHTML = ` You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

 for(let i = 0; i <MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");





    resultItem.innerHTML = `div class="question">Question${i + 1}: ${quizData[i].question}</div>
    <div class="user-answer">Your answer: ${UserAnswer || "Not answered"}</div>
    <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

   quizResult.appendChild(resultItem);

 }
};


 const retakeBtn = document.createElement("button");
 retakeBtn.classList.add("retake-btn");
 retakeBtn.innerHTML = 'Retake Quiz';
 retakeBtn.addEventListener("click",retakeQuiz)
 quizResult.appendChild(retakeBtn);


createQuestion();

const displyNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displyQuizResult();
        return;
    }




    questionNumber++;
    createQuestion();
};

nextBtn.addEventListener("click", displyNextQuestion)


























