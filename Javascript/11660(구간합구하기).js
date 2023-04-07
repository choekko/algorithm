const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [size, targetCount] = input[0].split(' ').map(Number);
const matrix = input.slice(1, size + 1).map(line => line.split(' ').map(Number));
const targets = input.slice(size + 1).map(line => line.split(' ').map(Number));


const solution = (matrix, targets) => {
  const dp = matrix.map(row => row.map(() => 0)); // dp[row][col] : 0, 0 부터 row, col 까지 총합
  const dpHelper = matrix.map(row => row.map(() => 0)); // dpHelper[row][col] : row, 0 부터 row, col 까지 총합

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      dpHelper[row][col] = (dpHelper[row][col - 1] ?? 0) + matrix[row][col];
    }
  }

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      dp[row][col] = (dp[row - 1]?.[col] ?? 0) + dpHelper[row][col];
    }
  }

  const getSum = (target) => {
    const [row1, col1, row2, col2] = target;
    const row1FromZero = row1 - 1;
    const col1FromZero = col1 - 1;
    const row2FromZero = row2 - 1;
    const col2FromZero = col2 - 1;

    return dp[row2FromZero][col2FromZero] - (dp[row1FromZero - 1]?.[col2FromZero] ?? 0) - (dp[row2FromZero]?.[col1FromZero - 1] ?? 0) + (dp[row1FromZero - 1]?.[col1FromZero - 1] ?? 0);
  }

  return targets.map(getSum).join('\n');
}

console.log(solution(matrix, targets));