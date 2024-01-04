const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const target = Number(input[0]);
const brokenNumbers = input[2]?.split(' ').map(Number) ?? [];

const solution = (target, brokenNumbers) => {
  if (!brokenNumbers.length) {
    return Math.min(Math.abs(100 - target), target.toString().length);
  }
  if (brokenNumbers.length === 10) {
    return Math.abs(100 - target)
  }
  let nearbyNumberByString = '';
  let prevFlag = 0 // 순회할 때 이전에 정해진 숫자가 오버했는지, 언더했는지 확인
  const targetNumbers = [...target.toString()].map(Number)

  for (let i = 0; i < targetNumbers.length; i++) {
    const targetNumber = targetNumbers[i];
    let candidate = prevFlag === 0
      ? targetNumber
      : prevFlag === -1
        ? 9
        : 0
    let offset = (prevFlag === 1 || (prevFlag !== -1 && targetNumber === 0) || (i === 0 && targetNumber === 9)) ? 1 : -1
    while (true) {
      const invalidCandidate = candidate >= 10 || candidate < 0;
      if ((!invalidCandidate && !brokenNumbers.includes(candidate)) || (i === 0 && [0, 10].includes(candidate))) {
        nearbyNumberByString += candidate;
        if (!prevFlag) {
          if (candidate > targetNumber) {
            prevFlag = 1
          } else if (candidate < targetNumber) {
            prevFlag = -1
          }
        }
        break;
      }

      candidate = candidate + offset;

      if (!prevFlag) {
        offset = (Math.abs(offset) + 1) * (offset > 0 ? -1 : 1)
      }
    }
  }


  const resultByDirectClick = Number(nearbyNumberByString).toString().length + Math.abs(Number(nearbyNumberByString) - target)
  const resultByUpDownClick = Math.abs(target - 100);

  return Math.min(resultByUpDownClick, resultByDirectClick);
}

console.log(solution(target, brokenNumbers))