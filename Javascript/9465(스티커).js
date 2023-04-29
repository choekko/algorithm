const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const testCases = [];
for (let i = 2; i < input.length; i += 3) {
  const testCase = [];

  testCase.push(input[i].split(' ').map(Number));
  testCase.push(input[i + 1].split(' ').map(Number));
  testCases.push(testCase);
}

const solution = (testCases) => {
  const getMaxScorePerTestCase = (testCase) => {
    const colCount = testCase[0].length;
    const dp = Array(colCount).fill(null).map(() => ({ up: 0, down: 0 })); // 위를 선택했을 때 최대, 아래를 선택했을 때 최대 각각 기록

    for (let i = 0; i < colCount; i++) {
      dp[i] = {
        up: Math.max(dp[i - 1]?.down ?? 0, dp[i - 2]?.down ?? 0) + testCase[0][i],
        down: Math.max(dp[i - 1]?.up ?? 0, dp[i - 2]?.up ?? 0) + testCase[1][i],
      }
    }

    return Math.max(dp[colCount - 1].up, dp[colCount - 1].down);
  }

  return testCases.map(getMaxScorePerTestCase).join('\n');
}

console.log(solution(testCases));