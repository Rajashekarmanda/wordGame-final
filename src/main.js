import { apiCallFetchData, apiCallValidWord } from "./api.js";

let loaderContainer = document.getElementById("loaderContainer");
let inputContainer = document.querySelectorAll(".input-letter");
let wishElement = document.getElementById("wishTag")
let onlineButtonElement = document.getElementById("onlineButton")

let currentGuessWord = "";
let currentRow = 0;
let loadLoader = true;
let answerWordsLength = 5;
let correctWord;;

function startGame() {

  function addingLettersToFields(letter) {
    
    loadLoader = false;

    loaderToggler(loadLoader);

    if (currentGuessWord.length < answerWordsLength) {
      currentGuessWord += letter;
    } else {
      currentGuessWord =
        currentGuessWord.substring(0, currentGuessWord.length - 1) + letter;
    }

    inputContainer[
      currentRow * answerWordsLength + currentGuessWord.length - 1
    ].innerHTML = letter;
  }

  function validateEachLetter(eachWord) {
    return /^[a-zA-Z]$/.test(eachWord);
  }

  function eraseLastWord() {
    currentGuessWord = currentGuessWord.substring(
      0,
      currentGuessWord.length - 1
    );

    inputContainer[
      answerWordsLength * currentRow + currentGuessWord.length
    ].innerHTML = "";
  }

  function loaderToggler(loadLoader) {
    if (!loadLoader) {
      loaderContainer.classList.add("loader-toggle-class");
    } else {
      loaderContainer.classList.remove("loader-toggle-class");
    }
  }

  function checkingAttempts() {
    console.log("enter clicked");

    apiCallFetchData().then(function (fetchWord) {
      console.log(fetchWord.toUpperCase());

      correctWord = fetchWord.toUpperCase();

      apiCallValidWord(currentGuessWord).then(function (validResult) {
        console.log(validResult + " not a valid word / valid");

        if (!validResult && currentGuessWord !== correctWord) {
          for (let i = 0; i < currentGuessWord.length; i++) {
            inputContainer[
              currentRow * currentGuessWord.length + i
            ].classList.add("invalid-word-class");
          }
        } else {
          
          let count = 0

          for (let i = 0; i < currentGuessWord.length; i++) {

            if (currentGuessWord[i] === correctWord[i]) {
              inputContainer[
                currentRow * currentGuessWord.length + i
              ].classList.add("correct-word-class");

              count++

            } else {

              inputContainer[

                currentRow * currentGuessWord.length + i

              ].classList.add("close-word-class");

            }

          }

          if (count === 5) {

            // alert("You win congratulation's")

            wishElement.textContent = "** Congratulation's your win **"

            loadLoader = false

            loaderToggler(loadLoader)

          }

          currentGuessWord = "";

          currentRow++;
        }

      });

    });

  }

  document.addEventListener("keydown", function (event) {

    let keyPressed = event.key;

    if (keyPressed === "Enter") {

      loadLoader = true;

      loaderToggler(loadLoader);

      checkingAttempts();

    } else if (keyPressed === "Backspace") {

      eraseLastWord();

    } else if (validateEachLetter(keyPressed)) {

      addingLettersToFields(keyPressed.toUpperCase());

    } else {
      //
    }

  });

}

if (navigator.onLine) {

  onlineButtonElement.textContent = "online"

  onlineButtonElement.setAttribute("class","online-button")

}else {

  onlineButtonElement.textContent = "offline"

  onlineButtonElement.setAttribute("class","offline-button")
}

startGame();


