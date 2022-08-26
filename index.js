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
const levels = document.querySelectorAll(".level");

let enemy;
let scheme = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
let flattedScheme;
let chosenComplexity;
let greenCardsForGame;
let brownCardsForGame;
let blueCardsForGame;
let stage1Cards = [];
let stage2Cards = [];
let stage3Cards = [];
let cardStack = [];

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
    chosenComplexity = -1;
    pickCards();
    applyAncientsHeader();
    createGameSchemeArray();
    createGameScheme();
    levels.forEach((el) => el.classList.remove("level-chosen"));
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

  let GreenNumber = scheme[0][0] + scheme[1][0] + scheme[2][0];
  let BrownNumber = scheme[0][1] + scheme[1][1] + scheme[2][1];
  let BlueNumber = scheme[0][2] + scheme[1][2] + scheme[2][2];

  if (chosenComplexity === 0) {
    greenCardsForGame = Array.from(easyGreen);
    let newNormalGreenPack = Array.from(normalGreen);

    addNewCard(GreenNumber, greenCardsForGame, newNormalGreenPack);

    brownCardsForGame = Array.from(easyBrown);
    let newNormalBrownPack = Array.from(normalBrown);

    addNewCard(BrownNumber, brownCardsForGame, newNormalBrownPack);

    blueCardsForGame = Array.from(easyBlue);
    let newNormalBluePack = Array.from(normalBlue);

    addNewCard(BlueNumber, blueCardsForGame, newNormalBluePack);
    
  } else if (chosenComplexity === 1) {
    greenCardsForGame = easyGreen.concat(normalGreen);
    brownCardsForGame = easyBrown.concat(normalBrown);
    blueCardsForGame = easyBlue.concat(normalBlue);
  } else if (chosenComplexity === 2) {
    greenCardsForGame = Array.from(green);
    brownCardsForGame = Array.from(brown);
    blueCardsForGame = Array.from(blue);
  } else if (chosenComplexity === 3) {
    greenCardsForGame = normalGreen.concat(hardGreen);
    brownCardsForGame = normalBrown.concat(hardBrown);
    blueCardsForGame = normalBlue.concat(hardBlue);
  } else if (chosenComplexity === 4) {
    greenCardsForGame = Array.from(hardGreen);
    let newNormalGreenPack = Array.from(normalGreen);

    addNewCard(GreenNumber, greenCardsForGame, newNormalGreenPack);
    
    brownCardsForGame = Array.from(hardBrown);
    let newNormalBrownPack = Array.from(normalBrown);

    addNewCard(BrownNumber, brownCardsForGame, newNormalBrownPack);

    blueCardsForGame = Array.from(hardBlue);
    let newNormalBluePack = Array.from(normalBlue);

    addNewCard(BlueNumber, blueCardsForGame, newNormalBluePack);

  } else {
    blueCardsForGame = [];
    greenCardsForGame = [];
    brownCardsForGame = [];
  }
}

function addNewCard(number, cardsForGame, newPack) {
      while (number > cardsForGame.length) {
        let randomNumber = Math.floor(Math.random() * (newPack.length - 1));
        let newCard = newPack[randomNumber];
        cardsForGame.push(newCard);
        newPack.splice(randomNumber, 1);
      }
}

levels.forEach((el, index) => {
  el.addEventListener("click", function () {
    chosenComplexity = index;
    levels.forEach(el => el.classList.remove("level-chosen"));
    levels[index].classList.add("level-chosen");
    stage1Cards = [];
    stage2Cards = [];
    stage3Cards = [];
    pickCards();

    let shuffledGreenCards = shuffle(greenCardsForGame);
    let shuffledBrownCards = shuffle(brownCardsForGame);
    let shuffledBlueCards = shuffle(blueCardsForGame);

    pickCardForStage(scheme[0][0], shuffledGreenCards, stage1Cards);
    pickCardForStage(scheme[0][1], shuffledBrownCards, stage1Cards);
    pickCardForStage(scheme[0][2], shuffledBlueCards, stage1Cards);
    pickCardForStage(scheme[1][0], shuffledGreenCards, stage2Cards);
    pickCardForStage(scheme[1][1], shuffledBrownCards, stage2Cards);
    pickCardForStage(scheme[1][2], shuffledBlueCards, stage2Cards);
    pickCardForStage(scheme[2][0], shuffledGreenCards, stage3Cards);
    pickCardForStage(scheme[2][1], shuffledBrownCards, stage3Cards);
    pickCardForStage(scheme[2][2], shuffledBlueCards, stage3Cards);

    stage1Cards = shuffle(stage1Cards);
    stage2Cards = shuffle(stage2Cards);
    stage3Cards = shuffle(stage3Cards);
    
    console.log(stage1Cards);
    console.log(stage2Cards);
    console.log(stage3Cards);

    cardStack = stage3Cards.concat(stage2Cards, stage1Cards);
    console.log(cardStack);
  })
})

function shuffle(array) {
  let newDeck = Array.from(array);
for (let i = newDeck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  const temp = newDeck[i];
  newDeck[i] = newDeck[j];
  newDeck[j] = temp;
  }  
  return newDeck;
}

function pickCardForStage(number, source, target) {
  for (let i = 1; i <= number; i++) {
    let randomNumber = Math.floor(Math.random() * (source.length - 1));
    target.push(source[randomNumber]);
    source.splice(randomNumber, 1);
  }
}