const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (matrix) => {
  const ROW_SIZE = matrix.length;
  const COL_SIZE = matrix[0].length;
  const D_ROWS = [-1, 0, 1, 0] // 북 동 남 서
  const D_COLS = [0, 1, 0, -1]

  let icebergPositions = [];

  for (let row = 0; row < ROW_SIZE; row++) {
    for (let col = 0; col < COL_SIZE; col++) {
      if (matrix[row][col]) {
        icebergPositions.push({ row, col });
      }
    }
  }

  const checkIsLinked = () => {
    const queue = [icebergPositions[0]];
    const checker = {};
    checker[`${icebergPositions[0].row},${icebergPositions[0].col}`] = true;
    let count = 1;

    while (queue.length) {
      const { row, col } = queue.shift();

      for (let dirIdx = 0; dirIdx < D_COLS.length; dirIdx++) {
        const nextRow = row + D_ROWS[dirIdx];
        const nextCol = col + D_COLS[dirIdx];


        if (nextRow >= ROW_SIZE || nextCol >= COL_SIZE || nextRow < 0 || nextCol < 0 || checker[`${nextRow},${nextCol}`] || !matrix[nextRow][nextCol]) continue;
        checker[`${nextRow},${nextCol}`] = true;
        queue.push({ row: nextRow, col: nextCol });
        count++;
      }
    }

    if (count === icebergPositions.length) return true;
    return false;
  }

  const melt = () => {
    const newIceBergPositions = [];
    while (icebergPositions.length) {
      const { row, col } = icebergPositions.pop();
      let meltingCount = 0;

      for (let dirIdx = 0; dirIdx < D_COLS.length; dirIdx++) {
        const nextRow = row + D_ROWS[dirIdx];
        const nextCol = col + D_COLS[dirIdx];

        if (nextRow >= ROW_SIZE || nextCol >= COL_SIZE || nextRow < 0 || nextCol < 0 || matrix[nextRow][nextCol]) continue;
        meltingCount += 1;
      }

      const remainHeight  = Math.max(matrix[row][col] - meltingCount, 0);
      newIceBergPositions.push({ row, col, remainHeight });
    }
    icebergPositions = []
    newIceBergPositions.forEach(({ row, col, remainHeight }) => {
      matrix[row][col] = remainHeight;
      if (remainHeight) {
        icebergPositions.push({ row, col })
      }
    })
  }

  let time = 0;
  while (icebergPositions.length) {
    // console.log(matrix.map(line => line.join(' ')).join('\n'))
    // console.log('------', time)
    if (!checkIsLinked()) {
      return time
    }
    melt();
    time++;
  }

  return 0;
}

console.log(solution(matrix))
