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
  const numbers = input[1].trim().split(' ').map(Number);

  console.log(solution(numbers));
  process.exit();
});

const solution = (numbers) => {
  let count = 0;
  while (numbers.some(Boolean)) {
    let flag = false;
    for (let i = 0; i < numbers.length; i++) {
      const number = numbers[i];

      if (number % 2) {
        numbers[i]--;
        count++;
        flag = true;
      }
    }
    if (!flag) {
      numbers = numbers.map(number => number / 2);
      count++;
    }
  }

  return count;
}

// 7