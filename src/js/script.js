import "regenerator-runtime/runtime.js";
import { getWord } from "./fecth";
/******************************************************************************/
const btnContainer = document.querySelector(".btn-container");
const textContainer = document.querySelector(".text-container");
const gameBoard = document.querySelector(".game-board");
const resetBtn = document.querySelector(".reset-game-btn");
const hangMan = document.getElementById("hangman");
const contextHangMan = hangMan.getContext("2d");
const btnContainerShowWord = document.querySelector(".container-btn-show-btn");
const containerHangMan = document.querySelector(".container-hangman");
const definitionPara = document.querySelector(".definition-para");
/******************************************************************************/
const draws = [
  "gallows",
  "head",
  "body",
  "rightArm",
  "leftArm",
  "rightLeg",
  "leftLeg",
];

let actualLetter = "";
let correctWord = [];
let chances = 0;
let randomWord = "";
/******************************************************************************/

const createAllLetters = () =>
  Array.from(
    {
      length: ("z".charCodeAt(0) - "a".charCodeAt(0)) / 1 + 1,
    },
    (_, i) => "a".charCodeAt(0) + i * 1
  ).map((x) => String.fromCharCode(x));

const clearHangMan = () =>
  contextHangMan.clearRect(0, 0, hangMan.width, hangMan.height);

const createAllLetterBtn = (arr) => {
  arr.map((x) => {
    const lettersButton = document.createElement("button");
    lettersButton.innerText = x;
    lettersButton.className = "buttons-letters";
    btnContainer.appendChild(lettersButton);
  });
};
//Create the buttons with all abc letters
createAllLetterBtn(createAllLetters());

const createLines = (randomWord_) => {
  for (let i = 0; i < randomWord_.length; i++) {
    const createText = document.createElement("p");
    createText.className = "lines";
    textContainer.appendChild(createText);
  }
};
//Find the index of the letter in the word
const findIndexLetter = (word, letter) => {
  const indexes = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) indexes.push(i);
  }
  return indexes;
};

const disableElement = (el) => el.setAttribute("disabled", true);
const removeAtrElement = (el) => el.removeAttribute("disabled");

const updateLines = (val, letter) => {
  document.querySelectorAll(".lines")[val].innerText = letter;
  document.querySelectorAll(".lines")[val].style["border-bottom"] = "none";
};

const allButtonLetters = document.querySelectorAll(".buttons-letters");

const winnerAlert = () => {
  gameBoard.style.pointerEvents = "none";
  containerHangMan.innerHTML = "";
  const headerResult = document.createElement("h1");
  headerResult.className = "result";
  headerResult.innerText = "Winner!";
  containerHangMan.appendChild(headerResult);
};
const startGame = async () => {
  definitionPara.textContent = '...Loading word';
  allButtonLetters.forEach((x) => disableElement(x));
  const { word, definition } = await getWord();
  randomWord = word.toLowerCase();
  definitionPara.textContent = `def: ${definition.toLowerCase()}`;
  allButtonLetters.forEach((x) => removeAtrElement(x));
  createLines(randomWord);
};

const drawHangMan = (part) => {
  switch (part) {
    case "gallows":
      contextHangMan.strokeStyle = "white";
      contextHangMan.lineWidth = 10;
      contextHangMan.lineCap = "round";
      contextHangMan.lineJoin = "round";
      contextHangMan.beginPath();
      contextHangMan.moveTo(175, 225);
      contextHangMan.lineTo(5, 225);
      contextHangMan.moveTo(15, 225);
      contextHangMan.lineTo(15, 5);
      contextHangMan.lineTo(100, 5);
      contextHangMan.lineTo(100, 20);
      contextHangMan.stroke();
      break;

    case "head":
      contextHangMan.lineWidth = 5;
      contextHangMan.beginPath();
      contextHangMan.arc(100, 50, 25, 0, Math.PI * 2, true);
      contextHangMan.closePath();
      contextHangMan.stroke();
      break;

    case "body":
      contextHangMan.beginPath();
      contextHangMan.moveTo(100, 75);
      contextHangMan.lineTo(100, 140);
      contextHangMan.stroke();
      break;

    case "rightArm":
      contextHangMan.beginPath();
      contextHangMan.moveTo(100, 85);
      contextHangMan.lineTo(60, 100);
      contextHangMan.stroke();
      break;

    case "leftArm":
      contextHangMan.beginPath();
      contextHangMan.moveTo(100, 85);
      contextHangMan.lineTo(140, 100);
      contextHangMan.stroke();
      break;

    case "rightLeg":
      contextHangMan.beginPath();
      contextHangMan.moveTo(100, 140);
      contextHangMan.lineTo(80, 190);
      contextHangMan.stroke();
      break;
    case "leftLeg":
      contextHangMan.beginPath();
      contextHangMan.moveTo(100, 140);
      contextHangMan.lineTo(125, 190);
      contextHangMan.stroke();
      break;
  }
};

const clearVar = () => {
  containerHangMan.innerHTML = "";
  btnContainerShowWord.innerHTML = "";
  definitionPara.textContent = "";
  chances = 0;
  correctWord = [];
  gameBoard.removeAttribute("style");
  document.querySelectorAll(".lines").forEach((x) => (x.innerText = ""));
};

const resetGame = () => {
  clearVar();
  clearHangMan();
  disableElement(resetBtn);

  allButtonLetters.forEach((x) => removeAtrElement(x));
  document
    .querySelectorAll(".lines")
    .forEach((x) => textContainer.removeChild(x));
  //Add again the hang man canvas
  containerHangMan.appendChild(hangMan);

  startGame();
};

/******************************************************************************/

allButtonLetters.forEach((el) =>
  el.addEventListener("click", () => {
    actualLetter = el.innerText;
    disableElement(el);
    removeAtrElement(resetBtn);
    if (findIndexLetter(randomWord, actualLetter).length !== 0) {
      findIndexLetter(randomWord, actualLetter).map((el) => {
        correctWord[el] = actualLetter;
        updateLines(el, actualLetter);
      });

      if (correctWord.join("") === randomWord) {
        winnerAlert();
      }
    } else {
      drawHangMan(draws[chances++]);
      if (chances > 6) {
        gameBoard.style.pointerEvents = "none";
        const btnShowWord = document.createElement("button");
        btnShowWord.className = "btn-show-word";
        btnShowWord.innerText = "show word";
        btnContainerShowWord.appendChild(btnShowWord);
        const btnShowWords = document.querySelector(".btn-show-word");
        btnShowWords.addEventListener("click", () => {
          //randomWord
          for (let i = 0; i < randomWord.length; i++) {
            updateLines(i, randomWord[i]);
          }
          definitionPara.textContent = "";
          disableElement(btnShowWord);
        });
      }
    }
  })
);

resetBtn.addEventListener("click", resetGame);

/******************************************************************************/
startGame();
/******************************************************************************/
