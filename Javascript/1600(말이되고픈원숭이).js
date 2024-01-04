const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.platform === "linux" ? process.stdin : fs.createReadStream('input.txt') ,
  output: process.stdout,
  terminal: false,
});
const input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const maxHorseCount = Number(input[0]);
  const matrix = input.slice(2).map(line => line.split(' ').map(Number));

  console.log(solution(maxHorseCount, matrix));
  process.exit();
});


const solution = (maxHorseCount, matrix) => {
  const D_ROWS = [-1, 0, 1, 0, -1, -2, 1, 2, 1, 2, -1, -2] // 북 동 남 서 말-
  const D_COLS = [0, 1, 0, -1, 2, 1, -2, -1, 2, 1, -2, -1]

  const ROW_SIZE = matrix.length;
  const COL_SIZE = matrix[0].length;
  const checker = Array.from({length: ROW_SIZE}, () => Array.from({length: COL_SIZE}, () => Array.from({ length: maxHorseCount + 1 }, () => false)))

  let queue = [{ row: 0, col: 0, horseCount: 0, count: 0}];
  let bucket = [];

  while (queue.length || bucket.length) {
    const { row, col, horseCount, count  } = queue.pop();

    if (row === ROW_SIZE - 1 && col === COL_SIZE - 1) {
      return count;
    }

    for (let i = 0; i < D_ROWS.length; i++) {
      if (i >= 4 && horseCount >= maxHorseCount) break;

      const nextRow = row + D_ROWS[i];
      const nextCol = col + D_COLS[i];
      const nextHorseCount = horseCount + (i >= 4);

      if (nextRow < 0 || nextCol < 0 || nextRow >= ROW_SIZE || nextCol >= COL_SIZE || checker[nextRow][nextCol][nextHorseCount] || matrix[nextRow][nextCol]) continue;
      checker[nextRow][nextCol][nextHorseCount] = true;

      bucket.push({ row: nextRow, col: nextCol, horseCount: nextHorseCount, count: count + 1})
    }

    if (!queue.length) {

      queue = bucket;
      bucket = [];
    }
  }

  return -1;
}


