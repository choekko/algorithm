const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1).map(line => line.split(' ').map(Number));



const solution = (matrix) => {
  const D_ROWS = [-1, 0, 0, 1]; // 북 동 서 남
  const D_COLS = [0, -1, 1, 0]
  const size = matrix.length;
  let checker;
  const initChecker = (sharkPosition) => {
    checker = Array.from({length: size}, (_, row) => Array.from({length: size}, (_, col) => {
      return row === sharkPosition.row && col === sharkPosition.col;
    }));
  }

  // const viewShark = (sharkPosition, sharkLevel) => {
  //   for (let i = 0; i < size; i++) {
  //     const tmp = [];
  //     for (let j = 0; j < size; j++) {
  //       if (sharkPosition.row === i && sharkPosition.col === j) {
  //         tmp.push(`X`);
  //         continue;
  //       }
  //       tmp.push(matrix[i][j]);
  //     }
  //     console.log(tmp.join(''));
  //   }
  //   console.log(`[${sharkLevel}]\n`);
  // }


  let sharkPosition;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] === 9) {
        sharkPosition = { row, col };
        matrix[row][col] = 0;
      }
    }
  }

  let result = 0;
  let sharkLevel = 2;
  let eatingCount = 0;

  loop: while (true) {
    initChecker(sharkPosition);
    let queue = [];
    let bucket = [];

    for (let i = 0; i < D_ROWS.length; i++) {
      const newRow = sharkPosition.row + D_ROWS[i];
      const newCol = sharkPosition.col + D_COLS[i];

      if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size || checker[newRow][newCol]) continue;
      bucket.unshift({ row: newRow, col: newCol, additionalCost: 1 });
      checker[newRow][newCol] = true;
    }

    while (queue.length || bucket.length) {

      if (!queue.length) {
        queue = bucket.sort((a, b) => {
          if (b.row === a.row) {
            return b.col - a.col;
          }
          return b.row - a.row;
        })
        bucket = [];
      }

      const { row, col, additionalCost } = queue.pop();

      const value = matrix[row][col];
      if (value > sharkLevel) continue;
      if (value && value < sharkLevel) {
        eatingCount++;
        if (eatingCount === sharkLevel) {
          sharkLevel++;
          eatingCount = 0;
        }
        result += additionalCost;
        sharkPosition = { row, col }
        // viewShark(sharkPosition, sharkLevel)
        matrix[row][col] = 0;
        continue loop;
      }

      for (let i = 0; i < D_ROWS.length; i++) {
        const newRow = row + D_ROWS[i];
        const newCol = col + D_COLS[i];

        if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size || checker[newRow][newCol]) continue;
        bucket.unshift({ row: newRow, col: newCol, additionalCost: additionalCost + 1 });
        checker[newRow][newCol] = true;
      }
    }

    return result;
  }
}

console.log(solution(matrix))