const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const caseCount = Number(input[0]);
const testCases = [];

for (let i = 1; i <= caseCount * 3; i += 3) {
  const coinCount = Number(input[i]);
  const coins = input[i + 1].split(' ').map(Number);
  const target = Number(input[i + 2]);

  testCases.push({ coinCount, coins, target });
}


const solution = (testCases) => {
  const getCount = ({ coins, target }) => {
    const d = Array.from({length: target + 1}, () => 0);
    d[0] = 1;

    for (const coin of coins) {
      for (let i = 1; i < d.length; i++) {
        d[i] += d[i - coin] ?? 0;
      }
    }

    return d[target]
  }

  return testCases.map(getCount).join('\n');
}

console.log(solution(testCases))