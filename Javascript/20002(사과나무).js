const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const size = Number(input[0]);
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (size, matrix) => {
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      matrix[row][col] += matrix[row - 1]?.[col] ?? 0;
    }
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      matrix[row][col] += matrix[row][col - 1] ?? 0;
    }
  }

  let maxProfit = -Infinity;

  Array.from({ length: size }, (_, idx) => idx + 1).forEach(sectionSize => {
    for (let row = 0; row < size; row++) {
      const sectionMaxRow = row + sectionSize - 1;

      if (sectionMaxRow >= size) break;

      for (let col = 0; col < size; col++) {
        const sectionMaxCol = col + sectionSize - 1;


        if (sectionMaxCol >= size) break;

        const profit = matrix[sectionMaxRow][sectionMaxCol]
          - (matrix[row - 1]?.[sectionMaxCol] ?? 0)
          - (matrix[sectionMaxRow][col - 1] ?? 0)
          + (matrix[row - 1]?.[col - 1] ?? 0)

        maxProfit = Math.max(maxProfit, profit);
      }
    }
  })

  return maxProfit;

}

console.log(solution(size, matrix))