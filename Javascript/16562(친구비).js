const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, edgeCount, capacity] = input[0].split(' ').map(Number);
const costs = input[1].split(' ').map(Number);
const edges = [];

for (let i = 2; i < 2 + edgeCount; i++) {
  const [node1, node2] = input[i].split(' ').map(Number);
  edges.push({ node1, node2 });
}

const solution = (costs, edges, nodeCount, capacity) => {
  costs.unshift(0) // 0 패딩;

  const roots = Array.from({ length: nodeCount + 1}, (_, i) => i);

  const getRoot = (node) => {
    if (roots[node] === node) return node;

    roots[node] = getRoot(roots[node]);
    return roots[node];
  }

  const union = ({ node1, node2 }) => {
    const root1 = getRoot(node1);
    const root2 = getRoot(node2);

    const [smaller, bigger] = [root1, root2].sort((a, b) => costs[a] - costs[b])
    roots[bigger] = roots[smaller];
  }

  edges.forEach(union);
  costs.forEach((_, node) => getRoot(node)) // 최종 root 업데이트

  const minCostSum = [...new Set(roots)].reduce((acc, curr) => acc + costs[curr], 0);

  return minCostSum > capacity ? 'Oh no' : minCostSum;
}

console.log(solution(costs, edges, nodeCount, capacity));
