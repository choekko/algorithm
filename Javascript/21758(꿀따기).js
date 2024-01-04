const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const count = Number(input[0]);
const honey = input[1].split(' ').map(Number);

const solution = (honey, count) => {
  // 벌 한 마리와 벌통은 양 끝 사이드에 두고, 나머지 한 머리를 가지고 진행하는 게 최선이지 않을까?

  let bee1 = honey.slice(2, count).reduce((acc, curr) => acc + curr, 0);
  let bee2 = bee1;

  let maxScore = bee1 + bee2;
  let prevScore = bee1 + bee2;

  for (let i = 2; i < count - 1; i++) {
    const newScore = prevScore + honey[i - 1] - honey[i] * 2;
    maxScore = Math.max(maxScore, newScore);
    prevScore = newScore;
  }

  return maxScore
}

console.log(solution(honey, count));