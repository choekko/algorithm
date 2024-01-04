const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [source1, source2] = input;

const solution = (source1, source2) => {
  const matrix = Array.from({ length: source1.length }, () => Array.from({ length: source2 }, () => 0));

  for (let i = 0; i < source1.length; i++) {
    for (let j = 0; j < source2.length; j++) {
      if (source1[i] === source2[j]) {
        matrix[i][j] = (matrix[i - 1]?.[j - 1] ?? 0) + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1]?.[j] ?? 0, matrix[i][j - 1] ?? 0);
      }
    }
  }

  return matrix[source1.length - 1][source2.length - 1];
}

console.log(solution(source1, source2));
