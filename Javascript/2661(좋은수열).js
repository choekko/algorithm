const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const digit = Number(input[0]);

const solution = (digit) => {
  const numbers = [0];

  while (numbers.length <= digit) { // 로직상 끝에 0이 남게 되므로
    const prevNumber = numbers.pop();
    const prevLength = numbers.length;
    for (let candidate = prevNumber + 1; candidate <= 3; candidate++) {
      numbers.push(candidate);
      let possible = true;
      for (let diffLength = 1; diffLength <= Math.floor(digit / 2); diffLength++) {
        const diff1 = numbers.slice(numbers.length - diffLength, numbers.length);
        const diff2 = numbers.slice(numbers.length - diffLength * 2, numbers.length - diffLength);

        if (diff1.join('') === diff2.join('')) {
          possible = false;
          numbers.pop();
          break;
        }
      }
      if (possible) {
        break;
      }
    }

    if (numbers.length !== prevLength) {
      numbers.push(0);
    }
  }

  numbers.pop(); // 마지막 0 제거

  return numbers.join('')
}

console.log(solution(digit));