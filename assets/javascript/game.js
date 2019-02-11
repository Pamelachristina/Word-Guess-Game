/* Bowie Hangman Pseudo Code
1. User Presses any key to start.
2. Computer chooses a random David Bowie song title.
3. User tries to guess song title by pressing keys to spell out word.
4. Each time user guesses a word, the computer keeps track of how many guesses were attempted.
5. The computer also reveals a piece of the hangman with every correct guess.
6. The computer also reveals the letters that have already been attempted. 


/* INITAL SETUP
 ----------------------------------------------------------------------------------------------------------------*/

//Array of bowie objects each with song titles (name), image1 (), image2 ()//


var bowieArray = [
    {
        title: "Changes",
        image1: "assets/images/guesssong.jpg",
        image2: "assets/images/changes.jpg"
    },

    {
        title: "Under Pressure",
        image1: "assets/images/guesssong.jpg",
        image2: "assets/images/underPressure.jpg"

    },

    {
        title: "Space Oddity",
        image1: "assets/images/guesssong.jpg" ,
        image2: "assets/images/spaceOddity.jpg"

    },

    {
        title: "Rebel Rebel",
        image1: "assets/images/guesssong.jpg",
        image2: "assets/images/rebelRebel.jpg"

    },

    {
        title: "Ziggy Stardust",
        image1: "assets/images/guesssong.jpg",
        image2: "assets/images/ziggy.jpg"

    },

    {
        title: "Life On Mars",
        image1: "assets/images/guesssong.jpg",
        image2: "assets/images/lifeOnMars.jpg"

    }

]


//gameStatus is my start/stop controller between questions    
var gameStatus = false;

//Generate randomNumber
var songObj = bowieArray[Math.floor(Math.random() * bowieArray.length)];


console.log(songObj);
//Apply randomNumber to obtain random word (answer), and related images.
var bowie = songObj.title;
var bowieImage1 = songObj.image1
var bowieImage2 = songObj.image2

//Establish lettersRemaining (for win);
var lettersRemaining = bowie.length;

//Set up the answer array to store word (answer) as an array for indexing.
var answerArray = []; 


//Convert word answer into an array.
for (var i = 0; i < bowie.length; i++) {
    //If an answer has more than one word, use + as a separator. A space will be displayed when currentWord is displayed. 
    if (bowie[i] === "+") {
        answerArray[i] = "&nbsp;";
    } else {
        //Replace word answer with "_"s
        answerArray[i] = "_";
    }
}



/* LISTENERS
 ----------------------------------------------------------------------------------------------------------------*/

 //Use key events to listen for the letters that your players will type.
document.addEventListener("keyup", function(event){
    //If gameStatus (or game round) has been initialized, then proceed to playing.
    // if(gameStatus) {
        letterCheck(event);
    // } else {
    //     //If gameStatus (or game round) has completed, re-initialize (or reset) the game.
    //     init();
    // }
});

//Setup alphabet array for letter checking
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {
    //If letter key is press, check if the letter pressed is in the answer.
    if (alphabetArray.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}

//Check whether the guess is correct
var winScore = 0;
function correctGuessCheck(guess) {
    if (bowie.toLowerCase() .indexOf(guess.key.toLowerCase()) > -1) {
        //if guess is correct, run correctGuess function.
        correctGuess(guess);
    } else {
        //If guess is incorrect, run incorrectGuess function.
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        //If the correctGuess doesn't exist in the answerArray, run addCorrectLetter function.
        addCorrectLetter(guess);
    }
}

    function addCorrectLetter(guess) {
        for (var j = 0; j < bowie.length; j++) {
            //If guess matches an existing letter in the answer.
            if (guess.key === bowie[j]) {
            //Push correct letter to answerArray as upperCase.
            answerArray[j] = guess.key.toUpperCase();
            displayCurrentWord();
            //Reduce letters remaining for win by one.
            lettersRemaining--;
            //If letters left has reached 0, user wins. 
            if (lettersRemaining === 0) {
                //Add 1 to win score.
                winScore++;
                //Display new win score.
                displayWins();
                //Reveal the album cover image.
                changeImage();
                //Turn correct answer green.
                addCorrect();
                //display currentWord with new green font.
                displayCurrentWord();
            }
        }
    }
}



//Set up an incorrect answer array
var incorrectGuessesMade = [];
//Establish the number of guesses.
var guessesLeft = 9;

function incorrectGuess(guess) {
    if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        //If the inCorrectGuess doesn't exist in the answerArray, run addIncorrectLetter function.
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    //Push incorrect guess into the incorrectGuessesMade array
    incorrectGuessesMade.push(guess.key.toUpperCase());
    //Inform user of incorrectGuessesMade
    displayGuessesMade();
    //Lower guessesLeft by 1
    guessesLeft--;
    //Inform user of guessesLeft
    displayGuessesLeft();
    if (guessesLeft === 0) {
        //If guesses left reaches equals 0, then Game Over.
        changeImage();
        //Display corrent answer.
        displayAnswer();
    }
}

/* HANDLERS
----------------------------------------------------------------------------------------------------------------*/

//Displays the number of wins user has obtains.
function displayWins() {
    var winsDisplay = document.querySelector("#winsDisplay");
    winsDisplay.textContent = winScore;
}

//Displays the letters the user has guessed.
function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

//Displays how many user guesses are left.
function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}

//Displays current solve status of answerArray.
function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}

//Displays guess song title image when game initalizes.
function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = bowieImage1;
}

//Reveals song title regardless of whether user was able to solve. 
function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = bowieImage2;
    gameStatus = false;
}

//Reveals answer if user is unable to solve.
function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = bowie.toUpperCase();
}

//Turns current word green (to indicate correctness)
function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

//Removes green color of current word (for re-initalizing purposes)
function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}

/* Initalize (or re-initialize) the game.
----------------------------------------------------------------------------------------------------------------*/
function init() {
    //Changes gameStatus to ready.
    gameStatus = true;
    


//Generate randomNumber
var songObj = bowieArray[Math.floor(Math.random() * bowieArray.length)];


console.log(songObj);
//Apply randomNumber to obtain random word (answer), and related images.
var bowie = songObj.title;
var bowieImage1 = songObj.image1
var bowieImage2 = songObj.image2

//Establish lettersRemaining (for win);
var lettersRemaining = bowie.length;

//Set up the answer array to store word (answer) as an array for indexing.
var answerArray = []; 


 //Re-establish lettersRemaining (for win)
 lettersRemaining = bowie.length;



 //Re-establish guessesLeft for user.
 guessesLeft = 9;
 displayGuessesLeft()

 //Re-establish guessesMade array.
 incorrectGuessesMade = [];
 displayGuessesMade()
 
 //Display current word.
 displayCurrentWord();

  //Play "Bowie" audio.
  document.getElementById('changes').play();


  //Empty revealedAnswer display if user was unsuccessful previously.
  revealedAnswerDisplay.textContent = "";


}