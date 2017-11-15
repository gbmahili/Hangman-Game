var words = ["Baraka", "Mahili"];

var remainingGuessCount = 6;

var remainingGuessCountDiv = document.getElementsByClassName("remaining-guess-count");

document.getElementById("current-word").innerHTML = words[1];

document.onkeyup = function (event) {
    remainingGuessCount = remainingGuessCount - 1;
    console.log(remainingGuessCountDiv);
}

//User presses a key, check if that key is in the first word of the array
//We decrease the remaining number of guesses by one

    //If it is there, 
            //we get the index of that letter in from the word

            //Then, we replace the CORRESPONDING index of the current-word id