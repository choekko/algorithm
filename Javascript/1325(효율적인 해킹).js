const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const [computerCount] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(edge => edge.split(' ').map(Number));

const solution = (computerCount, edges) => {
  const edgeInfo = Array(computerCount + 1).fill(null).map(() => []);

  edges.forEach(([end, start]) => {
    edgeInfo[start].push(end);
  })

  let maxCount = -Infinity;
  let result = [];

  for (let start = 1 ; start < computerCount + 1; start++) {
    const checker = Array(computerCount + 1).fill(false);
    const stack = [start];
    let count = 0;

    while (stack.length) {
      const current = stack.pop();
      if (checker[current]) continue;

      count++;
      checker[current] = true;

      edgeInfo[current].forEach(computer => stack.push(computer));
    }

    if (maxCount < count) {
      maxCount = count;
      result = [start];
      continue;
    }
    if (maxCount === count) {
      result.push(start);
    }
  }

  return result.join(' ');
}

console.log(solution(computerCount, edges))