const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);
const [plusCount, minusCount, productCount, divisionCount]= input[2].split(' ').map(Number);

const permutation = (items, n) => {
  if (n === 1) return items.map(item => [item]);

  let result = [];

  items.forEach((firstItem, idx) => {
    const candidates = permutation(items.filter((_, _idx) => _idx !== idx), n - 1).map(candidate => [firstItem, ...candidate]);
    result = [result, ...candidates];
  })

  return result;
}

const solution = (numbers, plusCount, minusCount, productCount, divisionCount) => {
  const operators = [...('+'.repeat(plusCount) + '-'.repeat(minusCount) + '*'.repeat(productCount) + '/'.repeat(divisionCount))];
  const candidates = permutation(operators, operators.length);

  let minResult = Infinity;
  let maxResult = -Infinity;

  candidates.forEach(candidate => {
    let result = numbers[0];


    for (let i = 0; i < candidate.length; i++) {
      const operator = candidate[i];
      const number = numbers[i + 1];

      switch (operator) {
        case '+':
          result += number;
          break;
        case '-':
          result -= number;
          break;
        case '*':
          result *= number;
          break;
        case '/': {
          result = result < 0 ? Math.ceil(result / number) : Math.floor(result / number);;
          break;
        }
      }
    }

    minResult = Math.min(minResult, result);
    maxResult = Math.max(maxResult, result);
  })

  return [maxResult, minResult].join('\n');
}

console.log(solution(numbers, plusCount, minusCount, productCount, divisionCount));