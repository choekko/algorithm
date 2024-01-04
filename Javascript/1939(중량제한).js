const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, edgeCount] = input[0].split(' ').map(Number);
const edges = Array.from({ length: nodeCount + 1}, (_, i) => []); // 0 패딩

let maxLimitInEdges = -Infinity;

for (let i = 1; i <= edgeCount; i++) {
  const [node1, node2, limit] = input[i].split(' ').map(Number);

  edges[node1].push({ node: node2, limit });
  edges[node2].push({ node: node1, limit });
  maxLimitInEdges = Math.max(maxLimitInEdges, limit);
}

const [start, end] = input[edgeCount + 1].split(' ').map(Number);

const solution = (edges, start, end) => {
  let left = 0;
  let right = maxLimitInEdges;
  let result = null;

  loop: while (true) {
    if (left > right) break;
    const middle = Math.floor((left + right) / 2);

    const queue = [{ node: start, limit: Infinity, bitMask: 1 << (start - 1)}];

    while (queue.length) {
      const { node: current, limit, bitMask } = queue.pop();

      if (limit < middle) continue;

      if (current === end) {
        left = middle + 1;
        result = middle;
        continue loop;
      }

      for (const { node: next, limit } of edges[current]) {
        if (bitMask & (1 << (next - 1))) continue;
        queue.unshift({ node: next, limit, bitMask: bitMask | (1 << (next - 1)) });
      }
    }

    right = middle - 1;
  }

  return result;
}

console.log(solution(edges, start, end));