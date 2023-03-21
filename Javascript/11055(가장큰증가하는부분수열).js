let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');

const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  const memo = Array(numbers.length).fill(-Infinity);

  numbers.forEach((number, idx) => {
    let maxSum = number;
    for (let j = idx - 1; j >= 0; j--) {
      if (numbers[j] < number) {
        maxSum = Math.max(maxSum, number + memo[j]);
      }
    }
    memo[idx] = maxSum;
  })

  return Math.max(...memo);
}

console.log(solution(numbers))