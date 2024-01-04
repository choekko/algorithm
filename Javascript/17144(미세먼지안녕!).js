const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize, targetTime] = input[0].split(' ').map(Number);

const matrix = [];
const dustPositions = [];

const cleanerPosition = {
  upper: null,
  lower: null,
}
for (let i = 1; i <= rowSize; i++) {
  const line = input[i].trim().split(' ').map(Number);

  matrix.push(line);
}

for (let row = 0; row < rowSize; row++) {
  for (let col = 0; col < colSize; col++) {
    const value = matrix[row][col];

    if (value === -1) {
      const type = cleanerPosition.upper ? 'lower' : 'upper';
      cleanerPosition[type] = { row, col };
      continue;
    }

    if (value) {
      dustPositions.push({ row, col });
    }
  }
}

const solution = (matrix, cleanerPosition, dustPositions, targetTime) => {

  const rotate = () => {
    const { row: upperRow } = cleanerPosition.upper;

    let tmp1;
    let tmp2;
    for (let col = colSize - 1; col >= 1; col--) {
      if (col === colSize - 1) {
        tmp1 = matrix[upperRow][col];
      }
      matrix[upperRow][col] = matrix[upperRow][col - 1] === -1 ? 0 : matrix[upperRow][col - 1];
    }
    tmp2 = tmp1;
    if (upperRow > 0) {
      for (let row = 0; row < upperRow; row++) {
        if (row === 0) {
          tmp1 = matrix[0][colSize - 1];
        }
        matrix[row][colSize - 1] = row === upperRow - 1 ? tmp2 : matrix[row + 1][colSize - 1];
      }
      tmp2 = tmp1;
      for (let col = 0; col < colSize - 1; col++) {
        if (col === 0) {
          tmp1 = matrix[0][col];
        }
        matrix[0][col] = col === colSize - 2 ? tmp2 : matrix[0][col + 1];
      }
      tmp2 = tmp1;
      for (let row = upperRow; row > 0; row--) {
        if (matrix[row][0] === -1) continue;
        matrix[row][0] = row === 1 ? tmp2 : matrix[row - 1][0];
      }
    }

    const { row: lowerRow } = cleanerPosition.lower

    for (let col = colSize - 1; col > 0; col--) {
      if (col === colSize - 1) {
        tmp1 = matrix[lowerRow][col];
      }
      matrix[lowerRow][col] = matrix[lowerRow][col - 1] === -1 ? 0 : matrix[lowerRow][col - 1];
    }
    tmp2 = tmp1;
    if (lowerRow < rowSize - 1) {
      for (let row = rowSize - 1; row > lowerRow; row--) {
        if (row === rowSize - 1) {
          tmp1 = matrix[row][colSize - 1];
        }
        matrix[row][colSize - 1] = row === lowerRow + 1 ? tmp2 : matrix[row - 1][colSize - 1];
      }
      tmp2 = tmp1;
      for (let col = 0; col < colSize - 1; col++) {
        if (col === 0) {
          tmp1 = matrix[rowSize - 1][col];
        }
        matrix[rowSize - 1][col] = col === colSize - 2 ? tmp2 : matrix[rowSize - 1][col + 1];
      }
      tmp2 = tmp1;
      for (let row = lowerRow; row < rowSize - 1; row++) {
        if (matrix[row][0] === -1) continue;
        matrix[row][0] = row === rowSize - 2 ? tmp2 : matrix[row + 1][0];
      }
    }
  }

  const diffuse = () => {
    const dRows = [-1, 0, 1, 0] // 북 동 남 서
    const dCols = [0, 1, 0, -1]
    const newMatrix = Array(rowSize).fill(0).map((_, row) => Array(colSize).fill(0).map((_, col) => matrix[row][col]));

    while (dustPositions.length) {
      const { row, col } = dustPositions.pop();
      const amount = matrix[row][col];

      for (let i = 0; i < dRows.length; i++) {
        const nextRow = row + dRows[i];
        const nextCol = col + dCols[i];

        if (nextRow < 0 || nextRow >= rowSize || nextCol < 0 || nextCol >= colSize || matrix[nextRow][nextCol] === -1) continue;

        newMatrix[nextRow][nextCol] += Math.floor(amount / 5);
        newMatrix[row][col] -= Math.floor(amount / 5);
      }
    }

    matrix = newMatrix;
  }

  const updateDustPositions = () => {
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        const value = matrix[row][col];

        if (value === -1) continue;

        if (value) {
          dustPositions.push({ row, col });
        }
      }
    }
  }

  for (let time = 1; time <= targetTime; time++) {
    diffuse();
    rotate();
    updateDustPositions();
  }

  return dustPositions.reduce((acc, { row, col }) => acc + matrix[row][col], 0);
}

console.log(solution(matrix, cleanerPosition, dustPositions, targetTime))