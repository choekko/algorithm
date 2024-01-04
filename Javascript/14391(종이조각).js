// 아직 통과 못함

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = [];

for (let i = 1; i <= rowSize; i++) {
  matrix.push([...input[i]]);
}

const solution = (matrix, rowSize, colSize) => {
  const checkingMatrix = Array.from({ length: rowSize }, () => Array.from({ length: colSize }, () => false));
  const candidates = [];
  candidates.push(...Array.from({ length: rowSize - 1 }, (_, i) => i + 1).map(value => ({ direction: 'DOWN', size: value })));
  candidates.push(...Array.from({ length: colSize - 1 }, (_, i) => i + 1).map(value => ({ direction: 'RIGHT', size: value })));
  candidates.push(({ direction: 'NONE', size: 1 }));

  const getNumber = ({ direction, size, startRow, startCol }) => {
    let number;
    const checkedPositions = [];

    if (size === 1) {
      number = Number(matrix[startRow][startCol]);
      checkedPositions.push({ row: startRow, col: startCol });
    }

    if (direction === 'DOWN') {
      let numberString = '';

      for (let row = startRow; row < startRow + size; row++) {
        numberString += matrix[row][startCol];
        checkedPositions.push({ row, col: startCol })
      }
      number = Number(numberString);
    }

    if (direction === 'RIGHT') {
      let numberString = '';

      for (let col = startCol; col < startCol + size; col++) {
        numberString += matrix[startRow][col];
        checkedPositions.push({ row: startRow, col })
      }

      number = Number(numberString);
    }

    checkedPositions.forEach(({ row, col }) => checkingMatrix[row][col] = true);

    const rollback = () => {
      checkedPositions.forEach(({ row, col }) => checkingMatrix[row][col] = false);
    }

    return { number, rollback }
  }

  let result = -Infinity;
  const traverse = (sum) => {
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0 ; col < colSize; col++) {
        if (checkingMatrix[row][col]) continue;

        for (const candidate of candidates) {
          const { direction, size } = candidate;

          if (direction === 'RIGHT' && (size > colSize - col)) continue;
          if (direction === 'DOWN' && (size > rowSize - row)) continue;

          const { number, rollback } = getNumber({ ...candidate, startRow: row, startCol: col });
          traverse(sum + number);
          rollback();
        }
      }
    }
    console.log(result);

    result = Math.max(sum, result);
  }

  traverse(0);

  return result;
}

console.log(solution(matrix, rowSize, colSize))
