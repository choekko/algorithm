const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.platform === "linux" ? process.stdin : fs.createReadStream('input.txt') ,
  output: process.stdout,
  terminal: false,
});
const input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {

  const testCases = input.slice(1).map(Number);

  console.log(solution(testCases));
  process.exit();
});

const solution = (testCases) => {
  const permutation = (numbers, count) => {
    if (count === 1) return numbers.map(number => [number]);

    const result = [];

    for (let i = 0; i < numbers.length; i++) {
      const candidates = permutation(numbers, count - 1).map(candidate => [numbers[i], ...candidate]);
      result.push(...candidates);
    }

    return result;
  }
  const getResult = (numberCount) => {
    const numbers = Array.from({ length: numberCount }, (_, i) => i + 1);
    const signs = [' ', '+', '-'];

    const signOrders = permutation(signs, numberCount - 1);
    const firstNumber = numbers.shift();

    const result = [];

    for (const signOrder of signOrders) {
      let sum = firstNumber
      let sentence = firstNumber + '';
      let prevNumber = firstNumber;
      let prevSign = '+';

      for (let i = 0; i < numberCount - 1; i++) {
        const sign = signOrder[i];
        let nextNumber = numbers[i];
        sentence += sign + nextNumber;

        if (sign === '+') {
          sum += nextNumber;
        } else if (sign === '-') {
          sum -= nextNumber;
        } else {
          nextNumber = Number(prevNumber + '' + nextNumber);
          if (prevSign === '+') {
            sum -= prevNumber;
            sum += nextNumber;
          } else if (prevSign === '-') {
            sum += prevNumber;
            sum -= nextNumber;
          }
        }

        prevNumber = nextNumber;
        if (sign !== ' ') {
          prevSign = sign;
        }

      }

      if (sum === 0) {
        result.push(sentence);
      }
    }

    return result.join('\n');
  }


  return testCases.map(getResult).filter(Boolean).join('\n\n');
}