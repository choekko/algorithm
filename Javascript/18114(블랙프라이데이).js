const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, target] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const solution = (target, numbers) => {
  numbers.sort((a, b) => a - b);

  const binarySearch = (arr, minIdx, maxIdx, target) => {
    let leftIdx = minIdx;
    let rightIdx = maxIdx;

    while (leftIdx <= rightIdx) {
      const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      const middle = arr[middleIdx];

      if (middle === target) return true;
      if (middle < target) {
        leftIdx = middleIdx + 1;
        continue;
      }
      if (middle > target) {
        rightIdx = middleIdx - 1;
        continue;
      }
    }
    return false;
  }

  if (binarySearch(numbers, 0, numbers.length - 1, target)) return 1;

  for (let i = 0; i < numbers.length; i++) {
    const firstNumber = numbers[i];
    const _target = target - firstNumber;
    if (_target < 0) return 0;
    if (binarySearch(numbers, i + 1, numbers.length - 1, _target)) return 1;

    for (let j = i + 1; j < numbers.length; j++) {
      const secondNumber = numbers[j]
      const _target = target - firstNumber - secondNumber;
      if (_target < 0) break;
      if (binarySearch(numbers, j + 1, numbers.length - 1, _target)) return 1;
    }
  }

  return 0;
}

console.log(solution(target, numbers))

