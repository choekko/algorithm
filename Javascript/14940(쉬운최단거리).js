const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1).map(line => line.trim().split(' ').map(Number));

const solution = (matrix) => {
  const resultMatrix = Array(matrix.length).fill(0).map(() => Array(matrix[0].length).fill(-1));

  let goal;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === 2) {
        goal = { row, col };
      }
      if (matrix[row][col] === 0) {
        resultMatrix[row][col] = 0;
      }
    }
  }

  const dRow = [-1, 0, 1, 0]; // 북 동 남 서
  const dCol = [0, 1, 0, -1];
  const queue = [{ row: goal.row, col: goal.col, movingCount: 0 }];

  while (queue.length) {
    const { row, col, movingCount } = queue.shift();

    if (resultMatrix[row][col] !== -1) continue;

    resultMatrix[row][col] = movingCount;

    for (let idx = 0; idx < dRow.length; idx++) {
      const nextRow = row + dRow[idx];
      const nextCol = col + dCol[idx];

      if (nextRow < 0 || nextRow >= matrix.length || nextCol < 0 || nextCol >= matrix[0].length) {
        continue;
      }

      queue.push({ row: nextRow, col: nextCol, movingCount: movingCount + 1 });
    }
  }

  return resultMatrix.map(line => line.join(' ')).join('\n');
}

console.log(solution(matrix));