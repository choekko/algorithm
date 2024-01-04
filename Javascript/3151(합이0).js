const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  numbers.sort((a, b) => a - b);
  let result = 0;


  for (let startIdx = 0; startIdx < numbers.length; startIdx++) {
    for (let middleIdx = startIdx + 1; middleIdx < numbers.length; middleIdx++) {
      const start = numbers[startIdx];
      const middle = numbers[middleIdx];
      const targetEnd = 0 - (start + middle);



    }
  }
}

console.log(solution(numbers));