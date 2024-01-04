const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodeCount = Number(input[0]);
const lineCount = Number(input[1]);
const lines = [];

for (let i = 2; i < 2 + lineCount; i++) {
  const [node1, node2, cost] = input[i].split(' ').map(Number);
  lines.push({ nodes: [node1, node2].sort((a, b) => a - b), cost })
}

const solution = (nodeCount, lineCount, lines) => {
  lines.sort((a, b) => a.cost - b.cost);

  const rootPerNode = Array.from({ length: nodeCount + 1}, (_, i) => i);

  const findRoot = (node) => {
    let root = rootPerNode[node];

    if (root === node) return root;

    root = findRoot(root);
    rootPerNode[node] = root;

    return root;
  }

  const isUnionPossible = (nodes) => {
    return findRoot(nodes[0]) !== findRoot(nodes[1]);
  }

  const union = (nodes) => {
    const root1 = rootPerNode[nodes[0]];
    const root2 = rootPerNode[nodes[1]];
    let flag = false;

    if ((nodes[0] === root1) && (nodes[1] === root2)) {
      flag = true;
    }

    if (root2 < root1) {
      rootPerNode[nodes[0]] = root2;
    } else {
      rootPerNode[nodes[1]] = root1;
    }

    if (flag) return;
    union([root1, root2]);
  }

  let linkCount = 0;
  let minCost = 0;

  for (let line of lines) {
    if (linkCount >= nodeCount - 1) break;

    const { nodes, cost } = line;

    if (isUnionPossible(nodes)) {
      union(nodes);
      linkCount++;
      minCost += cost;
    }
  }

  return minCost;
}

console.log(solution(nodeCount, lineCount, lines));