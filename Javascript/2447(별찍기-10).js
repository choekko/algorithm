const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const size = Number(input[0]);

const solution = (size) => {
  const matrix = Array(size).fill(null).map(() => Array(size).fill('*'))
  const partSizes = [size];
  let _size = size;

  while (_size !== 3) {
    _size /= 3;
    partSizes.push(_size);
  }

  const setEmpty = (partSize) => {
    const startIdxOffset = partSize / 3;
    const endIdxOffset = partSize * 2 / 3 - 1;

    for (let startRow = 0; startRow < size; startRow += partSize) {
      for (let startCol = 0; startCol < size; startCol += partSize) {
        for (let row = startRow + startIdxOffset; row <= startRow + endIdxOffset; row++) {
          for (let col = startCol + startIdxOffset; col <= startCol + endIdxOffset; col++) {
            matrix[row][col] = ' ';
          }
        }
      }
    }
  }

  partSizes.forEach(setEmpty);

  return matrix.map(line => line.join('')).join('\n');
}

console.log(solution(size));
