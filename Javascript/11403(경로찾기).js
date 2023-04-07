const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const size = Number(input[0]);
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (matrix, size) => {
  const resultMatrix = Array(size).fill(null).map(() => Array(size).fill(false));
  const checkingMatrix = Array(size).fill(null).map(() => Array(size).fill(false));;

  const checkIsPossible = (i, j) => {
    if (resultMatrix[i][j]) return true;
    if (matrix[i][j]) {
      resultMatrix[i][j] = true;
      return true;
    }
    if (checkingMatrix[i][j]) return false;
    checkingMatrix[i][j] = true;

    for (let k = 0; k < size ; k++) {
      const isPossible = [checkIsPossible(i, k), checkIsPossible(k, j)].every(Boolean);
      if (isPossible) {
        resultMatrix[i][j] = true;
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      checkIsPossible(i, j);
    }
  }

  return resultMatrix.map(line => line.map(flag => flag ? '1' : '0').join(' ')).join('\n');
}

console.log(solution(matrix, size));