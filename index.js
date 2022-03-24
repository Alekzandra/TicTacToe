const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const statusDisplay = document.querySelector(".playersTurn");

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's Player's ${currentPlayer} turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
document.querySelector(".restartButton").addEventListener("click", handleGameRestart);

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = Number((clickedCellEvent.target).getAttribute("data-cell-index"));
  if (gameState[clickedCellIndex] !== ""){
    return;
  } else {
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
}

function handleCellPlayed (clickedCell, clickedCellIndex){
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i=0; i<7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    else if (a === b && b === c) {
      roundWon = true;
      break
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    return;
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
  }
  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleGameRestart() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}
