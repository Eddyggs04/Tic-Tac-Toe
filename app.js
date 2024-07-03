let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let currentPlayer = 'X';
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;
const winningMessage = () => `${currentPlayer} has won the game!`;

const statusDisplay = document.querySelector('.game--status');

// you can click on cells
document.querySelector('.game--container').addEventListener('click', handleCellClick);
// event initiates the game
function handleCellClick(clickedCellEvent) {
     // if game is over, ends game
     if(gameActive) {
          // targets the clicked cell
          const clickedCell = clickedCellEvent.target;
          // gets the index of the clicked cell
          const clickedCellIndex = parseInt(clickedCellEvent.target.getAttribute('data-index'));
          // if someone has already clicked on that cell, ignores click
          if(gameState[clickedCellIndex] !== '') {
               // stops executing the function
               return; 
          }

          handleCellPlayed(clickedCell, clickedCellIndex);
          handleResultValidation();
     }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
     gameState[clickedCellIndex] = currentPlayer;
     clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
     let gameWon = false;

     // gives winning combination using an array of arrays
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

     //loops through each combination
     for (let i = 0; i < 8; i++) {
          const winCondition = winningConditions[i];
          let a = gameState[winCondition[0]];
          let b = gameState[winCondition[1]];
          let c = gameState[winCondition[2]];
          if (a === '' || b === '' || c === ''){
               continue; // skips the rest of the code but still loops through
          }
          if (a === b && b === c) {
               gameWon = true;
               break // finishes loop but continues function
          }
     }
     // if the game is won, displays winning message and gameActive status becomes false
     if (gameWon) {
          statusDisplay.innerHTML = winningMessage();
          gameActive = false;
          alert(`${currentPlayer} has won!`)
          return;
     }
     //if there is no winner switch player
     handlePlayerChange();
}

function handlePlayerChange() {
     if (currentPlayer === 'X') {
          currentPlayer = 'O';
      } else {
          currentPlayer = 'X';
      }
     statusDisplay.innerHTML = currentPlayerTurn();
}