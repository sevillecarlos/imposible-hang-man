const btnContainer = document.querySelector(".btn-container");
const textContainer = document.querySelector(".text-container");
const gameBoard = document.querySelector(".game-board");
const resetBtn = document.querySelector(".reset-game-btn");
const hangMan = document.getElementById("hangman");
const contextHangMan = hangMan.getContext("2d");
const btnContainerGame = document.querySelector(".btn-game-container");
const btnContainerShowWord = document.querySelector(".container-btn-show-btn");
const containerHangMan = document.querySelector(".container-hangman");



const words = [
  "_",
  "gato",
  "libelula",
  "armadillo",
  "prensa",
  "papelote",
  "popote",
  "sandia",
  "perro",
  "pizarra",
  "pupusa",
];
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
let randomPosition = 0;
let randomWord = "";

startGame();

function createAllLetters() {
  return Array.from(
    {
      length: ("z".charCodeAt(0) - "a".charCodeAt(0)) / 1 + 1,
    },
    (_, i) => "a".charCodeAt(0) + i * 1
  ).map((x) => String.fromCharCode(x));
}

function clearHangMan() {
  contextHangMan.clearRect(0, 0, hangMan.width, hangMan.height);
}

createAllLetters().map((x) => {
  const lettersButton = document.createElement("button");
  lettersButton.innerText = x;
  lettersButton.className = "buttons-letters";
  btnContainer.appendChild(lettersButton);
});

function createLines(randomWord_) {
  for (let i = 0; i < randomWord_.length; i++) {
    const createText = document.createElement("p");
    createText.className = "lines";
    textContainer.appendChild(createText);
  }
}

function findIndexLetter(word, letter) {
  const indexes = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) indexes.push(i);
  }
  return indexes;
}

const allButton = document.querySelectorAll(".buttons-letters");

allButton.forEach((x) =>
  x.addEventListener("click", () => {
    actualLetter = x.innerText;
    x.setAttribute("disabled", true);
    if (findIndexLetter(randomWord, actualLetter).length !== 0) {
      findIndexLetter(randomWord, actualLetter).map((x) => {
        correctWord[x] = actualLetter;
        document.querySelectorAll(".lines")[x].innerText = actualLetter;
        document.querySelectorAll(".lines")[x].style["border-bottom"] =
          "transparent";
      });

      if (correctWord.join("") === randomWord) {
        gameBoard.style.pointerEvents = "none";
        containerHangMan.innerHTML = "";
        const headerResult = document.createElement("h1");
        headerResult.className = "result";
        headerResult.style.color = "green";
        headerResult.innerText = "Winner!";
        containerHangMan.appendChild(headerResult);
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
            document.querySelectorAll("p")[i].innerText = randomWord[i];
            document.querySelectorAll("p")[i].style["border-bottom"] =
              "transparent";
          }
          btnShowWord.setAttribute("disabled", true);
        });
      }
    }
  })
);

function startGame() {
  randomP = Math.trunc(Math.random() * (words.length - 1)) + 1;
  randomWord = words[randomP];
  createLines(randomWord);
}

function drawHangMan(part) {
  
  switch (part) {
    case "gallows":
      contextHangMan.strokeStyle = " RGBA(240, 248, 255, 0.70)";
      contextHangMan.lineWidth = 10;
      contextHangMan.beginPath();
      contextHangMan.moveTo(175, 225);
      contextHangMan.lineTo(5, 225);
      contextHangMan.moveTo(40, 225);
      contextHangMan.lineTo(25, 5);
      contextHangMan.lineTo(100, 5);
      contextHangMan.lineTo(100, 25);
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
  console.log(hangMan)
}

resetBtn.addEventListener("click", () => {
  clearHangMan();
  containerHangMan.innerHTML = ''
  containerHangMan.appendChild(hangMan);
  btnContainerShowWord.innerHTML = "";
  document.querySelectorAll(".lines").forEach((x) => (x.innerText = ""));
  allButton.forEach((x) => (x.disabled = false));
  document
    .querySelectorAll(".lines")
    .forEach((x) => textContainer.removeChild(x));
  gameBoard.removeAttribute("style");
  chances = 0;
  correctWord = [];
  startGame();
  if (document.querySelector(".result") !== null) {
    result.removeChild(document.querySelector(".result"));
    btnContainerGame.removeChild(document.querySelector(".btn-show-word"));
  }
});
