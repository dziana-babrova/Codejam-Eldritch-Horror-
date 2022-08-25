import ancientsData from "./data/ancients.js";
import blue from "./data/mythicCards/blue/index.js";
import brown from "./data/mythicCards/brown/index.js";
import green from "./data/mythicCards/green/index.js";

const ancient = document.querySelectorAll(".ancient");
const closeButtons = document.querySelectorAll(".close");
const ancientsHeader = document.querySelector(".ancients-header");
const cardCounts = document.querySelectorAll(".stage-item");
const schemeElement = document.querySelector(".scheme");
const complexity = document.querySelector(".complexity");

let enemy;
let scheme = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let flattedScheme;
let chosenComplexity = "Very easy";

ancient.forEach((el, index) => {
  el.addEventListener("click", function zoomAncient(e) {
    if (!e.target.classList.contains("close")) {
      ancient.forEach((el) => el.classList.remove("chosen"));
      ancient[index].classList.add("chosen");

      ancient.forEach((el) => el.classList.add("inactive"));
      ancient[index].classList.remove("inactive");

      closeButtons.forEach((el) => el.classList.add("close-hidden"));
      closeButtons[index].classList.remove("close-hidden");

      schemeElement.classList.add("scheme-visible");
      complexity.classList.remove("complexity-hidden");
      
        enemy = ancientsData[index];
        applyAncientsHeader();
      createGameSchemeArray();
      createGameScheme();
      pickCards();
    }
  });
});

closeButtons.forEach((el, index) => {
  el.addEventListener("click", function (e) {
    ancient.forEach((el) => el.classList.remove("chosen"));
    ancient.forEach((el) => el.classList.remove("inactive"));
    closeButtons[index].classList.add("close-hidden");
    schemeElement.classList.remove("scheme-visible");
      complexity.classList.add("complexity-hidden");
      enemy = ancientsData[-1];
      applyAncientsHeader();
    createGameSchemeArray();
    createGameScheme();
pickCards();
  });
});

function applyAncientsHeader() {
    if (enemy === undefined) {
        ancientsHeader.textContent = "Select your oponent first"
    } else {
        ancientsHeader.textContent = `Your oponent is ${enemy.name}`
    }
}

applyAncientsHeader();

function createGameSchemeArray() {
    if (enemy === undefined) {
        scheme[0][0] = 0;
        scheme[0][1] = 0;
        scheme[0][2] = 0;
        scheme[1][0] = 0;
        scheme[1][1] = 0;
        scheme[1][2] = 0;
        scheme[2][0] = 0;
        scheme[2][1] = 0;
        scheme[2][2] = 0;
    } else {
        scheme[0][0] = enemy.firstStage.greenCards;
        scheme[0][1] = enemy.firstStage.brownCards;
        scheme[0][2] = enemy.firstStage.blueCards;
        scheme[1][0] = enemy.secondStage.greenCards;
        scheme[1][1] = enemy.secondStage.brownCards;
        scheme[1][2] = enemy.secondStage.blueCards;
        scheme[2][0] = enemy.thirdStage.greenCards;
        scheme[2][1] = enemy.thirdStage.brownCards;
        scheme[2][2] = enemy.thirdStage.blueCards;
    }
}

function createGameScheme() {
  flattedScheme = scheme.flat();
  flattedScheme.forEach((el, index) => {cardCounts[index].textContent = el;})
}

function pickCards() {
  let easyBlue = blue.filter(el => el.difficulty === "easy");
  let normalBlue = blue.filter((el) => el.difficulty === "normal");
  let hardBlue = blue.filter((el) => el.difficulty === "hard");

  let easyBrown = brown.filter((el) => el.difficulty === "easy");
  let normalBrown = brown.filter((el) => el.difficulty === "normal");
  let hardBrown = brown.filter((el) => el.difficulty === "hard");

  let easyGreen = green.filter((el) => el.difficulty === "easy");
  let normalGreen = green.filter((el) => el.difficulty === "normal");
  let hardGreen = green.filter((el) => el.difficulty === "hard");

  if (chosenComplexity === "Very easy") {
    let easyGreenNumber = scheme[0][0] + scheme[1][0] + scheme[2][0];
    let newEasyGreen = easyGreen;
    let newNormalGreen = normalGreen;
    while (easyGreenNumber > newEasyGreen.length) {
      let randomNumber = Math.floor(Math.random() * (newNormalGreen.length - 1));
      let newCard = newNormalGreen[randomNumber];
      newEasyGreen.push(newCard);
      newNormalGreen.splice(randomNumber, 1);
    }
    let easyBrownNumber = scheme[0][1] + scheme[1][1] + scheme[2][1];
    let newEasyBrown = easyBrown;
    let newNormalBrown = normalBrown;
    while (easyBrownNumber > newEasyBrown.length) {
      let randomNumber = Math.floor(Math.random() * (newNormalBrown.length - 1));
      let newCard = newNormalBrown[randomNumber];
      newEasyBrown.push(newCard);
      newNormalBrown.splice(randomNumber, 1);
    }
        let easyBlueNumber = scheme[0][2] + scheme[1][2] + scheme[2][2];
        let newEasyBlue = easyBlue;
        let newNormalBlue = normalBlue;
        while (easyBlueNumber > newEasyBlue.length) {
          let randomNumber = Math.floor(Math.random() * (newNormalBlue.length - 1));
          let newCard = newNormalBlue[randomNumber];
          newEasyBlue.push(newCard);
          newNormalBlue.splice(randomNumber, 1);
    }
  } else if (chosenComplexity === "Easy") {

  } else if (chosenComplexity === "Normal") {

  } else if (chosenComplexity === "Hard") {

  } else if (chosenComplexity === "Very hard") {

  } else {

  }
}

pickCards();
