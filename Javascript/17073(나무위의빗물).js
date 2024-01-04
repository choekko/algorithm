const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, rootWater] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (rootWater, edges) => {
  const childrenBundles = Array.from({ length: nodeCount + 1}, (_, i) => []); // 0 패딩
  edges.forEach(([node1, node2]) => {
    childrenBundles[node1].push(node2);
    childrenBundles[node2].push(node1);
  })

  const waters = Array.from({ length: nodeCount + 1}, () => 0);
  waters[1] = rootWater;

  const visitFlags = Array.from({ length: nodeCount + 1 }, () => false);

  const stack = [1];

  while (stack.length) {
    const currentNode = stack.pop();
    visitFlags[currentNode] = true;
    const currentWater = waters[currentNode];
    const children = childrenBundles[currentNode].filter(child => !visitFlags[child]);

    if (!children.length) continue;

    children.forEach(child => {
      waters[child] += currentWater / children.length;
      stack.push(child);
    });

    waters[currentNode] = 0;
  }

  const validWaters = waters.filter(Boolean);

  return validWaters.reduce((acc, curr) => acc + curr, 0) / validWaters.length;
}

console.log(solution(rootWater, edges))