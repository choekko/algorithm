const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const timeInfo = input.slice(1).map(line => {
  const [cost, maxTime] = line.split(' ').map(Number);
  return { cost, maxTime };
});

const solution = (timeInfo) => {
  timeInfo.sort((a, b) => b.maxTime - a.maxTime);

  let currentTime = timeInfo[0].maxTime;

  for (const { cost, maxTime } of timeInfo) {
    if (currentTime > maxTime) {
      currentTime = maxTime;
    }

    currentTime -= cost;

    if (currentTime < 0) {
      return -1;
    }
  }

  return currentTime;
}

console.log(solution(timeInfo));
