const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, edgesCount] = input[0].split(' ').map(Number);
const edges = Array.from({ length: nodeCount }, () => []); // 0 패딩 있음

for (let i = 1; i <= edgesCount; i++) {
  const [node1, node2] = input[i].split(' ').map(Number);
  edges[node1].push(node2);
  edges[node2].push(node1);
}

const solution = (edges, nodeCount) => {
  const flags = Array(nodeCount).fill(0);

  const traverse = (node, flags, depth) => {
    if (depth === 5) {
      return true;
    }
    const nextNodes = edges[node];

    for (const nextNode of nextNodes) {
      if (flags[nextNode]) continue;

      flags[nextNode] = 1;
      const result = traverse(nextNode, flags, depth + 1);
      if (result) return result;
      flags[nextNode] = 0;
    }
    return false;
  }

  for (let node = 0; node < nodeCount; node++) {
    flags[node] = 1;
    const result = traverse(node, flags, 1);

    if (result) return 1;
    flags[node] = 0;
  }

  return 0
}

console.log(solution(edges, nodeCount));