const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const len = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

const solution = (numbers, len) => {
  const d = Array.from({ length: len }, () => Array.from({ length: len }, () => 0));

  let lcsLength = 0;

  for (let row = 0; row < len; row++) {
    for (let col = 0; col < len; col++) {
      d[row][col] = numbers[len - row - 1] === numbers[col] ? ((d[row - 1]?.[col - 1] ?? 0) + 1) : Math.max(d[row - 1]?.[col] ?? 0, d[row][col - 1] ?? 0);
      lcsLength = Math.max(lcsLength, d[row][col]);
    }
  }

  return len - lcsLength;
}

console.log(solution(numbers, len));