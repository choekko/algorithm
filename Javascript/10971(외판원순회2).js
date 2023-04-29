const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const matrix = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (matrix) => {
  const size = matrix.length;
  const stack = Array.from({length: size}, (_, i) =>  ({ startNode: i, currentNode: i, checkingBit: 1 << i, cost: 0 }));
  const MAX_CHECKING_BIT = parseInt('1'.repeat(size), 2);
  let minCost = Infinity;
  
  while (stack.length) {
    const { startNode, currentNode, checkingBit, cost } = stack.pop();

    for (let nextNode = 0; nextNode < size; nextNode++) {
      const currentCost = matrix[currentNode][nextNode];

      if (checkingBit === MAX_CHECKING_BIT && nextNode === startNode && currentCost) {
        minCost = Math.min(minCost, cost + currentCost);
        continue;
      }

      if (!currentCost) continue;
      if (checkingBit & (1 << nextNode)) continue;

      stack.push({ startNode, currentNode: nextNode, checkingBit: checkingBit | (1 << nextNode), cost: cost + currentCost })
    }
  }

  return minCost;
}

console.log(solution(matrix));