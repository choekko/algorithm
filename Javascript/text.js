const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const stoneCount = Number(input[0]);

const costs = [];
for (let i = 1; i < stoneCount; i++) {
  const costPerStone = input[i].split(' ').map(Number);
  costs.push({ smallJump: costPerStone[0], bigJump: costPerStone[1] });
}

const hyperJumpCost = Number(input[stoneCount]);

const solution = (stoneCount, costs, hyperJumpCost) => {
  const dp = Array(stoneCount).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < stoneCount - 1; i++) {
    const { smallJump, bigJump } = costs[i];

    if (i + 1 < stoneCount) {
      dp[i + 1] = Math.min(dp[i + 1], dp[i] + smallJump);
    }
    if (i + 2 < stoneCount) {
      dp[i + 2] = Math.min(dp[i + 2], dp[i] + bigJump);
    }
  }

  let result = dp[stoneCount - 1];

  for (let i = 3; i < stoneCount; i++) {
    let current = dp[i - 3] + hyperJumpCost;
    let next = Infinity;
    let afterNext = Infinity;

    for (let j = i; j < stoneCount - 1; j++) {
      if (i + 1 <= stoneCount) {
        next = Math.min(next, current + costs[j].smallJump);
      }
      if (i + 2 <= stoneCount) {
        afterNext = Math.min(afterNext, current + costs[j].bigJump);
      }
      [current, next, afterNext] = [next, afterNext, Infinity];
    }
    result = Math.min(result, current);
  }

  return result;
}

console.log(solution(stoneCount, costs, hyperJumpCost))