const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = [];

for (let i = 1; i <= rowSize; i++) {
  const line = input[i].split(' ').map(Number);
  matrix.push(line);
}

const solution = (matrix, rowSize, colSize) => {
  const dRows = [-1, 0, 1, 0];
  const dCols = [0, 1, 0, -1];
  const traverse = () => {
    // 1 : delete, 0: non-visit, -1: checking;
    const deleteMarks = Array.from({ length: rowSize }, (_, row) => Array.from({length: colSize}, (_, col) => 0));
    let deleteCount = 0;

    const queue = [{ row: 0, col: 0 }];

    while (queue.length) {
      const { row, col } = queue.pop();

      for (let i = 0; i < dRows.length; i++) {
        const targetRow = row + dRows[i];
        const targetCol = col + dCols[i];

        if (targetRow < 0 || targetRow >= rowSize || targetCol < 0 || targetCol >= colSize || deleteMarks[targetRow][targetCol]) continue;
        if (matrix[targetRow][targetCol]) {
          deleteMarks[targetRow][targetCol] = 1;
          deleteCount++;
        } else {
          queue.unshift({ row: targetRow, col: targetCol });
          deleteMarks[targetRow][targetCol] = -1;
        }
      }
    }

    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        if (matrix[row][col] && deleteMarks[row][col] === 1) {
          matrix[row][col] = 0;
        }
      }
    }

    return deleteCount;
  }

  let prevDeleteCount = 0;
  let time = 0;
  while (true) {
    const deleteCount = traverse();
    if (!deleteCount) {
      return `${time}\n${prevDeleteCount}`;
    }
    time++;
    prevDeleteCount = deleteCount
  }
}

console.log(solution(matrix, rowSize, colSize))