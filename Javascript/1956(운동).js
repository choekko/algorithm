const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, edgeCount] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(line => {
  const [start, end, cost] = line.split(' ').map(Number);
  return { start, end, cost };
})

const solution = (nodeCount, edges) => {
  const matrix = Array.from({ length: nodeCount + 1}, () => Array.from({ length: nodeCount + 1 }, () => Infinity)); // 0 패딩 있음
  
  edges.forEach(({ start, end , cost }) => {
    matrix[start][end] = cost;
  })
  
  for (let middle = 1; middle <= nodeCount; middle++) {
    for (let start = 1; start <= nodeCount; start++) {
      for (let end = 1; end <= nodeCount; end++) {
        matrix[start][end] = Math.min(matrix[start][end], matrix[start][middle] + matrix[middle][end]);
      }
    }
  }

  let result = Infinity;
  for (let i = 1; i <= nodeCount; i++) {
    result = Math.min(result, matrix[i][i]);
  }

  return result === Infinity ? -1 : result;
  
  
  
}

console.log(solution(nodeCount, edges));
