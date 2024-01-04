const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const wines = input.slice(1).map(Number);

const solution = (wines) => {
  if (wines.length <= 2) {
    return wines.reduce((acc, curr) => acc + curr, 0);
  }

  // [a, b, c] 이 있다고 쳤을 때, c 와인까지 계산 중인 상황에서는
  // 그보다 이전 두 가지 값중 첫 번째(a)만 선택된 누적값, 두 번째(b)만 선택된 누적값, 둘 다 선택(a, b)된 누적값 각 경우에 대해 계산해나간다.
  const prevCandidate = { near: wines[1], far: wines[0], all: wines[0] + wines[1] };

  for (let i = 2; i < wines.length; i++) {
    const currentWine = wines[i];

    const _prevCandidate = { ...prevCandidate };
    prevCandidate.near = _prevCandidate.far + currentWine;
    prevCandidate.far = Math.max(_prevCandidate.near, _prevCandidate.all);
    prevCandidate.all = _prevCandidate.near + currentWine;
  }

  return Math.max(...Object.values(prevCandidate));
}

console.log(solution(wines));

// 33