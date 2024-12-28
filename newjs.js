const computerScore = document.querySelector(".comp-score");
const playerScore = document.querySelector(".player-score");
const keys = document.querySelectorAll(".game-item");
const playingZone = document.querySelector(".play-zone");
const resultZone = document.querySelector(".result-view");
const winText = document.querySelector("#win-message");
const lostText = document.querySelector("#lost-message");
const tieText = document.querySelector("#tie-message");
const subText = document.querySelector(".sub-message");
const playAgainBtn = document.querySelector(".play-button");
const replayBtn = document.querySelector(".retry-button");
const userRock = document.querySelector("#user-rocks");
const pcRock = document.querySelector("#pc-rocks");
const userPaper = document.querySelector("#user-papers");
const pcPaper = document.querySelector("#pc-papers");
const userScissor = document.querySelector("#user-scissors");
const pcScissor = document.querySelector("#pc-scissors");
const userIcon = document.querySelector(".user-icon");
const pcIcon = document.querySelector(".pc-icon");
const nextBtn = document.querySelector(".proceed");
const rulesBtn = document.querySelector(".show-rules");
const mainScreen = document.querySelector(".main-view");
const winnerScreen = document.querySelector(".victory-screen");
const winnerPlayAgainBtn = document.querySelector(".victoryPlayBtn");
const rulesDisplay = document.querySelector(".game-rules");
const crossBtn = document.querySelector(".close-icon");
const keysArray = Array.from(keys);

// Function to get scores from local storage
function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  computerScore.innerText = updatedScores.computer;
  playerScore.innerText = updatedScores.user;
}
updateScoreDisplay();

console.log(keysArray);

const valueOfKey = (name) => {
  console.log(name);
  let keyVal = 0;
  if (name === "rocks") {
    keyVal = 1;
  } else if (name === "papers") {
    keyVal = 2;
  } else if (name === "scissors") {
    keyVal = 3;
  }
  return keyVal;
};

const getRandomNumber = () => {
  // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random();

  // random number between 1,2 and 3
  const randomNumber = Math.floor(randomDecimal * 3) + 1;

  return randomNumber;
};

const playRockPaperScissors = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    return "tie";
  } else if (
    (userChoice === 1 && compChoice === 3) ||
    (userChoice === 2 && compChoice === 1) ||
    (userChoice === 3 && compChoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

const updateScores = (result) => {
  // Retrieve the current scores from local storage
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  // Update the scores based on the result
  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  // Save the updated scores back to local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  updateScoreDisplay();
};

const updateResultSides = (userChoice, compChoice) => {
  // setting user icon
  if (userChoice === 1) {
    userRock.style.display = "flex";
    userPaper.style.display = "none";
    userScissor.style.display = "none";
  } else if (userChoice === 2) {
    userRock.style.display = "none";
    userPaper.style.display = "flex";
    userScissor.style.display = "none";
  } else if (userChoice === 3) {
    userRock.style.display = "none";
    userPaper.style.display = "none";
    userScissor.style.display = "flex";
  }

  // setting pc icon
  if (compChoice === 1) {
    pcRock.style.display = "flex";
    pcPaper.style.display = "none";
    pcScissor.style.display = "none";
  } else if (compChoice === 2) {
    pcRock.style.display = "none";
    pcPaper.style.display = "flex";
    pcScissor.style.display = "none";
  } else if (compChoice === 3) {
    pcRock.style.display = "none";
    pcPaper.style.display = "none";
    pcScissor.style.display = "flex";
  }
};

const updateResultZone = (result, userChoice, compChoice) => {
  // make playing screen invisible and result screen visible
  playingZone.style.display = "none";
  resultZone.style.display = "flex";

  if (result === "tie") {
    winText.style.display = "none";
    lostText.style.display = "none";
    subText.style.display = "none";
    playAgainBtn.style.display = "none";
    nextBtn.style.display = "none";

    tieText.style.display = "block";
    replayBtn.style.display = "block";

    updateResultSides(userChoice, compChoice);
    userIcon.classList.remove("highlight-background");
    pcIcon.classList.remove("highlight-background");
  } else if (result === "user") {
    lostText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";

    winText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";
    nextBtn.style.display = "inline";

    updateResultSides(userChoice, compChoice);

    userIcon.classList.add("highlight-background");
    pcIcon.classList.remove("highlight-background");
  } else if (result === "comp") {
    winText.style.display = "none";
    tieText.style.display = "none";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";

    lostText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";

    updateResultSides(userChoice, compChoice);

    userIcon.classList.remove("highlight-background");
    pcIcon.classList.add("highlight-background");
  }
};

const keyClickHander = (event) => {
  const target = event.target;
  const parentDiv = target.closest(".game-item"); // Get the closest parent div with the class "game-item"

  if (parentDiv) {
    const keyClicked = parentDiv.id; // Fetching the key clicked
    console.log("keyClicked:", keyClicked);
    const userChoice = valueOfKey(keyClicked);
    console.log("userChoice:", userChoice);

    // call the random response from computer
    const compChoice = getRandomNumber();
    console.log("compChoice:", compChoice);

    // compare the results and genarate result
    const result = playRockPaperScissors(userChoice, compChoice);
    console.log("Result: ", result);

    // update the local storage based on the result
    updateScores(result);

    // update the result zone based on the result
    updateResultZone(result, userChoice, compChoice);
  }
};

const playAgainHandler = (event) => {
  // make playing screen visible and result screen invisible
  playingZone.style.display = "flex";
  resultZone.style.display = "none";
  mainScreen.style.display = "block";
  winnerScreen.style.display = "none";
};

const nextPageHandler = () => {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };
  scores.user = 0;
  scores.computer = 0;
  localStorage.setItem("scores", JSON.stringify(scores));
  // make winner screen visible
  mainScreen.style.display = "none";
  winnerScreen.style.display = "flex";
  nextBtn.style.display = "none";
  updateScoreDisplay();
};

const showRulesHandler = () => {
  console.log("inisde showRulesHandler ");
  // add rules and cross
  crossBtn.style.display = "flex";
  rulesDisplay.style.display = "flex";
};

const removeRulesHandler = () => {
  // remove rules and cross
  crossBtn.style.display = "none";
  rulesDisplay.style.display = "none";
};

keysArray.forEach((key) => key.addEventListener("click", keyClickHander));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);
winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
rulesBtn.addEventListener("click", showRulesHandler);
crossBtn.addEventListener("click", removeRulesHandler);
nextBtn.addEventListener("click", nextPageHandler);