const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowCount, colCount] = input[0].split(' ').map(Number);
const matrix = [];

for (let i = 0; i < rowCount; i++) {
  matrix.push([...input[1 + i]].map(Number))
}

const solution = (matrix, rowCount, colCount) => {
  const getSquareNumbersMap = (maxNumber) => { // 0 ~ maxNumber 사이의 제곱수들 찾기
    const squareNumbersMap = {};
    let number = 0;

    while (true) {
      const squareNumber = number * number;

      if (squareNumber <= maxNumber) {
        squareNumbersMap[squareNumber] = true;
        number++;
      } else {
        break;
      }
    }

    return squareNumbersMap;
  }

  const squareNumbersMap = getSquareNumbersMap(Number('9'.repeat(Math.max(rowCount, colCount))));

  const dRows = Array.from({ length: rowCount - 1 }, (_, idx) => idx + 1);
  dRows.push(...dRows.map(dRow => -dRow))
  dRows.push(0);
  const dCols = Array.from({ length: colCount - 1 }, (_, idx) => idx + 1);
  dCols.push(...dCols.map(dCol => -dCol))
  dCols.push(0);

  let result = -1;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (squareNumbersMap[matrix[row][col]]) {
        result = Math.max(result, matrix[row][col]);
      }
      const candidate = matrix[row][col];

      if (squareNumbersMap[candidate]) {
        result = Math.max(result, candidate);
      }

      for (const dRow of dRows) {
        for (const dCol of dCols) {
          if (dCol || dRow) {
            let jumpCount = 1;
            let numberString = String(matrix[row][col]);

            while (true) {
              const currentRow = row + dRow * jumpCount;
              const currentCol = col + dCol * jumpCount;

              if (0 > currentRow || currentRow >= rowCount || 0 > currentCol || currentCol >= colCount) {
                break;
              }

              const currentValue = matrix[currentRow][currentCol];
              numberString += currentValue;

              const candidate = Number(numberString);
              if (squareNumbersMap[candidate]) {
                result = Math.max(result, candidate);
              }
              jumpCount++;
            }
          }
        }
      }
    }
  }

  return result;
}

console.log(solution(matrix, rowCount, colCount));