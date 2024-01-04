const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = input.slice(1).map(Number);

const solution = (numbers) => {
  const d = Array.from({ length: numbers.length }, () => 1);

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < i; j++) {
      if (numbers[j] < numbers[i]) {
        d[i] = Math.max(d[i], d[j] + 1)
      }
    }
  }

  return numbers.length - Math.max(...d)
}

console.log(solution(numbers))