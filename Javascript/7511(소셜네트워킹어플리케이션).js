const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const testCaseCount = Number(input[0]);

const testCases = [];
let i = 1;
let count = 0;
while (count < testCaseCount) {
  const userCount = Number(input[i++]);
  const edgeCount = Number(input[i++]);
  const edges = [];
  const edgeBoundary = i + edgeCount;

  for (; i < edgeBoundary; i++) {
    edges.push(input[i].split(' ').map(Number));
  }

  const pairCount = Number(input[i++]);
  const pairs = [];
  const pairBoundary = i + pairCount;
  for (; i < pairBoundary; i++) {
    pairs.push(input[i].split(' ').map(Number));
  }

  testCases.push({ userCount, edges, pairs });
  count++;
}

const solution = (testCases) => {
  const getResult = (testCase) => {
    const { userCount, edges, pairs } = testCase;

    const roots = Array.from({ length: userCount }, (_, idx) => idx);

    const getParent = (node) => {
      const root = roots[node];

      if (root === node) return node;

      return roots[node] = getParent(root);
    }

    const union = (node1, node2) => {
      const root1 = getParent(node1);
      const root2 = getParent(node2);

      if (root1 === root2) return false;

      const [bigger, smaller] = [root1, root2].sort((a, b) => b - a);

      roots[bigger] = smaller;
      getParent(bigger);

      return true;
    }

    edges.forEach(([node1, node2]) => {
      union(node1, node2);
    })

    const result = [];

    for (const [node1, node2] of pairs) {
      if (roots[node1] === roots[node2]) {
        result.push(1);
        continue;
      }
      result.push(0);
    }

    return result;
  }

  return testCases.map((testCase, idx) => {
    const result = [`Scenario ${idx + 1}:`, ...getResult(testCase)];
    return result.join('\n');
  }).join('\n\n');
}

console.log(solution(testCases))