const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodeCount = Number(input[0]);
const edges = input.slice(2).map(line => line.split(' ').map(Number));

const solution = (nodeCount, edges) => {
  const matrix = Array.from({ length: nodeCount + 1 }, (_, row) => Array.from({ length: nodeCount + 1 }, (_, col) => row === col));

  edges.forEach(([bigger, smaller]) => {
    matrix[bigger][smaller] = true;
  })

  for (let m = 1; m <= nodeCount; m++) {
    for (let s = 1; s <= nodeCount; s++) {
      for (let e = 1; e <= nodeCount; e++) {
        matrix[s][e] = matrix[s][e] || (matrix[s][m] && matrix[m][e]);
      }
    }
  }

  const result = [];

  for (let i = 1; i <= nodeCount; i++) {
    let possibleCount = matrix[i].reduce((acc, curr) => acc + Number(curr), 0)

    for (let row = 1; row <= nodeCount; row++) {
      if (row === i) continue;
      possibleCount += Number(matrix[row][i]);
    }

    result.push(nodeCount - possibleCount);
  }

  return result.join('\n');
}

console.log(solution(nodeCount, edges))
