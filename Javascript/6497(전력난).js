const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const testCases = [];

let i = 0
while (i < input.length - 1) {
  const [houseCount, edgesCount] = input[i++].split(' ').map(Number);
  const edges = input.slice(i, i + edgesCount).map(line => {
    const [node1, node2, cost] = line.split(' ').map(Number);
    return { node1, node2, cost };
  });
  testCases.push({ houseCount, edges });
  i += edgesCount;
}

const solution = (testCases) => {

  const getSavingCosts = ({ houseCount, edges }) => {
    const allCost = edges.reduce((acc, { cost }) => acc + cost, 0);

    edges.sort((a, b) => a.cost - b.cost);

    const roots = Array.from({ length: houseCount + 1 }, (_, idx) => idx);

    const getRoot = (node) => {
      const root = roots[node];

      if (root === node) return root;

      return roots[node] = getRoot(root);
    }

    const union = (node1, node2) => {
      const root1 = getRoot(node1);
      const root2 = getRoot(node2);

      if (root1 === root2) return false;

      const [bigger, smaller] = [root1, root2].sort((a, b) => b - a);

      roots[bigger] = smaller;
      return true;
    }

    let count = 1;
    let realCostSum = 0;

    for (const { node1, node2, cost } of edges ) {
      const isLinked = union(node1, node2);

      if (isLinked) {
        count++;
        realCostSum += cost;
      }

      if (count === houseCount) break;
    }

    return allCost - realCostSum;
  }

  return testCases.map(getSavingCosts).join('\n');

}

console.log(solution(testCases))