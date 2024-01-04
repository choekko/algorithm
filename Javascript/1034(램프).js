const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize] = input[0].split(' ').map(Number);
const lines = [];

let i = 1
for (; i < 1 + rowSize; i++) {
  lines.push(input[i]);
}

const clickCount = Number(input[i]);


const solution = (lines, clickCount) => {
  const countMap = lines.reduce((acc, curr) => {
    if (acc[curr]) {
      const { lineCount, zeroCount } = acc[curr];
      acc[curr] = { lineCount: lineCount + 1, zeroCount };
    } else {
      const zeroCount = [...curr].reduce((acc, curr) => acc + (curr === '0'), 0);
      acc[curr] = { lineCount: 1, zeroCount }
    }
    return acc;
  }, {})

  let result = 0;

  const countInfo = Object.values(countMap);
  for (const { lineCount, zeroCount } of countInfo) {
    if (zeroCount > clickCount) continue;
    if (zeroCount % 2 !== clickCount % 2) continue;
    result = Math.max(result, lineCount);
  }

  return result;
}

console.log(solution(lines, clickCount));