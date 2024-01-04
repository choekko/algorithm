const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodeCount = Number(input[0].split(' ')[0]);
const edges = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (nodeCount, edges) => {
  const infos = Array(nodeCount + 1).fill(null).map(() => ({ inDegree: 0, outerNodes: [] }));

  for (const [start, end] of edges) {
    infos[end].inDegree += 1;
    infos[start].outerNodes.push(end);
  }

  const nodesWithZeroInDegree = [];

  for (let i = 1; i < infos.length; i++) {
    const { inDegree } = infos[i];

    if (inDegree === 0) {
      nodesWithZeroInDegree.push(i);
    }
  }

  const result = [];

  while (nodesWithZeroInDegree.length) {
    const currentNode = nodesWithZeroInDegree.pop();
    result.push(currentNode);

    const { outerNodes } = infos[currentNode];

    for (const node of outerNodes) {
      infos[node].inDegree -= 1;
      if (infos[node].inDegree === 0) {
        nodesWithZeroInDegree.unshift(node);
      }
    }
  }

  return result.join(' ');
}

console.log(solution(nodeCount, edges));