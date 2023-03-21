let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');

const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  for (let i = numbers.length - 1 ; i >= 0 ; i-- ) {
    let currentMaxCount = 1;
    const currentNumber = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      const [minNumber, maxCount] = numbers[j];

      if (minNumber > currentNumber) {
        currentMaxCount = Math.max(currentMaxCount, maxCount + 1);
      }
    }
    numbers[i] = [numbers[i], currentMaxCount];
  }
  let result = 0;
  numbers.forEach(([_, maxCount]) => result = Math.max(result, maxCount));
  return  result;
}

console.log(solution((numbers)))