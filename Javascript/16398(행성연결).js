const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const size = Number(input[0]);
const matrix = [];

for (let i = 1; i <= size; i++) {
  const line = input[i].split(' ').map(Number);
  matrix.push(line);
}

const paths = [];

for (let node1 = 0; node1 < size; node1++) {
  for (let node2 = node1 + 1; node2 < size; node2++) {
    paths.push({ node1, node2, cost: matrix[node1][node2] });
  }
}

const solution = (paths, size) => {
  const roots = Array.from({ length: size }, (_, i) => i);

  const getParent = (idx) => {
    if (roots[idx] === idx) return idx;
    roots[idx] = getParent(roots[idx]);

    return roots[idx];
  }

  const union = (parent1, parent2) => {
    if (parent1 < parent2) {
      roots[parent2] = parent1;
    } else {
      roots[parent1] = parent2;
    }
  }

  let count = 1;
  let minCost = 0;
  paths.sort((a, b) => a.cost - b.cost);

  for (const { node1, node2, cost } of paths) {
    if (count === size) break;

    const parent1 = getParent(node1);
    const parent2 = getParent(node2);

    if (parent1 === parent2) continue;

    union(parent1, parent2);
    minCost += cost;
    count++;
  }

  return minCost;
}

console.log(solution(paths, size));
