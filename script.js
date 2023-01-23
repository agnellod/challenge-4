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
var viewhighscoresEl = document.getElementById("view-high-scores");
var box1El = document.getElementById("box1");
var questionboxesEl = document.getElementById("question-boxes");
var questionEl = document.getElementById("question");
var answerbuttonsEl = document.getElementById("answer-buttons");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var endboxEL = document.getElementById("end-box");
var scorebannerEl = document.getElementById("score-banner");
var initialsformEl = document.getElementById("initials-form");
var timerEl = document.querySelector("#timer");
var startbtn = document.getElementById("start-game");

var questions = [
    { q: 'Arrays in Javascript can be used to store __________.', 
      a: 'all of the above', 
      choices: ['numbers', 'booleans','strings', 'all of the above']
    },
    { q: 'Inside which HTML element do we put the javascript?', 
      a: '<script>', 
      choices: ['<h1>','<js>','<script>','<head>']
    },
    { q: 'In the code -- setinterval(time(),1000) -- what is time()?', 
      a: 'callback function', 
      choices: ['callback function', 'undefined','variable', 'all of the above']
    },
    { q: 'What syntax would call a function?', 
      a: 'function()', 
      choices: ['var function', 'function', 'call function', 'function()']
    },
    { q: 'When did javascript first appear?', 
      a: '1995', 
      choices: ['1995','Roaring twenties','2005','2000']
    },
    { q: 'What does DOM stand for?', 
      a: 'Document Object Model', 
      choices: ['Do Overnight Modules', 'Document Object Model','Divas Obviously Model','Do Oo Mo']
    },
    { q: 'What is getItem commonly used for?', 
      a: 'local storage', 
      choices: ['adding drama','local storage','online shopping','naming a variable']
    },
  ];
  var count = 60
  var countdown;


  function startGame() {
    box1El.setAttribute("class", "hide");
    questionboxesEl.removeAttribute("class", "hide");
    
    for (let index = 0; index < questions.length; index++) {
        console.log(questions);
    questionEl.append(questions[0].q);
    for (let c = 0; c < questions(choices); c++) {
    var choicebtn = document.createElement("button");
    choicebtn.setAttribute('numbers', 'booleans', );
    answerbuttonsEl.append(questions[index].choices[c]);
        
        
    }
    }
  }


startbtn.addEventListener("click", startGame);