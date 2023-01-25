// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

const questions = [
    { question: 'Arrays in Javascript can be used to store __________.', 
      answer: 'all of the above', 
      choices: ['numbers', 'booleans','strings', 'all of the above']
    },
    { question: 'Inside which HTML element do we put the javascript?', 
      answer: '<script>', 
      choices: ['<h1>','<js>','<script>','<head>']
    },
    { question: 'In the code -- setinterval(time(),1000) -- what is time()?', 
      answer: 'callback function', 
      choices: ['callback function', 'undefined','variable', 'all of the above']
    },
    { question: 'What syntax would call a function?', 
      answer: 'function()', 
      choices: ['var function', 'function', 'call function', 'function()']
    },
    { question: 'When did javascript first appear?', 
      answer: '1995', 
      choices: ['1995','Roaring twenties','2005','2000']
    },
    { question: 'What does DOM stand for?', 
      answer: 'Document Object Model', 
      choices: ['Do Overnight Modules', 'Document Object Model','Divas Obviously Model','Do Oo Mo']
    },
    { question: 'What is getItem commonly used for?', 
      answer: 'local storage', 
      choices: ['adding drama','local storage','online shopping','naming a variable']
    },
  ]

  const startBox = document.querySelector('#start-box');
  const questionBox = document.querySelector('#question-box');
  const scoreBox = document.querySelector('#score-box');
  const leaderboardBox = document.querySelector('#leaderboard-box');


function hideBoxes() {
  startBox.setAttribute("hidden", true);
  questionBox.setAttribute("hidden", true);
  scoreBox.setAttribute("hidden", true);
  leaderboardBox.setAttribute("hidden", true);

}
const resultsDiv = document.querySelector('#results-div');
const resultsOutput = document.querySelector('#results-output');

function hideResultsOutput () {
  resultsDiv.style.display ="none";
}

var countdownID;
var time;
var currentQuestion;
var score = 0;

document.querySelector("#start-button").addEventListener("click", startQuiz);

function startQuiz() {
  hideBoxes();

  questionBox.removeAttribute("hidden");

  currentQuestion = 0;
  
  displayQuestion();

  time = 60;

  countdownID = setInterval(countdown, 1000);

  displayTime();
}


function countdown(){
  time--;
  displayTime();
  if (time < 1) {
    endQuiz();
  }
}

const timeDisplay = document.querySelector("#time");


function displayTime() {
  timeDisplay.textContent = time;
}

function displayQuestion() {
  let question = questions[currentQuestion];
  let choices = question.choices;

  let h2QuestionElement = document.querySelector("#question-text");
  h2QuestionElement.textContent = question.question;

  for (let i = 0; i < choices.length; i++) {
  let choice = choices[i];
  let choiceButton = document.querySelector("#choice" + i)
  choiceButton.textContent = choice;
    
  }
}

document.querySelector("#quiz-choices").addEventListener("click", checkAnswer);

function choiceIsCorrect(choiceButton) {
  return choiceButton.textContent === questions[currentQuestion].answer;
}

function checkAnswer(eventObject) {

  let choiceButton = eventObject.target;

  resultsDiv.style.display = "block";

  if (choiceIsCorrect(choiceButton)) {
    resultsOutput.textContent = "Correct!";
    setTimeout(hideResultsOutput, 1000);
    score =  score + 5
  } 
  
  else {
    resultsOutput.textContent = "Incorrect!";
    setTimeout(hideResultsOutput, 1000);

  if (time >= 5) {
      time = time - 5;
      displayTime();
    } 
  else {
      time = 0;
      displayTime();
      endQuiz();
    }
  }
}
currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }

function endQuiz() {
    clearInterval(countdownID);
    hideBoxes();
    scoreBox.removeAttribute("hidden");
    score.textContent = time;
  }