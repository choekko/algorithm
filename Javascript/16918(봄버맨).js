const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const targetSecond = Number(input[0].split(' ')[2]);
const matrix = input.slice(1).map(line => line.split(''));

const solution = (matrix, targetSecond) => {
  const getEmptyMatrix = () => Array(rowSize).fill().map(() => Array(colSize).fill(false));
  const rowSize = matrix.length;
  const colSize = matrix[0].length;
  const dRow = [0, -1, 0, 1, 0] // 가운데 북 동 남 서
  const dCol = [0, 0, 1, 0, -1]

  let currentSecond = 1;
  let phase = 'FILL' // 'FILL' | 'BOMB';
  let bombAboutToExplodeMatrix = getEmptyMatrix();

  while (currentSecond < targetSecond) {
    currentSecond++;

    if (phase === 'BOMB') {
      for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < colSize; col++) {
          if (!bombAboutToExplodeMatrix[row][col]) continue;

          for (let i = 0; i < dRow.length; i++) {
            const targetRow = row + dRow[i];
            const targetCol = col + dCol[i];

            if (targetRow >= rowSize || targetRow < 0 || targetCol >= colSize || targetCol < 0) continue;
            matrix[targetRow][targetCol] = '.';
          }
          bombAboutToExplodeMatrix[row][col] = false;
        }
      }
    }
    
    if (phase === 'FILL') {
      for (let row = 0; row < rowSize; row++) {
        for (let col = 0; col < colSize; col++) {
          if (matrix[row][col] === 'O') {
            bombAboutToExplodeMatrix[row][col] = true;
          } else {
            matrix[row][col] = 'O';
          }
        }
      }
    }
    
    phase = phase === 'FILL' ? 'BOMB' : 'FILL';
  }

  return matrix.map(line => line.join('')).join('\n');
}

console.log(solution(matrix, targetSecond))