// 이 문제는 node.js로 제출하면 어떤 코드든 메모리 초과가 뜬다고 한다.
const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [coinKindCount, target] = input[0].split(' ').map(Number);
const coinKinds = [];

for (let i = 1; i <= coinKindCount; i++) {
  coinKinds.push(Number(input[i]))
}

const solution = (coinKinds, target) => {
  coinKinds.sort((a, b) => b - a);
  let result = 0;

  const traverse = (startIdx, sum) => {
    for (let idx = startIdx; idx < coinKinds.length; idx++) {
      const value = coinKinds[idx];
      const _sum = sum + value;

      if (_sum >= target) {
        if (_sum === target) {
          result++;
        }
        continue;
      }
      traverse(idx, _sum);
    }
  }

  traverse(0, 0);

  return result;
}

console.log(solution(coinKinds, target));


// 10