const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const order = Number(input[0]);

const solution = (order) => {
  const numbers = [];

  const traverse = (maxNumber, prevResult, length) => {
    if (prevResult.length === length) {
      numbers.push(Number(prevResult));
      return;
    }

    for (let number = 0; number <= maxNumber; number++) {
      const result = prevResult + number;
      traverse(number - 1, result, length);
    }
  }

  Array.from({ length: 10 }, (_, idx) => idx + 1)
    .forEach(length => traverse(9, '', length));

  return numbers[order] ?? -1;
}

console.log(solution(order));
