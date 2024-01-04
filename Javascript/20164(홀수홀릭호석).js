const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numberByString = input[0]

const solution = (numberByString) => {
  let minResult = Infinity;
  let maxResult = -Infinity;

  const traverse = (numberByString, count) => {
    if (numberByString.length === 1) {
      const oddCount = Number(numberByString) % 2;
      minResult = Math.min(minResult, count + oddCount);
      maxResult = Math.max(maxResult, count + oddCount);
      return;
    }

    if (numberByString.length === 2) {
      const number1 = Number(numberByString[0]);
      const number2 = Number(numberByString[1]);
      const oddCount = number1 % 2 + number2 % 2;
      traverse((number1 + number2).toString(), count + oddCount)
      return;
    }

    const oddCount = [...numberByString].map(Number).reduce((acc, curr) => acc + curr % 2, 0)

    for (let i = 0; i < numberByString.length - 1; i++) {
      for (let j = i + 1; j < numberByString.length - 1; j++) {
        const number1 = Number(numberByString.slice(0, i + 1));
        const number2 = Number(numberByString.slice(i + 1, j + 1));
        const number3 = Number(numberByString.slice(j + 1, numberByString.length));
        traverse((number1 + number2 + number3).toString(), count + oddCount)
      }
    }
  }

  traverse(numberByString, 0)

  return [minResult, maxResult].join(' ');
}

console.log(solution(numberByString))