const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [holdCount, targetRow] = input[0].split(' ').map(Number);

const holds = [];

for (let i = 1; i < holdCount + 1; i++) {
  const [col, row] = input[i].split(' ').map(Number); // 거꾸로 보기
  holds.push({ row, col });
}

const solution = (holds, targetRow) => {
  const map = {};

  for (const { row, col } of holds) {
    if (map[row]) {
      map[row][col] = 1; // 1: 홀드 있음, 2: 이미 방문
    } else {
      map[row] = { [col]: 1 }
    }
  }


  const queue = [{ row: 0, col: 0, order: 0 }];

  const checkAround = ({ row, col, order }) => {
    const dRows = [-2, -1, 0, 1, 2];
    const dCols = [-2, -1, 0, 1, 2];

    for (const dRow of dRows) {
      for (const dCol of dCols) {
        if (dRow === 0 && dCol === 0) continue;

        const newRow = row + dRow;
        const newCol = col + dCol;

        if (newRow < 0 || newRow > targetRow || newCol < 0) continue;
        if (map[newRow]?.[newCol] === 1) {
          queue.push({ row: newRow, col: newCol, order: order + 1 });
          map[newRow][newCol] = 2;
        }
      }
    }
  }

  while (queue.length) {
    const { row, col, order } = queue.shift();

    if (row === targetRow) return order;
    checkAround({ row, col, order });
  }

  return -1;
}

console.log(solution(holds, targetRow));