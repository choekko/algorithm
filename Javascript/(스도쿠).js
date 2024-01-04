const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = [];

for (let i = 0; i < 9; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

const zeroPositions = [];

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    if (matrix[row][col] === 0) {
      zeroPositions.push({ row, col });
    }
  }
}

const solution = (matrix, zeroPositions) => {
  const POSSIBLE_NUMBERS = Array.from({ length: 9 }, (_, idx) => idx + 1);
  const POSSIBLE_MATRIX_INDICES = Array.from({ length: 9 }, (_, idx) => idx);

  const isPossible = (row, col, value) => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (const rowOffset of [0, 1, 2]) {
      for (const colOffset of [0, 1, 2]) {
        const row = startRow + rowOffset;
        const col = startCol + colOffset;

        if (matrix[row][col] === value) return false;
      }
    }

    for (const row of POSSIBLE_MATRIX_INDICES) {
      if (matrix[row][col] === value) return false;
    }

    for (const col of POSSIBLE_MATRIX_INDICES) {
      if (matrix[row][col] === value) return false;
    }

    return true;
  }

  const traverse = (idx) => {
    if (idx >= zeroPositions.length) {
      return true;
    }
    const { row, col } = zeroPositions[idx];

    for (const value of POSSIBLE_NUMBERS) {
      if (isPossible(row, col, value)) {
        const tmp = matrix[row][col];

        matrix[row][col] = value;

        const isFinished = traverse(idx + 1);
        if (isFinished) return true;

        matrix[row][col] = tmp;
      }
    }

    return false;
  }

  traverse(0);

  return matrix.map(line => line.join(' ')).join('\n');
}

console.log(solution(matrix, zeroPositions));


