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
const flippingArea = document.querySelector(".flipping");
const cardBack = document.querySelector(".card-background");
const flipButton = document.querySelector(".flipping-header");
const cardFace = document.querySelector(".card-face");
const finish = document.querySelector(".game-finished");
const finishButton = document.querySelector(".game-finished-button");
const closeCard = document.querySelector(".close-card");
const stage = document.querySelectorAll(".stage");

let enemy;
let scheme = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
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
let currentCard;

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
  el.addEventListener("click", resetCards);
});

finishButton.addEventListener("click", resetCards);

function resetCards() {
  ancient.forEach((el) => el.classList.remove("chosen"));
  ancient.forEach((el) => el.classList.remove("inactive"));
  closeButtons.forEach((el) => el.classList.add("close-hidden"));
  schemeElement.classList.remove("scheme-visible");
  complexity.classList.add("complexity-hidden");
  enemy = ancientsData[-1];
  chosenComplexity = -1;
  pickCards();
  applyAncientsHeader();
  createGameSchemeArray();
  createGameScheme();
  levels.forEach((el) => el.classList.remove("level-chosen"));
  flippingArea.classList.add("flipping-hidden");
  cardBack.classList.remove("back-hidden");
  flipButton.classList.remove("flipping-disabled");
  finish.classList.remove("game-finished-visible");
  cardFace.classList.remove("card-face-zoomed");
  closeCard.classList.add("close-card-hidden");
}

function applyAncientsHeader() {
  if (enemy === undefined) {
    ancientsHeader.textContent = "Select your oponent first";
  } else {
    ancientsHeader.textContent = `Your oponent is ${enemy.name}`;
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
  flattedScheme.forEach((el, index) => {
    cardCounts[index].textContent = el;
  });
}

function pickCards() {
  let easyBlue = blue.filter((el) => el.difficulty === "easy");
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
    levels.forEach((el) => el.classList.remove("level-chosen"));
    levels[index].classList.add("level-chosen");
    flippingArea.classList.remove("flipping-hidden");
    cardFace.classList.add("face-hidden");
    cardBack.classList.remove("back-hidden");
    flipButton.classList.remove("flipping-disabled");
    finish.classList.remove("game-finished-visible");
    cardFace.classList.remove("card-face-zoomed");
    closeCard.classList.add("close-card-hidden");
    stage1Cards = [];
    stage2Cards = [];
    stage3Cards = [];
    createGameSchemeArray()
    createGameScheme();
    pickCards();

    console.log(`Green cards with complexity ${chosenComplexity}:`);
    console.log(greenCardsForGame);
    console.log(`Brown cards with complexity ${chosenComplexity}:`);
    console.log(brownCardsForGame);
    console.log(`Blue cards with complexity ${chosenComplexity}:`);
    console.log(blueCardsForGame);

    let shuffledGreenCards = shuffle(greenCardsForGame);
    let shuffledBrownCards = shuffle(brownCardsForGame);
    let shuffledBlueCards = shuffle(blueCardsForGame);

    console.log(`Shuffled Green cards:`);
    console.log(shuffledGreenCards);
    console.log(`Shuffled Brown cards:`);
    console.log(shuffledBrownCards);
    console.log(` ShuffledBlue cards:`);
    console.log(shuffledBlueCards);

    pickCardForStage(scheme[0][0], shuffledGreenCards, stage1Cards);
    pickCardForStage(scheme[0][1], shuffledBrownCards, stage1Cards);
    pickCardForStage(scheme[0][2], shuffledBlueCards, stage1Cards);
    pickCardForStage(scheme[1][0], shuffledGreenCards, stage2Cards);
    pickCardForStage(scheme[1][1], shuffledBrownCards, stage2Cards);
    pickCardForStage(scheme[1][2], shuffledBlueCards, stage2Cards);
    pickCardForStage(scheme[2][0], shuffledGreenCards, stage3Cards);
    pickCardForStage(scheme[2][1], shuffledBrownCards, stage3Cards);
    pickCardForStage(scheme[2][2], shuffledBlueCards, stage3Cards);

    let shuffledStage1Cards = shuffle(stage1Cards);
    console.log(shuffledStage1Cards);
    let shuffledStage2Cards = shuffle(stage2Cards);
    let shuffledStage3Cards = shuffle(stage3Cards);

    console.log(`Cards for Stage 1:`);
    console.log(shuffledStage1Cards);
    console.log(`Cards for Stage 2:`);
    console.log(shuffledStage2Cards);
    console.log(`Cards for Stage 3:`);
    console.log(shuffledStage3Cards);

    cardStack = shuffledStage3Cards.concat(shuffledStage2Cards, shuffledStage1Cards);

    console.log("Deck for game:");
    console.log(cardStack);
  });
});

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

function pickCardForStage(number, deck, target) {
  let source = Array.from(deck);
  for (let i = 1; i <= number; i++) {
    let randomNumber = Math.floor(Math.random() * (source.length - 1));
    target.push(source[randomNumber]);
    source.splice(randomNumber, 1);
  }
}

function showCard() {
  if (cardStack.length > 0) {
    currentCard = cardStack.pop()
    const img = new Image();
    img.src = `${currentCard.cardFace}`;
    img.onload = () => {
      cardFace.style.backgroundImage = `url('${img.src}')`;
      console.log(currentCard);
      countTracker();
    };
    cardFace.classList.remove("face-hidden");
  } else {
    cardFace.classList.add("face-hidden");
    cardBack.classList.add("back-hidden");
    flipButton.classList.add("flipping-disabled");
    finish.classList.add("game-finished-visible");
    stage.forEach((el) => el.classList.remove("stage-current"));
  }
}

cardBack.addEventListener("click", showCard);
flipButton.addEventListener("click", showCard);

cardFace.addEventListener("click", function (e) {
  if (e.target !== closeCard) {
    cardFace.classList.add("card-face-zoomed");
    closeCard.classList.remove("close-card-hidden");
  }
});

closeCard.addEventListener("click", function () {
  cardFace.classList.remove("card-face-zoomed");
  closeCard.classList.add("close-card-hidden");
});

function countTracker() {
  if (scheme[0][0] + scheme[0][1] + scheme[0][2]) {
    if (currentCard.color === "green") {
      scheme[0][0]--;
    } else if (currentCard.color === "brown") {
      scheme[0][1]--;
    } else if (currentCard.color === "blue") {
      scheme[0][2]--;
    }

    stage.forEach((el) => el.classList.remove("stage-current"));
    stage[0].classList.add("stage-current");

  } else if (scheme[1][0] + scheme[1][1] + scheme[1][2]) {
    if (currentCard.color === "green") {
      scheme[1][0]--;
    } else if (currentCard.color === "brown") {
      scheme[1][1]--;
    } else if (currentCard.color === "blue") {
      scheme[1][2]--;
    }
    
    stage.forEach((el) => el.classList.remove("stage-current"));
    stage[1].classList.add("stage-current");

  } else if (scheme[2][0] + scheme[2][1] + scheme[2][2]) {
    if (currentCard.color === "green") {
      scheme[2][0]--;
    } else if (currentCard.color === "brown") {
      scheme[2][1]--;
    } else if (currentCard.color === "blue") {
      scheme[2][2]--;
    }
    
    stage.forEach((el) => el.classList.remove("stage-current"));
    stage[2].classList.add("stage-current");

  }
  createGameScheme();
}
