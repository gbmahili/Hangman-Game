/**
 * Users will guess the word in a descending order from the array words.
 * They will be assigned the number of guesses based on the number of characters in the word being guessed
 * Everytime they fail to guess a letter, remaining guesses will drop
 * Each word has different number of guess based on its length
 * If the guess the correct word, they will get a +1 on they win, otherwise, they will get a +1 on the losses
 */

var words = ["seattle", "dallas", "windsor", "lexington"];

//Get the current number of winCount
var winCount = Number(document.getElementById("win-count").innerText);
//Get the current number of loss-coun
var lossCount = Number(document.getElementById("loss-count").innerText);

// Create the round of the game being played, it starts with 0, when there is a win or loss, it should be 1 and so on
var gameRound = winCount + lossCount;

// Update fields with dashes: Current Word and Words Already Guessed

//We get the length of the word to guess using the gameRound number
var wordToGuessLength = words[gameRound].length;
//We then set the remainingGuessCount to the samevalue based on the word to guess...if we have pity, we can add 4 or 5 to allow users to guess more
var remainingGuessCount = wordToGuessLength;//add + 5 guess to each one if you decide to be good to the player
//We then update the guess-count field with the number of guesses remaing
document.getElementById("guess-count").innerText = remainingGuessCount;

//Create Dashes equal to the lenght of guess to guess. If the word has four letters, then create 4 dashes
//#First we instantiate the dashed variable
var dashed = "";
//#We then loop through the wordToGuess then add an underscore to the dashed variable
createDashes();//This function generates dashes, it has been created at the bottom of this script

//Make the current-word and letters-guessed equals to the dashed, depending on how many characters are in the current word being guessed from the array
document.getElementById("current-word").innerText = dashed;
document.getElementById("letters-guessed").innerText = dashed;

//Get the letters already guessed
var lettersGuessed = document.getElementById("letters-guessed").innerText;

//Get the current word
var currentWord = document.getElementById("current-word").innerText;


var letterIndexes = [];
//Store the userLetter
var userLetter;
var countLettersGuessed = 0;

//On key up:
document.onkeyup = function (event) {

    //1. Check if the remainingGuessCount is greater or equal to 1, then substract if true
    if (remainingGuessCount >= 1 && words.length > gameRound) {

        //If true: Update the userLetter 
        userLetter = event.key;

        //Then check if the whatever letter the user typed in already exist in the lettersGuessed:
        if ((lettersGuessed.indexOf(userLetter) === -1)) {
            //If not, Reduce the remaining count
            remainingGuessCount--;
        }

        //Update the remaining guess count
        document.getElementById("guess-count").innerText = remainingGuessCount;
    }

    //2. Loop through the first name in the words array
    if (words.length > gameRound) {

        for (var i = 0; i < words[gameRound].length; i++) {
            //Check if the word has a letter that the user pressed
            if (words[gameRound][i] === userLetter) {
                //If it does, push the index of that letter
                letterIndexes.push(i);

            }
        }
    }

    //Create a function to replace a string at a certain index:
    String.prototype.setCharAt = function (idx, chr) {
        if (idx > this.length - 1) {
            return this.toString();
        } else {
            return this.substr(0, idx) + chr + this.substr(idx + 1);
        }
    };

    //We take the letters guesses, replaced the character at countLetterGuesses (starting from index 0) with what the user typed in
    if (countLettersGuessed >= 0) {
        //Check if the letter already exist in the string: Only decrease the count of letters guess and update the letter guessed if it is not yet there.
        if (lettersGuessed.indexOf(userLetter) === -1 && words.length > gameRound) {
            //Change the character of the letters guessed at the 
            lettersGuessed = lettersGuessed.setCharAt(countLettersGuessed, userLetter);
            countLettersGuessed++;
            document.getElementById("letters-guessed").innerText = lettersGuessed;
        }
    }

    //We then loop through all the indexes and add those letters in the current word at each position from the indexes array    
    for (var i = 0; i < letterIndexes.length; i++) {
        currentWord = currentWord.setCharAt(letterIndexes[i], userLetter);
        document.getElementById("current-word").innerText = currentWord;

    }


    //Update Win
    if (words[gameRound] == currentWord) {
        //Increment the winCount
        winCount++;
        gameRound++;
        //Check if the current word to guess is the last one in the array words
        if(words[gameRound-1] !== words[words.length -1]){
            //If so, don't try to generate another length
            wordToGuessLength = words[gameRound].length;
        }
        
        //Reset the gameCall the resetHangManGame();
        resetHangManGame();
    }

    if (remainingGuessCount === 0) {
        lossCount++;
        gameRound++;
        //Check if the current word to guess is the last one in the array words
        if (words[gameRound - 1] !== words[words.length - 1]) {
            //If so, don't try to generate another length
            wordToGuessLength = words[gameRound].length;
        }
        resetHangManGame();
    };

    function resetHangManGame() {
        //Reset the dashed value
        dashed = "";
        //Create new dashes based on the new word being guessed
        createDashes();//Generates dashes

        //Reset the current word
        currentWord = dashed;
        //Reset the letters guessed
        lettersGuessed = dashed;
        //Reset the counters
        countLettersGuessed = 0;
        remainingGuessCount = wordToGuessLength;
        //Updte the winCount, currentWord and lettersGuessed labels
        document.getElementById("win-count").innerText = winCount;
        document.getElementById("loss-count").innerText = lossCount;
        document.getElementById("current-word").innerText = currentWord;
        document.getElementById("letters-guessed").innerText = lettersGuessed;
        document.getElementById("guess-count").innerText = wordToGuessLength;
    }
    //Reset the letterIndexes array so that it doesn't keep adding to the array when we press a letter.
    letterIndexes = [];

};//End of onkeyup

//Create Dashes
function createDashes() {
    for (var i = 0; i < wordToGuessLength; i++) {
        dashed += "_"; //This can always be written like: dashed = dashed + "_";
    };
};
