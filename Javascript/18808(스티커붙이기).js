const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [boardRowSize, boardColSize, stickerCount] = input[0].split(' ').map(Number);
const stickers = [];

let i = 1;
while (stickers.length < stickerCount) {
  const startI = i;
  const [rowSize, colSize] = input[i].split(' ').map(Number);
  const matrix = [];
  for (i++; i <= startI + rowSize; i++) {
    const line = input[i].split(' ').map(Number);
    matrix.push(line);
  }
  stickers.push({ rowSize, colSize, matrix });
}

const solution = (boardRowSize, boardColSize, stickers) => {
  let board = Array.from({ length: boardRowSize }, () => Array.from({ length: boardColSize }, () => false));

  const search = (sticker, startBoardRow, startBoardCol ) => {
    const { rowSize, colSize, matrix } = sticker;

    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        const boardRow = startBoardRow + row;
        const boardCol = startBoardCol + col;

        if (boardRow >= boardRowSize || boardCol >= boardColSize || (board[boardRow][boardCol] && matrix[row][col])) {
          return false;
        }
      }
    }

    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        const boardRow = startBoardRow + row;
        const boardCol = startBoardCol + col;

        if (matrix[row][col]) {
          board[boardRow][boardCol] = matrix[row][col];
        }
      }
    }
    return true;
  }

  const rotate = (stickerIdx) => { // 참조 이용
    const { rowSize, colSize, matrix } = stickers[stickerIdx];
    const newRowSize = colSize;
    const newColSize = rowSize;

    const newMatrix = Array.from({ length: newRowSize}, (_, row) => Array.from({ length: newColSize }, (_, col) =>
      matrix[newColSize - col - 1][row]
    ))

    stickers[stickerIdx] = { rowSize: newRowSize, colSize: newColSize, matrix: newMatrix };
  }

  stickers.forEach((_, idx, array) => {
    let rotateCount = 0;
    while (true) {
      for (let row = 0; row < boardRowSize; row++) {
        for (let col = 0; col < boardColSize; col++) {
          const possible = search(array[idx], row, col);
          if (possible) return;
        }
      }
      if (rotateCount === 3) return;
      rotate(idx);
      rotateCount++;
    }
  })

  let result = 0;
  for (let row = 0; row < boardRowSize; row++) {
    for (let col = 0; col < boardColSize; col++) {
     if (board[row][col]) result++;
    }
  }

  return result;
}

console.log(solution(boardRowSize, boardColSize, stickers));