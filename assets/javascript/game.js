var words = ["Baraka", "Mahili"];

//Get the current number of remaining guesses and convert to number
var remainingGuessCount = Number(document.getElementById("guess-count").innerText);
//Get the eleent with the current word
document.getElementById("current-word").innerHTML = words[1];

//On key up:
document.onkeyup = function (event) {
    //1. substract 1 from the remainingGuessCount
    remainingGuessCount--;
    console.log(remainingGuessCount);
    //2. Update the remaining guess count
    document.getElementById("guess-count").innerText = remainingGuessCount;
}

//User presses a key, check if that key is in the first word of the array
//We decrease the remaining number of guesses by one

    //If it is there, 
            //we get the index of that letter in from the word

            //Then, we replace the CORRESPONDING index of the current-word id