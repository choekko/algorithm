const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (nodeCount, edges) => {
  const roots = Array.from({ length: nodeCount + 1}, (_, idx) => idx);
  const getRoot = (node) => {
    const root = roots[node];

    if (root === node) return root;

    return roots[node] = getRoot(root);
  }

  const union = (node1, node2) => {
    const root1 = getRoot(node1);
    const root2 = getRoot(node2);

    if (root1 === root2) return false;

    const [bigger, smaller] = [root1, root2].sort((a, b) =>  b - a);

    roots[bigger] = smaller;

    return true;
  }

  for (let i = 0; i < edges.length; i++) {
    const [node1, node2] = edges[i];

    if (!union(node1, node2)) {
      return i + 1;
    }
  }

  return 0;
}

console.log(solution(nodeCount, edges))