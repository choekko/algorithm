const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const [_, n] = input[0].split(' ');
const numbers = input[1].split(' ');

const solution = (numbers, n) => {
  const permutation = (numbers, n) => { // 만들고 보니 조합같다.
    if (n === 0) return [[]];
    if (n === 1) return numbers.map(number => [number]);

    let candidates = [];

    numbers.forEach((number, idx) => {
      candidates = [...candidates, ...permutation(numbers.slice(idx + 1), n - 1).map(candidate => [number, ...candidate])];
    })
    return candidates;
  }

  const checkingMap = {};

  return permutation(numbers.sort((a, b) => a - b), n)
    .map(candidate => candidate.join(' '))
    .reduce((acc, candidateByString) => {
      if (checkingMap[candidateByString]) return acc;
      checkingMap[candidateByString] = true;
      acc.push(candidateByString);
      return acc;
    }, [])
    .join('\n');
}

console.log(solution(numbers, n));