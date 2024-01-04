const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const snowBalls = input[1].split(' ').map(Number);

const solution = (snowBalls) => {
  snowBalls.sort((a, b) => a - b);

  let result = Infinity;
  for (let smallestIdx = 0; smallestIdx < snowBalls.length; smallestIdx++) {
    for (let biggestIdx = smallestIdx + 3; biggestIdx < snowBalls.length; biggestIdx++) {
      const smallest = snowBalls[smallestIdx];
      const biggest = snowBalls[biggestIdx];
      let smallIdx = smallestIdx + 1;
      let bigIdx = biggestIdx - 1;

      while (smallIdx < bigIdx) {
        const small = snowBalls[smallIdx];
        const big = snowBalls[bigIdx];
        const offset1 = small - smallest;
        const offset2 = biggest - big;

        const difference = offset2 - offset1;
        result = Math.min(result, Math.abs(difference));

        if (!difference) return 0;
        if (difference > 0) {
          smallIdx++;
          continue;
        }
        if (difference < 0) {
          bigIdx--;
          continue;
        }
      }
    }
  }

  return result;
}

console.log(solution(snowBalls));