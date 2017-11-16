var words = ["baraka", "mahili"];

//Get the current number of remaining guesses and convert to number
var remainingGuessCount = Number(document.getElementById("guess-count").innerText);

//Get the current number of winCount
var winCount = Number(document.getElementById("win-count").innerText);

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
    if (remainingGuessCount >= 1) {

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

    //2. Loop through the first name in the words array only if WINS == 0
    for (var i = 0; i < words[0].length; i++) {
        //Check if the word has a letter that the user pressed
        if (words[0][i] === userLetter) {
            //If it does, push the index of that letter
            letterIndexes.push(i);
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
        if (lettersGuessed.indexOf(userLetter) === -1) {
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
    //Reset the letterIndexes array so that it doesn't keep adding to the array when we press a letter.
    letterIndexes = [];
}