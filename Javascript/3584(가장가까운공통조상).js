const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const testCaseCount = Number(input[0]);
const testCases = [];

let i = 1;
let count = 0;
while (count < testCaseCount) {
  const nodeCount = Number(input[i++]);

  const edges = [];
  const startIdx = i;
  for (; i < startIdx + nodeCount - 1; i++) {
    const [parent, child] = input[i].split(' ').map(Number);

    edges.push({ parent, child });
  }
  const targets = input[i++].split(' ').map(Number);

  testCases.push({ nodeCount, edges, targets });
  count++;
}

const solution = (testCases) => {

  const getAncestors = (parents, node) => {
    const ancestors = [node];

    while (true) {
      const parent = parents[node];
      if (!parent) break;

      ancestors.push(parent);
      node = parent;
    }

    return ancestors;
  }
  const getCommonAncestor = (testCase) => {
    const { nodeCount, edges, targets } = testCase;

    const parents = Array.from({ length: nodeCount + 1 }, () => null) // 0 패딩 있음

    for (const { parent, child } of edges) {
      parents[child] = parent;
    }

    let [node1, node2] = targets;

    const node1Ancestors = getAncestors(parents, node1)
    const node2Ancestors = getAncestors(parents, node2)

    const checker = {};

    node1Ancestors.forEach(ancestor => {
      checker[ancestor] = 1;
    })

    for (const ancestor of node2Ancestors) {
      if (checker[ancestor]) {
        return ancestor;
      }
    }

    return null;
  }

  return testCases.map(getCommonAncestor).join('\n');
}


console.log(solution(testCases));
