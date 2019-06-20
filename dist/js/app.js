
/*
 * Create a list that holds all of your cards
 */

 let cards = [ 'fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'
            ]

/* get all DOM Elements and set game variables */


let isGameOver = false;
let didGameStart = false;

let timeText = document.getElementById('time-text');
let gradeSpan = document.getElementById('grade');
let movesText = document.getElementById('moves-text');
let starsList = document.getElementById('stars-list');
let resetBtn = document.getElementById('reset-btn');
let modal = document.getElementById('game_modal');
// let modal_instance = M.Modal.getInstance(modal);
let modal_reset_btn = document.getElementById('modal_reset_btn');

let time_results = document.getElementById('time_results');
let moves_results = document.getElementById('moves_results');
let grade_results = document.getElementById('grade_results');

let moves = 0;
let grade = 'Great!';



//use template literal to generate cards
function generateCard(card) {
    return `<li class="card" data-card="${card}"><l class="fa ${card}"></l></li>`;
} // function creates html for each of the cards listed above

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/* Timer */

//Creating Timer
let hours = 0;
let minutes = 0;
let seconds = 0;

//create timer variable
const self = this;
let timer;
let on = false;

self.startTimer = function(callback) {
    if(on === true) { console.log('timer is already on.'); return; }
    on = true;
    timer = setInterval(function(){
      seconds++;
      if(seconds === 60) {
        seconds = 0;
        minutes++;
        if(minutes === 60) {
          minutes = 0;
          hours++;
        }
      }
      if(callback && callback.constructor === Function) {
        callback();
      }
    }, 1000);
    console.log('timer started');
  }

  self.stopTimer = function() {
    clearInterval(timer);
    on = false;
    console.log('timer ended: ', self.getTimeString());
  }

  self.resetTimer = function() {
    self.stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  self.getTimeString = function() {
    let hour = hours > 9 ? String(hours) : '0' + String(hours);
    let minute = minutes > 9 ? String(minutes) : '0' + String(minutes);
    let second = seconds > 9 ? String(seconds) : '0' + String(seconds);
    let timeString = hour + ':' + minute + ':' + second;
    return timeString;
  }

  self.getTimeObj = function() {
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  
  self.getTimeObjFormatted = function() {
    return {
      hours: hours > 9 ? String(hours) : '0' + String(hours),
      minutes: minutes > 9 ? String(minutes) : '0' + String(minutes),
      seconds: seconds > 9 ? String(seconds) : '0' + String(seconds)
    };
  }
  
  self.getHours = function() {
    return hours;
  }

  self.getMinutes = function() {
    return minutes;
  }

  self.getSeconds = function() {
    return seconds;
  }


function clearDeck() {
  deck.innerHTML = '';
}

// update grade with every move
function updateGrade() {
    if (moves > 15) {
        if(grade !== "Average") {
            grade = "Average";
            gradeSpan.innerText = grade;
            //after updating the text remove a star
            starsList.removeChild(starsList.children[0]);
        }
    }
    if (moves > 30) {
        if (grade !== "Poor...") {
            grade = "Poor...";
            gradeSpan.innerText = grade;
            starsList.removeChild(starsList.children[0]);
        }
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 /* dynamically generate cards */
function initGame() {
    let deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
        //using .map to pass in cards to turn into html string
    });

    deck.innerHTML = cardHTML.join('');
    
}

initGame();


function activateCards() {
// flipping cards
let allCards = document.querySelectorAll('.card'); 
// only flipping one card at a time
let openCards = [];
let matches = [];

allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        if (didGameStart === false ) {
                // set timer on first click
                didGameStart = true;
                console.log('game started');   
                startTimer(function(){
                    timeText.innerText = getTimeString();
                  });
        }

        //disable clicking on the same card using open & show
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            
            //Check if cards match
            let firstCardType = openCards[0].dataset.card;
            //console.log(firstCardType);

            //Check if cards match + update moves counter
            if (openCards.length == 2) {
              moves++;
              movesText.innerText = moves;
              updateGrade();

                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.remove('open');
                    openCards[0].classList.remove('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.remove('open');
                    openCards[1].classList.remove('show');
                     

                    matches.push(card);
                    openCards = []; 
                    
                    const message = 'match found!';
                    console.log(message);
                    
                    if(matches.length === 8) {
                        gameOver();
                        return; 
                    }
                } 
                else {
                //If cards dont match - hide card
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open','show');
                            const message = 'no match.';
                            console.log(message);
                        });

                        openCards = []; 
                    }, 1000);
                }
            }
        }
    });
});
}
activateCards();



/* Starting the game */
function start() {
  initGame();
  activateCards();
  console.log('game started.');
}


/* Ending the game */
function gameOver() {
    stopTimer();
    console.log('game over');

 /*  Modal  */
    grade_results.innerText = grade;
    moves_results.innerText = moves;
    time_results.innerText = getTimeString();

    $('.modal').modal();
    $('.modal').modal('show');
  }
  


 /* Resets the game */
resetBtn.addEventListener('click', resetGame);
modal_reset_btn.addEventListener('click', resetGame);


function clearDeck() {
  deck.innerHTML = '';
}

function resetGame(e) {
  if(e && e.preventDefault) { e.preventDefault(); }

  // Regenerate cards
  initGame();
  activateCards();
  resetTimer();

  // reset game state
  moves = 0;
  grade = 'Great!';
  isGameOver = false;
  matches = [];
  didGameStart = false;

  // reset DOM state
  starsList.innerHTML = '';
  starsList.innerHTML += '<li><i class="fa fa-star"></i></li>';
  starsList.innerHTML += '<li><i class="fa fa-star"></i></li>';
  starsList.innerHTML += '<li><i class="fa fa-star"></i></li>';
  gradeSpan.innerText = grade;
  movesText.innerText = moves;
  timeText.innerText = getTimeString();
}

start();