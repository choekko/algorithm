const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (matrix) => {
  const ROW_SIZE = matrix.length;
  const COL_SIZE = matrix[0].length;
  const D_COLS = [-1, 0, 1];

  const minCostMatrix = Array.from({ length: ROW_SIZE + 1}, () => Array.from({ length: COL_SIZE }, () => Array.from({ length: 3}, () => Infinity)));

  for (let col = 0; col < COL_SIZE; col++) {
    for (let excludedIdx = 0; excludedIdx < 3; excludedIdx++) {
      minCostMatrix[ROW_SIZE][col][excludedIdx] = 0;
    }
  }

  for (let row = ROW_SIZE - 1; row >= 0; row--) {
    for (let col = 0; col < COL_SIZE; col++) {
      for (let excludedIdx = 0; excludedIdx < 3; excludedIdx++) {
        let minNextCost = Infinity;

        for (let dirIdx = 0; dirIdx < D_COLS.length; dirIdx++) {
          if (dirIdx === excludedIdx) continue;
          minNextCost = Math.min(minNextCost, minCostMatrix[row + 1][col + D_COLS[dirIdx]]?.[dirIdx] ?? Infinity)
        }
        minCostMatrix[row][col][excludedIdx] = matrix[row][col] + minNextCost;
      }
    }
  }

  const firstLine = minCostMatrix[0].flat();

  return Math.min(...firstLine.filter((_, idx) => ![2, firstLine.length - 3].includes(idx)))
}

console.log(solution(matrix));