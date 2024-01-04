const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, range, edgeCount] = input[0].split(' ').map(Number);
const itemCounts = input[1].split(' ').map(Number);

const edges = Array.from({ length: nodeCount }, () => Array.from({ length: nodeCount }, () => Infinity))

for (let i = 2; i < 2 + edgeCount; i++) {
  const [node1, node2, cost] = input[i].split(' ').map(Number);

  edges[node1 - 1][node2 - 1] = cost;
  edges[node2 - 1][node1 - 1] = cost;
}

for (let i = 0; i < nodeCount; i++) {
  edges[i][i] = 0;
}

const solution = (range, itemCounts, edges, nodeCount) => {
  for (let middle = 0; middle < nodeCount; middle++) {
    for (let start = 0; start < nodeCount; start++) {
      for (let end = 0; end < nodeCount; end++) {
        edges[start][end] = Math.min(edges[start][end], edges[start][middle] + edges[middle][end])
      }
    }
  }

  let result = 0;

  for (let dropPoint = 0; dropPoint < nodeCount; dropPoint++) {
    let sum = 0;

    for (let target = 0; target < nodeCount; target++) {
      if (edges[dropPoint][target] <= range) {
        sum += itemCounts[target];
      }
    }

    result = Math.max(result, sum);
  }

  return result;
}

console.log(solution(range, itemCounts, edges, nodeCount))