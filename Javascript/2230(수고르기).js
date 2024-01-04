const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, minDifference] = input[0].split(' ').map(Number);
const numbers = input.slice(1).map(Number);

const solution = (numbers, minDifference) => {
  numbers.sort((a, b) => a - b);
  let left = 0;
  let right = 1;
  let result = Infinity;

  while (right < numbers.length) {
    const difference = numbers[right] - numbers[left];
    if (difference >= minDifference) {
      result = Math.min(result, difference);
      if (left < right - 1) {
        left++;
      } else {
        left++;
        right++;
      }
    } else {
      right++;
    }
  }

  return result;
}

console.log(solution(numbers, minDifference))