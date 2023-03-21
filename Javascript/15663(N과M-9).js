let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');
const [_, n] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const permutation = (numbers, n, memo, breadcrumb) => {
  const memorizedValue = memo[breadcrumb];
  if (memorizedValue) {
    return null;
  }

  if (n === 0) {
    memo[breadcrumb] = [[]];
    return [[]];
  }

  let result = [];
  numbers.forEach((number, idx) => {
    const candidates = permutation(numbers.filter((_, _idx) => _idx !== idx), n - 1, memo, breadcrumb + number.toString());

    if (!candidates) return;
    memo[breadcrumb + number.toString()] = candidates;
    result = [...result, ...candidates.map(candidate => [number, ...candidate])];
  })

  return result;
}

const solution = (numbers, n) => {
  console.log(permutation(numbers.sort((a, b) => a - b), n, {}, '').map(candidate => candidate.join(' ')).join('\n'));
}


solution(numbers, n)