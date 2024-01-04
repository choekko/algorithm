const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map(line => line.split('').map(Number));

const solution = (matrix, rowSize, colSize) => {
  matrix.forEach(row => row.unshift(0));
  matrix.unshift(Array.from({ length: colSize + 1 }, () => 0));

  const maxSquareSize = Math.max(rowSize, colSize);

  for (let row = 1; row <= rowSize; row++) {
    for (let col = 1; col <= colSize; col++) {
      matrix[row][col] += matrix[row][col - 1];
    }
  }

  for (let col = 1; col <= colSize; col++) {
    for (let row = 1; row <= rowSize; row++) {
      matrix[row][col] += matrix[row - 1][col];
    }
  }

  for (let size = maxSquareSize; size > 0; size--) {
    for (let row = 0; row <= rowSize; row++) {
      if (row + size > rowSize) {
        break;
      }
      for (let col = 0; col <= colSize; col++) {
        if (col + size > colSize)  {
          break;
        }

        const squareSum = matrix[row + size][col + size] - matrix[row][col + size] - matrix[row + size][col] + matrix[row][col];
        if (squareSum === size ** 2) {
          return squareSum;
        }
      }
    }
  }


  return 0;
}

console.log(solution(matrix, rowSize, colSize));