const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [buildingCount, edgeCount] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(line => {
  const [building1, building2, cost] = line.split(' ').map(Number);

  return { building1, building2, cost };
})

const solution = (edges, buildingCount) => {
  edges.sort((a, b) => a.cost - b.cost);
  const allCost = edges.reduce((acc, { cost }) => acc + cost, 0)
  const roots = Array.from({length: buildingCount + 1}, (_, idx) => idx); // 0 패딩 있음

  const getRoot = (node) => {
    const parent = roots[node];

    if (parent === node) return parent;
    roots[node] = getRoot(parent);
    return roots[node];
  }
  const union = (node1, node2) => {
    const root1 = getRoot(node1);
    const root2 = getRoot(node2);

    if (root1 === root2) return false;

    const [smaller, bigger] = [root1, root2].sort();

    roots[bigger] = roots[smaller];
    return true;
  }

  let linkedCount = 0;
  let minCost = 0;

  edges.forEach(({ building1, building2, cost }) => {
    const isLinked = union(building1, building2);
    if (isLinked) {
      linkedCount++;
      minCost += cost;
    }
  })

  if (linkedCount !== buildingCount - 1) return -1;
  return allCost - minCost;
}

console.log(solution(edges, buildingCount))