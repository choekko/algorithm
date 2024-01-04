const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [r, c, k] = input[0].split(' ').map(Number);
const matrix = Array.from({length: 100}, () => Array.from( { length: 100 }, () => 0));

input.slice(1).forEach((line, rowIdx) => line.split(' ').map(Number).forEach((value, colIdx) => {
  matrix[rowIdx][colIdx] = value;
}))
const rowSize = input.length - 1;
const colSize = input[1].split(' ').length;

const solution = (matrix, rowSize, colSize, r, c, k) => {

  const sortLine = (type, idx, orthogonalSize) => {
    const checker = {};

    for (let orthogonalIdx = 0; orthogonalIdx < orthogonalSize; orthogonalIdx++) {
      const value = matrix[type === 'ROW' ? idx : orthogonalIdx][type === 'ROW' ? orthogonalIdx : idx];
      if (!value) continue;
      if (checker[value]) {
        checker[value] += 1;
      } else {
        checker[value] = 1;
      }
    }

    const newLine = Object.entries(checker).sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0]
      } else {
        return a[1] - b[1]
      }
    }).flat().map(Number);

    return { newLine, length: newLine.length }
  }

  let time = 0;

  while (time <= 100) {
    if (matrix[r - 1][c - 1] === k) {
      return time;
    }
    const newMatrix = Array.from({length: 100}, () => Array.from( { length: 100 }, () => 0));
    const type = rowSize >= colSize ? 'ROW' : 'COL';
    const maxIdx = type === 'ROW' ? rowSize - 1: colSize - 1;
    let maxSize = 0;

    for (let i = 0; i <= maxIdx; i++) {
      const { newLine, length } = sortLine(type, i, type === 'ROW' ? colSize : rowSize);
      maxSize = Math.max(maxSize, length);
      maxSize = Math.min(maxSize, 100)

      newLine.forEach((value, idx) => {
        if (idx >= 100) return;
        newMatrix[type === 'ROW' ? i : idx][type === 'ROW' ? idx : i] = value;
      })
    }

    matrix = newMatrix;
    time += 1;

    if (type === 'ROW') {
      colSize = maxSize
    } else {
      rowSize = maxSize;
    }
  }

  return -1;
}

console.log(solution(matrix, rowSize, colSize, r, c, k))