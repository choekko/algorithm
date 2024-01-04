const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize, maxTime] = input[0].split(' ').map(Number);

const map = [];

for (let i = 1; i < rowSize + 1; i++) {
  const line = input[i].split(' ').map(Number);
  map.push(line);
}

const solution = (map, maxTime, rowSize, colSize) => {
  const dRows = [-1, 0, 1, 0]; // 북 동 남 서
  const dCols = [0, 1, 0, -1];

  const queue = [{ row: 0, col: 0, time: 0, isWithSword: false }];
  map[0][0] = 3 // 방문 표시

  let minTime = Infinity;

  const updateMinTime = (timeCost) => {
    if (timeCost <= maxTime) {
      minTime = Math.min(minTime, timeCost);
    }
  }

  while (queue.length) {
    const { row, col, time, isWithSword } = queue.shift();

    if (row === rowSize - 1 && col === colSize - 1) {
      updateMinTime(time);
      continue;
    }
    if (isWithSword) {
      const timeCost = time + (rowSize - 1 - row) + (colSize - 1 - col);

      updateMinTime(timeCost)
      continue;
    }

    for (let i = 0; i < dRows.length; i++) {
      const newRow = row + dRows[i];
      const newCol = col + dCols[i];

      if (newRow < 0 || newRow >= rowSize || newCol < 0 || newCol >= colSize) continue;

      const nextPosition = map[newRow][newCol];
      if ([1, 3].includes(nextPosition)) continue;

      queue.push({ row: newRow, col: newCol, time: time + 1, isWithSword: nextPosition === 2 });
      map[newRow][newCol] = 3;
    }
  }

  return minTime === Infinity ? 'Fail' : minTime;
}

console.log(solution(map, maxTime, rowSize, colSize))