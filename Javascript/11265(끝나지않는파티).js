const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [matrixSize, customerCount] = input[0].split(' ').map(Number);
const matrix = []
const demands = [];

let i = 1;
for (; i <= matrixSize; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

for (; i <= matrixSize + customerCount; i++) {
  const [start, end, timeLimit] = input[i].split(' ').map(Number)
  demands.push({ start: start - 1, end: end - 1, timeLimit });
}

const solution = (matrix, demands, matrixSize) => {
  for (let middle = 0; middle < matrixSize; middle++) {
    for (let start = 0; start < matrixSize; start++ ) {
      for (let end = 0; end < matrixSize; end++) {
        matrix[start][end] = Math.min(matrix[start][end], matrix[start][middle] + matrix[middle][end]);
      }
    }
  }

  const checkIsPossible = ({ start, end, timeLimit }) => {
    if (matrix[start][end] <= timeLimit) {
      return 'Enjoy other party';
    }
    return 'Stay here';
  }

  return demands.map(demand => checkIsPossible(demand)).join('\n');
}

console.log(solution(matrix, demands, matrixSize));