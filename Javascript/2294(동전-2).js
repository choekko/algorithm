const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [coinCount, targetAmount] = input[0].split(' ').map(Number);
const coins = [];

for (let i = 1; i <= coinCount; i++) {
  coins.push(Number(input[i]));
}

const solution = (coins, targetAmount) => {
  const d = Array.from({ length: targetAmount + 1}, () => Infinity);
  d[0] = 0;

  for (const coin of coins) {
    for (let i = 1; i <= targetAmount; i++) {
      if (!isNaN(d[i - coin]) && !isNaN(d[i])) {
        d[i] = Math.min(d[i - coin] + 1, d[i])
      }
    }
  }

  return d[targetAmount] === Infinity ? -1 : d[targetAmount];
}

console.log(solution(coins, targetAmount))