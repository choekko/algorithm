const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1);
const size = Number(input[0]);

const solution = (matrix, size) => {
  const makeString = (startRow, startCol, size) => {
    if (size === 1) return matrix[startRow][startCol];

    let string = '';
    const halfSize = size / 2;
    string += makeString(startRow, startCol, halfSize);
    string += makeString(startRow, startCol + halfSize, halfSize);
    string += makeString(startRow + halfSize, startCol, halfSize);
    string += makeString(startRow + halfSize, startCol + halfSize, halfSize);

    if (string === '1111') return '1';
    if (string === '0000') return '0';
    return `(${string})`;
  }

  return makeString(0, 0, size);
}

console.log(solution(matrix, size));
