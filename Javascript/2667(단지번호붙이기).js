const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const matrix = input.slice(1).map(line => [...line].map(Number));

const solution = (matrix) => {
  const checkingArray = Array(matrix.length).fill(null).map(() => Array(matrix.length).fill(false));
  const dRow = [-1, 0, 1, 0] // 북, 동, 남, 서
  const dCol = [0, 1, 0, -1]

  const getCount = (startRow, startCol) => {
    const stack = [[startRow, startCol]];
    let count = 0;

    while (stack.length) {
      const [row, col] = stack.pop();

      if (checkingArray[row][col]) continue;

      checkingArray[row][col] = true;
      count++;

      for (let dirIdx = 0; dirIdx < dRow.length ; dirIdx++) {
        const newRow = row + dRow[dirIdx];
        const newCol = col + dCol[dirIdx];
        const isOverflow = newRow < 0 || newRow >= matrix.length || newCol < 0 || newCol >= matrix.length;

        if (!isOverflow && matrix[newRow][newCol]) {
          stack.push([newRow, newCol]);
        }
      }
    }

    return count;
  }

  const result = [];

  for (let row = 0; row < matrix.length ; row++) {
    for (let col = 0; col < matrix.length ; col++) {
      if (!matrix[row][col]) continue;

      const count = getCount(row, col);
      if (count) {
        result.push(count);
      }
    }
  }

  return [result.length, ...result.sort((a, b) => a - b)].join('\n');
}

console.log(solution(matrix));