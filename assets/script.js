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
  {
    question: 'Arrays in Javascript can be used to store __________.',
    answer: 'all of the above',
    choices: ['numbers', 'booleans', 'strings', 'all of the above']
  },
  {
    question: 'Inside which HTML element do we put the javascript?',
    answer: '<script>',
    choices: ['<h1>', '<js>', '<script>', '<head>']
  },
  {
    question: 'In the code -- setinterval(time(),1000) -- what is time()?',
    answer: 'callback function',
    choices: ['callback function', 'undefined', 'variable', 'all of the above']
  },
  {
    question: 'What syntax would call a function?',
    answer: 'function()',
    choices: ['var function', 'function', 'call function', 'function()']
  },
  {
    question: 'When did javascript first appear?',
    answer: '1995',
    choices: ['1995', 'Roaring twenties', '2005', '2000']
  },
  {
    question: 'What does DOM stand for?',
    answer: 'Document Object Model',
    choices: ['Do Overnight Modules', 'Document Object Model', 'Divas Obviously Model', 'Do Oo Mo']
  },
  {
    question: 'What is getItem commonly used for?',
    answer: 'local storage',
    choices: ['adding drama', 'local storage', 'online shopping', 'naming a variable']
  },
]


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');



function startQuiz() {
 
  var startScreenEl = document.getElementById('start-screen');
  startScreenEl.setAttribute('class', 'hide');

  
  questionsEl.removeAttribute('class');


  timerId = setInterval(clockTick, 1000);

 
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById('question-title');
  titleEl.textContent = currentQuestion.title;

  choicesEl.innerHTML = '';


  for (var i = 0; i < currentQuestion.choices.length; i++) {
   
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;


    choicesEl.appendChild(choiceNode);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

 
  if (!buttonEl.matches('.choice')) {
    return;
  }


  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
  
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = 'Wrong!';
  } else {
 
    feedbackEl.textContent = 'Correct!';
  }


  feedbackEl.setAttribute('class', 'feedback');
  setTimeout(function () {
    feedbackEl.setAttribute('class', 'feedback hide');
  }, 1000);

 
  currentQuestionIndex++;


  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {

  clearInterval(timerId);


  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');


  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;


  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {

  time--;
  timerEl.textContent = time;


  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {

  var initials = initialsEl.value.trim();


  if (initials !== '') {
  
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

   
    var newScore = {
      score: time,
      initials: initials,
    };

 
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscores.html';
  }
}

function checkForEnter(event) {

  if (event.key === 'Enter') {
    saveHighscore();
  }
}
function printHighscores() {

  var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i += 1) {
   
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;

    
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;


printHighscores();

submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;


choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;


