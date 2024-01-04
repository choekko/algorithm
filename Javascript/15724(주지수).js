const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [height, width] = input[0].split(' ').map(Number);
const matrix = [];

for (let i = 1; i <= height; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

const testCount = Number(input[height + 1]);
const testCases = [];

for (let i = height + 2; i < height + 2 + testCount; i++) {
  const [row1, col1, row2, col2] = input[i].split(' ').map(Number);
  testCases.push({ row1, col1, row2, col2 })
}

const solution = (matrix, height, width, testCases) => {
  const prefixSumArray = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      prefixSumArray[row][col] = matrix[row][col] + (prefixSumArray[row][col - 1] ?? 0);
    }
  }

  for (let col = 0; col < width; col++) {
    for (let row = 0; row < height; row++) {
      prefixSumArray[row][col] += prefixSumArray[row - 1]?.[col] ?? 0;
    }
  }

  const getSum = ({ row1, col1, row2, col2 }) => {
    return prefixSumArray[row2][col2] - prefixSumArray[row2][col1 - 1] - prefixSumArray[row1 - 1][col2] + prefixSumArray[row1 - 1][col1 - 1];
  }

  prefixSumArray.forEach(line => line.unshift(0));
  prefixSumArray.unshift(Array.from({length: width + 1}, () => 0));

  const result = testCases.map(getSum);

  return result.join('\n');
}

console.log(solution(matrix, height, width, testCases));

