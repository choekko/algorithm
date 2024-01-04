const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map(line => line.split(''));

const solution = (matrix, rowSize, colSize) => {
  const checkingMatrix = Array.from({length: rowSize}, () => Array.from({length: colSize}, () => false));
  const dRows = [0, 1, 0, -1];
  const dCols = [1, 0, -1, 0]
  const drawMaxCross = (row, col) => {
    if (checkingMatrix[row]?.[col] || matrix[row]?.[col]=== '.') {
      return 0;
    }

    let size = 1;

    while (true) {
      const positions = [];
      for (let dirIdx = 0; dirIdx < dRows.length; dirIdx++) {
        const newRow = row + dRows[dirIdx] * size;
        const newCol = col + dCols[dirIdx] * size;
        const value = matrix[newRow]?.[newCol];

        if (newRow < 0 || newRow >= rowSize || newCol < 0 || newCol >= colSize || checkingMatrix[newRow][newCol] || value === '.') return size;
        positions.push({row: newRow, col: newCol});
      }
      positions.forEach(({ row, col }) => checkingMatrix[row][col] = true)
      size++;
    }
  }

  const rollbackCross = (row, col, size) => {
    checkingMatrix[row][col] = false;

    for (let i = 1; i <= size; i++) {
      for (let dirIdx = 0; dirIdx < dRows.length; dirIdx++) {
        const newRow = row + dRows[dirIdx] * i;
        const newCol = col + dCols[dirIdx] * i;

        checkingMatrix[newRow][newCol] = false;
      }
    }
  }

  let result = 0;
  for (let row = 0; row <= rowSize; row++) {
    for (let col = 0; col <= colSize; col++) {
      const firstCrossSize = drawMaxCross(row, col);
      console.log(firstCrossSize)
      if (!firstCrossSize) continue;

      for (let _row = 0; _row <= rowSize; _row++) {
        for (let _col = 0; _col <= colSize; _col++) {
          const secondCrossSize = drawMaxCross(_row, _col);

          console.log(checkingMatrix);
          if (!secondCrossSize) continue;

          result = Math.max(result, firstCrossSize * secondCrossSize);
          rollbackCross(_row, _col, secondCrossSize);
        }
      }

      rollbackCross(row, col, firstCrossSize);
    }
  }

  return result;
}

console.log(solution(matrix, rowSize, colSize));

