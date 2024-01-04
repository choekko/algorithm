const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [target, cityCount] = input[0].split(' ').map(Number);
const cities = [];

for (let i = 1; i <= cityCount; i++) {
  const [cost, increment] = input[i].split(' ').map(Number);
  cities.push({ cost, increment });
}

const solution = (cities, target) => {
  const size = target + 100;
  const dp = Array(size).fill(Infinity);
  dp[0] = 0;

  for (const { cost, increment } of cities) {
    for (let i = increment; i < size; i++) {
      dp[i] = Math.min(dp[i - increment] + cost, dp[i]);
    }
  }

  return Math.min(...dp.slice(target));
}

console.log(solution(cities, target))



