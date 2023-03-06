let fs = require('fs');
let input = fs.readFileSync('./test.txt').toString().split('\n');

const numbers = input[1].split(' ').map(Number);


const solution = (numbers) => {
  let prevPositiveAcc = -Infinity;
  let prevNegativeAcc = 0;
  let maxNegativeNumber = -Infinity;
  let result = -Infinity;
  let flag = 0;

  numbers.forEach(number => {
    if (number >= 0) {
      if (!flag) {
        flag = 1;
        result = Math.max(prevPositiveAcc, result);

        if (prevPositiveAcc + prevNegativeAcc <= 0) {
          prevPositiveAcc = 0;
        } else {
          prevPositiveAcc += prevNegativeAcc;
        }
      }

      prevPositiveAcc += number;
    } else {
      if (flag) {
        flag = 0;
        prevNegativeAcc = 0;
      }

      maxNegativeNumber = Math.max(maxNegativeNumber, number);
      prevNegativeAcc += number;
    }
  })

  return Math.max(result, maxNegativeNumber, prevPositiveAcc);
}

console.log(solution(numbers));