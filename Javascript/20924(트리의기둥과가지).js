const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, root] = input[0].split(' ').map(Number);
const nodes = Array.from({ length: nodeCount + 1 }, () => []);

input.slice(1).forEach(line => {
  const [node1, node2, cost] = line.split(' ').map(Number);
  nodes[node1].push({ node: node2, cost });
  nodes[node2].push({ node: node1, cost });
})

const solution = (nodes, root) => {
  let pillarLength = 0;
  let maxBranchLength = -Infinity;
  const checkingArray = Array.from({ length: nodeCount + 1 }, () => false);

  let current = root;
  let prev = null
  while (true) {
    checkingArray[current] = true;
    const nextNodes = nodes[current].filter(({ node }) => node !== prev);

    if (nextNodes.length !== 1) break;

    const { node: nextNode, cost } = nextNodes[0]
    prev = current;
    current = nextNode;
    pillarLength += cost;
  }



  const dfs = (current, costSum) => {
    const nextNodes = nodes[current];

    for (const { node, cost } of nextNodes) {
      if (checkingArray[node]) continue;

      checkingArray[node] = true;
      dfs(node, costSum + cost);
      checkingArray[node] = false;
    }

    maxBranchLength = Math.max(maxBranchLength, costSum);
  }

  dfs(current, 0);

  return [pillarLength, maxBranchLength].join(' ');
}

console.log(solution(nodes, root))