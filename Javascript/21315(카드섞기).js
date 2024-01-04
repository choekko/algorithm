const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const count = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

const solution = (_numbers, count) => {

  const numbers = Array.from({ length: count }, (_ , idx) => idx + 1);

  const shuffle = (numbers, n) => {
    if (n === 1) return numbers;

    const size = Math.floor(n / 2);

    const _numbers = [...numbers];
    const section = _numbers.splice(size, size);
    _numbers.unshift(...section);

    return shuffle(_numbers, size);
  }

  for (let i = 1; i * 2 <= count; i = i * 2) {
    let currentNumbers = [...numbers];
    const section = currentNumbers.splice(- i * 2, i * 2);
    currentNumbers.unshift(...section);
    currentNumbers = shuffle(currentNumbers, i * 2);


    for (let j = 1; j * 2 <= count; j = j * 2) {
      let _currentNumbers = [...currentNumbers];
      const _section = _currentNumbers.splice(- j * 2, j * 2);
      _currentNumbers.unshift(..._section)
      _currentNumbers = shuffle(_currentNumbers, j * 2)


      if (_currentNumbers.every((number, idx) => number === _numbers[idx])) {
        return `${i} ${j}`;
      }
    }
  }
}

console.log(solution(numbers, count))