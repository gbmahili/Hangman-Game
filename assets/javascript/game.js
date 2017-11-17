var words = ["baraka", "mahili", "clovis"];

//Get the current number of remaining guesses and convert to number
var remainingGuessCount = Number(document.getElementById("guess-count").innerText);

//Get the current number of winCount
var winCount = Number(document.getElementById("win-count").innerText);
//Get the current number of loss-coun
var lossCount = Number(document.getElementById("loss-count").innerText);

// Create the round of the game being played, it starts with 0, when there is a win or loss, it should be 1 and so on
var gameRound = winCount + lossCount;

// Update fields with dashes: Current Word and Words Already Guessed
var dashed = "";
for (var i = 0; i < words[gameRound].length; i++) {
    dashed = dashed + "_";
};

//Make the current-word and letters-guessed equals to the dashed, depending on how many characters are in the current word being guessed from the array
document.getElementById("current-word").innerText = dashed;
document.getElementById("letters-guessed").innerText = dashed;

//Get the letters already guessed
var lettersGuessed = document.getElementById("letters-guessed").innerText;

//Get the current word
var currentWord = document.getElementById("current-word").innerText;

//document.getElementById("letters-guessed").innerText = dashed;


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
        //Reset the gameCall the resetHangManGame();
        resetHangManGame();
    }

    if (remainingGuessCount === 0) {
        lossCount++;
        gameRound++;
        resetHangManGame();
        console.log("You just lost dude..bwahahaha...Number of loss:" + lossCount);
    };

    function resetHangManGame() {
        //Reset the current word
        currentWord = "______";
        //Reset the letters guessed
        lettersGuessed = "______";

        //Reset the counters
        countLettersGuessed = 0;
        remainingGuessCount = 6;
        //Updte the winCount, currentWord and lettersGuessed labels
        document.getElementById("win-count").innerText = winCount;
        document.getElementById("loss-count").innerText = lossCount;
        document.getElementById("current-word").innerText = currentWord;
        document.getElementById("letters-guessed").innerText = lettersGuessed;
        document.getElementById("guess-count").innerText = remainingGuessCount;
    }



    //Reset the letterIndexes array so that it doesn't keep adding to the array when we press a letter.
    letterIndexes = [];

    // #TO DO
    //If the word is madonna, display it like this when the game starts: _ _ _ _ _ _ _. 
    //(this should not be hard coded, find a way to loop through each name by gameRound, then display the dashes)



}//End of onkeyup