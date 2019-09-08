/*****************
 Global Variables
 ****************/

const overlay = document.getElementById('overlay');
const startButton = document.getElementsByClassName('btn__reset')[0];
const qwerty = document.getElementById('qwerty');
const keys = document.querySelectorAll('#qwerty button');
const phraseUl = document.getElementById('phrase');
const hearts = document.querySelectorAll('.tries');

let won = 0;
let lost = 0;

let currentPhrase;
let missed = 0;
let phrase;

/*****************
 Event Listeners
 ****************/
startButton.addEventListener('click', e => {
  if (!e.target.getAttribute('disabled')) {
    let phrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phrase);
    overlay.classList.add('fadeOut');
    overlay.classList.remove('start', 'lose', 'win', 'fadeIn');
    // setTimeout(() => {
    //   overlay.classList.add('hidden');
    // }, 1000)
  }
});

qwerty.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    handleInteraction(e.target);
  }
});



/*****************
 Phrases
 ****************/
const phrases = [
  "A wizard is never late",
  "You shall not pass",
  "Not the beard",
  "This is no mere ranger",
  "All you have to decide is what to do with the time that is given to you",
  "May it be a light for you in darkplaces when all other lights go out",
  "When in doubt follow your nose",
  "Fly you fools",
  "Nobody tosses a dwarf",
  "Never trust an elf",
  "Even the smallest person can change the course of the future",
  "Build me an army worthy of Mordor",
  "And he lived happily ever after unto the end of his days",
  "One does not simply walk into Mordor",
  "Fool of a Took",
  "Throw yourself in next time and rid us of your stupidity",
  "What about second breakfast",
  "One ring to rule them all",
  "I made a promise Mr Frodo",
  "All that glitters is not gold",
  "The road goes ever on"
];

const usedPhrases = [];

function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length);
}

/**************************************************************************************
 *  Takes in an array of phrases.
 *  Checks if all phrases have been used and clears used array if needed.
 *  Generates a random number not already in the used array, then pushes to used array
 *  returns random phrase split into letters and spaces  
 *************************************************************************************/

function getRandomPhraseAsArray(array) {
  // if all phrases have been used, resets the usedPhrases array to empty
  if (array.length === usedPhrases.length) {
    usedPhrases.length = 0;
  }
  // gets a random number.  If num is in the used array, keeps getting new number
  let num = getRandomNumber(array);
  while (usedPhrases.includes(num)) {
    num = getRandomNumber(array);
  }
  // one a non-used number is found, pushes it to the used array
  usedPhrases.push(num);
  currentPhrase = array[num].toLowerCase();
  return array[num].split('');

}



/***************************************************************
 *  Takes in a phrase as an array of letters and spaces.
 *  Creates list items and appends to phrase Ul
 **************************************************************/
function addPhraseToDisplay(phrase) {
  let word = "<div>";
  phrase.forEach((letter, index) => {
    if (index !== 0 && letter === ' ') {
      word += "</div>";
      phraseUl.innerHTML += word;
      word = "<div>";
    }


    if (letter !== " ") {
      word += `<li class="letter">${letter}</li>`;
    } else {
      word += `<li class="space">${letter}</li>`;
    }
    if (index === phrase.length - 1) {
      word += "</div>";
      phraseUl.innerHTML += word;
    }

  });
}

// function addPhraseToDisplay(phrase) {
//   phrase.forEach(letter => {
//     const li = document.createElement('li');
//     if (letter !== " ") {
//       li.innerText = letter;
//       li.className = "letter";
//     } else {
//       li.className = "space"
//     }
//     phraseUl.appendChild(li);
//   })
// }


/***************************************************************
 *  Takes in a letter and returns true/false
 **************************************************************/
function checkLetter(letter) {
  return currentPhrase.includes(letter);
}

/***************************************************************
 *  Takes in a letter and loops over all letters in display
 *  Adds "show" class to matching letters
 **************************************************************/
function showLetter(letter) {
  const phraseLetters = document.querySelectorAll('#phrase li');
  phraseLetters.forEach(item => {
    if (item.innerText.toLowerCase() === letter) {
      item.classList.add('show');
    }
  });
}

/***************************************************************
 *  No parameters.  Checks if length of li with class letter 
 *  equals length of li with class show 
 **************************************************************/
function checkForWin() {
  return document.querySelectorAll('li.letter').length === document.querySelectorAll('li.show').length;
}

/***************************************************************
 *  Changes life heart to lost heart 
 *  Increases missed by 1
 *  If missed === 5, game over - false
 ***************************************************************/
function removeLife() {
  const heart = hearts[missed];
  heart.firstElementChild.className = "heart";
  heart.firstElementChild.setAttribute('src', 'images/lostHeart.png');


  missed++;

  if (missed === 5) {
    startButton.setAttribute('disabled', true);
    gameOver(false);
  }
}

/***************************************************************
 *  Takes in true/false.  true shows win, false shows loss
 **************************************************************/
function gameOver(outcome) {
  if (outcome) {
    won++;
    overlay.classList.add('win');
    document.getElementsByClassName('title')[0].innerText = "Woohoo!  You won!";
    startButton.innerText = "Play Again?";
  } else {
    lost++;
    overlay.classList.add('lose');
    document.getElementsByClassName('title')[0].innerText = "Sorry.  You lost";
    startButton.innerText = "Try Again?";
  }

  overlay.classList.remove('fadeOut');
  overlay.classList.add('fadeIn');

  // setTimeout(() => {
  //   overlay.classList.remove('visuallyHidden');
  // }, 20);
  setTimeout(() => {
    reset();
    startButton.removeAttribute('disabled');
  }, 2000);
  updateWinLoss();

  // setTimeout(() => {

  //   startButton.removeAttribute('disabled');
  // }, 4000);

}


/*****************************************************************
 *  Takes in the keyboard button that was clicked and disables it
 *  Checks to see if key's letter is in phrase
 *  If true - calls methods to display letter and check for win
 *  If false - calls remove life method
 ****************************************************************/
function handleInteraction(button) {
  button.setAttribute('disabled', true);

  if (checkLetter(button.innerText)) {
    button.className = 'chosen';
    showLetter(button.innerText);
    if (checkForWin()) {
      startButton.setAttribute('disabled', true);
      gameOver(true);
    }
  } else {
    button.className = 'wrong';
    removeLife();
  }
}

/***************************************************************
 *  Resets all game aspects that have changed so a new game
 *  can be started.
 **************************************************************/
function reset() {
  // reset keys = no class no disabled
  keys.forEach(key => {
    key.removeAttribute('disabled');
    key.removeAttribute('class');
  });
  // reset hearts
  hearts.forEach(heart => {
    heart.firstElementChild.setAttribute('src', 'images/lifeHeart_new.png');
    heart.firstElementChild.className = "";
  })
  // reset missed
  missed = 0;
  // remove old phrase
  phraseUl.innerHTML = '<ul></ul>';
}

/***************************************************************
 *  Adds the Won/Loss tracker to the scoreboard div
 *  Function changes the scoring text after each game is done
 **************************************************************/
let scoresHTML = `
      <h3>Won: <span id="won">${won}</span></h3><h3>Lost: <span id="lost">${lost}</span></h3>`;
const scoreboard = document.getElementById('scoreboard');
const scoreDiv = document.createElement('div');
scoreDiv.id = "scores";
scoreDiv.innerHTML = scoresHTML;
scoreboard.append(scoreDiv);

function updateWinLoss() {
  document.getElementById('won').innerText = won;
  document.getElementById('lost').innerText = lost;
}
