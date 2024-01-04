const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize, count] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (matrix, rowSize, colSize, count) => {
  const rotate = () => {
    const minSize = Math.min(rowSize, colSize);
    for (let end = minSize - 1; end >= Math.floor(minSize / 2) + minSize % 2; end--) {
      const size = minSize - (minSize - end - 1) * 2
      const _count = count % ((size - 1) * 4)

      for (let i = 0; i < _count ; i++) {

        const tmp = matrix[end][end];

        let row = end;
        let col = end;
        let rowOffset = 0;
        let colOffset = -1;

        while (true) {
          if (col === colSize - 1 - end && colOffset === -1) {
            rowOffset = -1;
            colOffset = 0;
          } else if (row === rowSize - 1 - end && rowOffset === -1) {
            rowOffset = 0;
            colOffset = 1;
          } else if (col === end && colOffset === 1) {
            rowOffset = 1;
            colOffset = 0;
          }

          if (row === end - 1 && col === end) {
            matrix[row][col] = tmp;
            break;
          }

          matrix[row][col] = matrix[row + rowOffset][col + colOffset];

          row += rowOffset;
          col += colOffset;
        }
      }
    }
  }

  rotate();


  return matrix.map(line => line.join(' ')).join('\n');
}

console.log(solution(matrix, rowSize, colSize, count));