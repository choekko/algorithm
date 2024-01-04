const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const schoolTypes = input[1].split(' ');
schoolTypes.unshift(null); // 패딩
const edges = input.slice(2).map(line => {
  const [node1, node2, cost] = line.split(' ').map(Number);

  return { node1, node2, cost }
})

const solution = (schoolTypes, edges) => {
  edges.sort((a, b) => a.cost - b.cost);

  const roots = Array.from({ length: schoolTypes.length }, (_, idx) => idx);

  const getRoot = (node) => {
    const root = roots[node];

    if (node === root) return root;

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

  let linkedCount = 1;
  let result = 0;

  for (const { node1, node2, cost } of edges) {
    if (schoolTypes[node1] === schoolTypes[node2]) continue;

    const isLinked = union(node1, node2);
    if (isLinked) {
      result += cost;
      linkedCount++;
    }
  }

  return linkedCount === schoolTypes.length - 1 ? result : -1;
}

console.log(solution(schoolTypes, edges));

