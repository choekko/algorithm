const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.map(line => line.split('').map(Number));

const solution = (matrix) => {
  const ROW_SIZE = 8;
  const COL_SIZE = 7;
  const dominoes = [];

  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      dominoes.push(`${i}${j}`);
    }
  }

  const dominoChecker = {};

  for (const domino of dominoes) {
    dominoChecker[domino] = false;
  }
  const matrixChecker = Array.from({ length: ROW_SIZE }, () => Array.from({ length: COL_SIZE }, () => false));

  const getValue = (row, col, isDown) => {
    if (isDown) {
      if (row + 1 >= ROW_SIZE) return null;
      return `${matrix[row][col]}${matrix[row + 1][col]}`;
    }
    if (col + 1 >= COL_SIZE) return null;
    return `${matrix[row][col]}${matrix[row][col + 1]}`;
  }

  const checkIsAllChecked = () => matrixChecker.every(line => line.every(Boolean));

  let result = 0;
  const dfs = (row, col) => {
    const nextRow = col === COL_SIZE - 1 ? row + 1 : row;
    const nextCol = col === COL_SIZE - 1 ? 0 : col + 1;

    if ((row === ROW_SIZE - 1) && (col === COL_SIZE - 1) && checkIsAllChecked()) {
      result++;
      return;
    }

    if (matrixChecker[row][col]) {
      dfs(nextRow, nextCol);
      return;
    }

    for (let isDown = 0; isDown <= 1; isDown++) {
      if (matrixChecker[row + isDown]?.[col + !isDown] !== false) continue;

      const value = getValue(row, col, isDown)
      const reversedValue = [...value].reverse().join('');
      let validValue = null;

      if (dominoChecker[value] === false) {
        validValue = value;
      } else if (dominoChecker[reversedValue] === false) {
        validValue = reversedValue;
      }

      if (!validValue) continue;

      matrixChecker[row][col] = true;
      matrixChecker[row + isDown][col + !isDown] = true;
      dominoChecker[validValue] = true;
      dfs(nextRow, nextCol)
      matrixChecker[row][col] = false;
      matrixChecker[row + isDown][col + !isDown] = false;
      dominoChecker[validValue] = false;
    }
  }

  dfs(0, 0)

  return result;
}

console.log(solution(matrix))