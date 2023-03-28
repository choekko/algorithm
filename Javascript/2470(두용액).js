const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  const negativeNumbers = [];
  const positiveNumbers = [];

  for (let number of numbers) {
    if (number >= 0) {
      positiveNumbers.push(number);
      continue;
    }
    negativeNumbers.push(number);
  }

  negativeNumbers.sort((a, b) => a - b);
  positiveNumbers.sort((a, b) => a - b);

  let result;
  let minAbsoluteValue;

  // 음수를 순회하면서 양수를 이분 탐색할 예정이므로,
  // 음수 값만 가지고 만들 수 있는 최소 절대값과, 양수 값만 가지고 만들 수 있는 최소 절대값 중 더 작은 값에 해당하는 수들을 초기 result 값으로 담는다.
  if (Math.abs((positiveNumbers[0] === undefined ? Infinity : positiveNumbers[0]) + (positiveNumbers[1] ?? Infinity))
    < Math.abs((negativeNumbers[negativeNumbers.length - 2] ?? -Infinity) + (negativeNumbers[negativeNumbers.length - 1] ?? -Infinity))) {

    result = `${positiveNumbers[0]} ${positiveNumbers[1]}`;
    minAbsoluteValue = positiveNumbers[0] + positiveNumbers[1];
  } else {
    result = `${negativeNumbers[negativeNumbers.length - 2]} ${negativeNumbers[negativeNumbers.length - 1]}`;
    minAbsoluteValue = Math.abs(negativeNumbers[negativeNumbers.length - 2] + negativeNumbers[negativeNumbers.length - 1]);
  }

  for (let currentNegativeNumber of negativeNumbers) {
    let leftIdx = 0;
    let rightIdx = positiveNumbers.length - 1;

    while (leftIdx <= rightIdx) {
      const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      const currentPositiveValue = positiveNumbers[middleIdx];
      const sum = currentNegativeNumber + currentPositiveValue;
      const absoluteValueOfSum = Math.abs(sum);

      if (sum === 0) {
        return `${currentNegativeNumber} ${currentPositiveValue}`;
      }

      if (minAbsoluteValue > absoluteValueOfSum) {
        minAbsoluteValue = absoluteValueOfSum;
        result = `${currentNegativeNumber} ${currentPositiveValue}`;
      }

      if (sum > 0) {
        rightIdx = middleIdx - 1;
      } else {
        leftIdx = middleIdx + 1;
      }
    }
  }

  return result;
}

console.log(solution(numbers));