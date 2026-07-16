function cloneBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function createBoard(numRows, numCols) {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => ({
      isRevealed: false,
      isMine: false,
      isFlagged: false,
      adjacentMines: 0,
      isForbidden: false,
    })),
  );
}

export function getNeighbors(row, col, board) {
  const numRows = board.length;
  const numCols = board[0].length;

  const neighbors = [];

  for (let currentRow = -1; currentRow <= 1; currentRow++) {
    for (let currentCol = -1; currentCol <= 1; currentCol++) {
      if (currentRow === 0 && currentCol === 0) continue;

      const newRow = row + currentRow;
      const newCol = col + currentCol;

      const isValidRow = newRow >= 0 && newRow < numRows;
      const isValidCol = newCol >= 0 && newCol < numCols;

      if (isValidRow && isValidCol) {
        neighbors.push([newRow, newCol]);
      }
    }
  }

  return neighbors;
}

export function setMines(firstClick, mineCount, board) {
  const newBoard = cloneBoard(board);
  const [firstClickRow, firstClickCol] = firstClick;
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  newBoard[firstClickRow][firstClickCol].isForbidden = true;
  getNeighbors(firstClickRow, firstClickCol, newBoard).forEach(([row, col]) => {
    newBoard[row][col].isForbidden = true;
  });

  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (newBoard[row][col].isForbidden || newBoard[row][col].isMine) continue;

    newBoard[row][col].isMine = true;
    minesPlaced++;
  }

  return newBoard;
}

export function calculateAdjacentMines(board) {
  const newBoard = cloneBoard(board);
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (newBoard[r][c].isMine) {
        getNeighbors(r, c, newBoard).forEach(([nr, nc]) => {
          newBoard[nr][nc].adjacentMines++;
        });
      }
    }
  }

  return newBoard;
}

export function revealSlot(row, col, board) {
  const newBoard = cloneBoard(board);

  function reveal(currentRow, currentCol) {
    const cell = newBoard[currentRow][currentCol];

    if (cell.isRevealed || cell.isFlagged) return 'CONTINUE';

    cell.isRevealed = true;

    if (cell.isMine) return 'LOSE';

    if (cell.adjacentMines === 0) {
      getNeighbors(currentRow, currentCol, newBoard).forEach(([newRow, newCol]) => {
        reveal(newRow, newCol);
      });
    }

    return 'CONTINUE';
  }

  const status = reveal(row, col);

  return { board: newBoard, status };
}
