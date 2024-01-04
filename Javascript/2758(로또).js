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

  const testCases = input.slice(1).map(line => {
    const [count, maxNumber] = line.split(' ').map(Number);
    return { count, maxNumber }
  })

  console.log(solution(testCases));
  process.exit();
});

const solution = (testCases) => {
  const getResult = ({ count, maxNumber }) => {
    const d = Array.from({ length: count }, () => Array.from({ length: maxNumber + 1 }, () => 0));

    for (let i = 1; i <= maxNumber; i++) {
      d[0][i] = i;
    }

    for (let row = 1; row < count; row++) {
      for (let col = 1; col <= maxNumber; col++) {
        d[row][col] = d[row][col - 1] + d[row - 1][Math.floor(col / 2)];
      }
    }

    return d[count - 1][maxNumber];
  }

  return testCases.map(getResult).join('\n');
}