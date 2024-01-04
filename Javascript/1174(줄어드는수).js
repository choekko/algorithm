const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const order = Number(input[0]);

const solution = (order) => {
  const digitNumbers = Array.from({ length: 11 }, () => null);

  const traverse = (currentDigit, digitNumbers, count, maxDigit, limit) => {
    for (let i = currentDigit - 1; i <= limit; i++) {
      digitNumbers[currentDigit] = i;

      if (currentDigit >= 2) {
        const result = traverse(currentDigit - 1, digitNumbers, count, maxDigit, i - 1)

        if (result.finish) return result;
        count = result.value;
      } else {
        count++;
      }

      if (count === order) {
        const validNumbers = digitNumbers.slice(1, 11).reverse();
        const startIdx = validNumbers.findIndex(Boolean);

        return {
          finish: true,
          value: validNumbers.slice(startIdx, 10).join('')
        };
      }
    }

    if (currentDigit === maxDigit) {
      if (currentDigit === 10) {
        return {
          finish: true,
          value: '-1',
        }
      }
      return traverse(currentDigit + 1, digitNumbers, count, maxDigit + 1, 9);
    }
    return {
      finish: false,
      value: count
    }
  }

  return traverse(1, digitNumbers, 0, 1, 9).value;
}

console.log(solution(order));