const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const count = Number(input[0]);

const schedule = [];
for (let i = 1; i <= count; i++) {
  const [period, income] = input[i].split(' ').map(Number);
  schedule.push({ period, income })
}

const solution = (schedule) => {
  const dp = Array(schedule.length).fill(0);

  for (let i = 0; i < schedule.length; i++) {
    const { period, income } = schedule[i];

    dp[i] = Math.max(dp[i], dp[i - 1] ?? 0);


    if (i + period - 1 < schedule.length) {
      dp[i + period - 1] = Math.max(dp[i + period - 1], income + (dp[i - 1] ?? 0));
    }
  }

  return dp[schedule.length - 1];
}

console.log(solution(schedule));