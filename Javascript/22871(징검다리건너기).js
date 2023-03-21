let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');

const numberCount = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  const dp = Array(numbers.length).fill(-Infinity);
  for (let i = 1 ; i < numbers.length ; i++) {
    let minPower = +Infinity;
    for (let j = 1 ; j < i ; j++) {
      tmp = Math.max(dp[j], (i - j) * (1 + Math.abs(numbers[i] - numbers[j])))
      minPower = Math.min(minPower, tmp);
    }
    minPower = Math.min(minPower, i * (1 + Math.abs(numbers[i] - numbers[0])));
    dp[i] = minPower;
  }
  return dp[numbers.length - 1]
}

console.log(solution(numbers));