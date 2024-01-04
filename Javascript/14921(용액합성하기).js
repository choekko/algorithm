const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const mixtures = input[1].split(' ').map(Number);

const solution = (mixtures) => {
  mixtures.sort((a, b) => a - b);

  let leftIdx = 0;
  let rightIdx = mixtures.length - 1;

  let result = Infinity;

  while (leftIdx < rightIdx) {
    const left = mixtures[leftIdx];
    const right = mixtures[rightIdx];
    const sum = left + right;

    if (Math.abs(sum) < Math.abs(result)) {
      result = sum;
    }

    if (sum === 0) break;

    if (sum < 0) {
      leftIdx += 1;
    } else {
      rightIdx -= 1;
    }
  }

  return result;
}

console.log(solution(mixtures));