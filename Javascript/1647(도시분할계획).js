const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [houseCount, edgeCount] = input[0].split(' ').map(Number);
const edges = [];

for (let i = 1; i <= edgeCount; i++) {
  let [node1, node2, cost] = input[i].split(' ').map(Number);
  [node1, node2] = [node1, node2].sort((a, b) => a - b);

  edges.push({ node1, node2, cost });
}

const solution = (houseCount, edges) => {
  edges.sort((a, b) => a.cost - b.cost);

  const parents = Array.from({length: houseCount + 1}, (_, i) => i); // 0 패딩 있음

  const getParent = (node) => {
    if (parents[node] === node) return node;

    parents[node] = getParent(parents[node]);
    return parents[node];
  }

  let allCost = 0;
  let count = 1;
  let maxCost = -Infinity;

  for (const { node1, node2, cost } of edges) {
    const parent1 = getParent(node1);
    const parent2 = getParent(node2);

    if (parent1 === parent2) continue;

    parents[parent2] = parent1;
    count++;
    allCost += cost;
    maxCost = Math.max(maxCost, cost);
  }

  return allCost - maxCost;
}

console.log(solution(houseCount, edges));