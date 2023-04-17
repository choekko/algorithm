const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const [squareSize, row, col] = input[0].split(' ').map(Number);

const solution = (squareSize, targetRow, targetCol) => {

  const getOrder = (row, col, size, count) => {
    if (size === 1) {
      return count;
    }

    const quarterSize = size / 4;
    const halfWidth = Math.sqrt(quarterSize);

    if (targetRow < row + halfWidth && targetCol < col + halfWidth) {
      return getOrder(row, col, quarterSize, count);
    }
    if (targetRow < row + halfWidth && targetCol >= col + halfWidth) {
      return getOrder(row, col + halfWidth, quarterSize, count + quarterSize);
    }
    if (targetRow >= row + halfWidth && targetCol < col + halfWidth) {
      return getOrder(row + halfWidth, col, quarterSize, count + 2 * quarterSize);
    }
    if (targetRow >= row + halfWidth && targetCol >= col + halfWidth) {
      return getOrder(row + halfWidth, col + halfWidth, quarterSize, count + 3 * quarterSize);
    }
  }

  return getOrder(0, 0, 2 ** (squareSize * 2), 0);
}

console.log(solution(squareSize, row, col))