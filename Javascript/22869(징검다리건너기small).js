const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, maxPower] = input[0].split(' ').map(Number);
const stones = input[1].split(' ').map(Number);

const solution = (stones, maxPower) => {
  const dp = Array(stones.length).fill(false);
  dp[0] = true;

  const checkIsPossible = (startIdx, destinationIdx) => {
    const cost = (destinationIdx - startIdx) * (1 + Math.abs(stones[startIdx] - stones[destinationIdx]));
    return cost <= maxPower;
  }

  for (let j = 1; j < stones.length; j++) {
    for (let i = 0; i < j; i++) {
      if (!dp[i] || dp[j]) continue;
      dp[j] = checkIsPossible(i, j);
    }
  }

  return dp[stones.length - 1] ? 'YES' : 'NO';
}

console.log(solution(stones, maxPower))