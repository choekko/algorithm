const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const size = Number(input[0]);
const order = input[1].split(' ').map(Number);

const solution = (size, order) => {
  const nodeCount = 2 ** size - 1;

  const idxOrder = []; // 트리의 idx 기준 순회 순서
  const checkingArray = Array(nodeCount).fill(false);
  let currentIdx = 0;

  while (idxOrder.length < nodeCount) {
    const leftChildIdx = 2 * currentIdx + 1;
    const rightChildIdx =  2 * currentIdx + 2;

    if (leftChildIdx < nodeCount && !checkingArray[leftChildIdx]) {
      currentIdx = leftChildIdx;
      continue;
    } else if (!checkingArray[currentIdx]) {
      idxOrder.push(currentIdx);
      checkingArray[currentIdx] = true;
    }

    if (rightChildIdx < nodeCount && !checkingArray[rightChildIdx]) {
      currentIdx = rightChildIdx;
      continue;
    }

    if (checkingArray[leftChildIdx] !== false && checkingArray[rightChildIdx] !== false) {
      currentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  const idxToNodeMap = {};

  for (let i = 0; i < idxOrder.length; i++) {
    idxToNodeMap[idxOrder[i]] = order[i];
  }

  const result = [];
  const tree = Array.from({ length: nodeCount }, (_, i) => idxToNodeMap[i]);

  for (let j = 0; j < size; j++) {
    result.push(tree.slice(2 ** j - 1, 2 ** (j + 1) - 1));
  }

  return result.map(line => line.join(' ')).join('\n');
}

console.log(solution(size, order));