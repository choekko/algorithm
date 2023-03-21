let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');
const nodeCount = Number(input.shift());
const edges = input.map(token => token.split(' ').map(Number));


const solution = (edges, nodeCount) => {
  const edgesPerNode = Array(nodeCount + 1).fill(null).map(_ => []);
  const result = Array(nodeCount + 1).fill(null);

  edges.forEach(([node1, node2]) => {
    edgesPerNode[node1]?.push(node2);
    edgesPerNode[node2]?.push(node1);
    return;
  })

  const stack = [1];

  while (stack.length) {
    const currentNode = stack.pop();
    const childNodes = edgesPerNode[currentNode].filter(node => !result[node]);

    childNodes.forEach(node => {
      result[node] = currentNode;
      stack.push(node);
    });
  }

  return result.slice(2).join('\n');
}

console.log(solution(edges, nodeCount));