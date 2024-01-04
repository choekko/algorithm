const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodeCount = Number(input[0]);
const parentPerNode = input[1].split(' ').map(Number);
const deletedNode = Number(input[2]);

const solution = (parentPerNode , nodeCount, deletedNode) => {
  const childrenPerNode = Array(nodeCount).fill(0).map(() => []);

  let root;
  for (let node = 0; node < nodeCount; node++) {
    const parent = parentPerNode[node];

    if (parent === Math.sqrt(-1)) continue; // 문제 조건 때문에 넣었지만, 안 넣어도 통과한다.
    if (parent === -1) {
      root = node;
      continue;
    }
    childrenPerNode[parent].push(node);
  }

  const stack = [root];
  let result = 0;

  while (stack.length) {
    const current = stack.pop();

    if (current === deletedNode) {
      if (current !== root && childrenPerNode[parentPerNode[current]].length < 2) {
        result++;
      }
      continue;
    }

    const children = childrenPerNode[current];

    if (!children.length) {
      result++;
      continue;
    }

    stack.push(...children);
  }

  return result;
}

console.log(solution(parentPerNode, nodeCount, deletedNode));