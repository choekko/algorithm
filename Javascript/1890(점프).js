const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (matrix) => {
  const size = matrix.length;
  const caseCountMatrix = Array(size).fill(null).map(() => Array(size).fill(null));

  const traverse = (row, col) => {
    if (row >= size || col >= size) return 0n;
    if (row === size - 1 && col === size - 1) return 1n;
    if (caseCountMatrix[row][col] !== null) return caseCountMatrix[row][col];

    const jumpNumber = matrix[row][col];
    if (jumpNumber === 0) return 0n;

    const resultOfTraversingToRight = traverse(row, col + jumpNumber);
    const resultOfTraversingToBottom = traverse(row + jumpNumber, col);

    caseCountMatrix[row][col] = resultOfTraversingToRight + resultOfTraversingToBottom;
    return caseCountMatrix[row][col];
  }

  traverse(0, 0);

  return (caseCountMatrix[0][0] ?? 0n).toString();
}

console.log(solution(matrix));