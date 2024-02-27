const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function drawWinningLine(winningCombo) {
  const cellSize = cells[0].offsetWidth;
  const svg = document.querySelector('.win-line');
  const line = document.getElementById('win-line');
  const [x1, y1] = [winningCombo[0] % 3 * cellSize + cellSize / 2, Math.floor(winningCombo[0] / 3) * cellSize + cellSize / 2];
  const [x2, y2] = [winningCombo[2] % 3 * cellSize + cellSize / 2, Math.floor(winningCombo[2] / 3) * cellSize + cellSize / 2];

  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);

  svg.style.display = 'block';

  // Добавляем класс win-cell к выигрышным ячейкам
  winningCombo.forEach(index => {
    cells[index].classList.add('win-cell');
  });

  setTimeout(() => {
    svg.style.display = 'none';
    // Удаляем класс win-cell после окончания анимации
    winningCombo.forEach(index => {
      cells[index].classList.remove('win-cell');
    });
  }, 1000);
}

function checkWinner() {
  let winner = null;
  for (let combo of winningCombinations) {
    const [a, b, c ] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winner = gameBoard[a];
      drawWinningLine(combo);
      break;
    }
  }

  if (winner) {
    setTimeout(() => {
      swal("Good job!", `Player ${winner} wins!`, "success");
      restartGame();
    }, 1000); // задержка 1 секунда перед отображением сообщения о победе

    return winner;
  } else if (checkDraw()) {
    alert('It\'s a draw!');
    restartGame();
    return 'draw';
  } else {
    return null;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '') {
      cell.textContent = currentPlayer;
      gameBoard[index] = currentPlayer;
      const winner = checkWinner();
      if (!winner) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    } else {
      console.log('На ячейку уже нажали');
    }
  });
});

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
}

function checkDraw() {
  for (let cellValue of gameBoard) {
    if (cellValue === '') {
      return false;
    }
  }
  return true;
}
