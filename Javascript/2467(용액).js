const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const solutionsCount = Number(input[0]);
const solutions = input[1].split(' ').map(Number);

const solution = solutions => {
  let leftIdx = 0;
  let rightIdx = solutions.length - 1;
  let minValue = Infinity;
  let result;

  while (leftIdx < rightIdx) {
    const left = solutions[leftIdx];
    const right = solutions[rightIdx];
    const absSum = Math.abs(left + right);

    if (absSum < minValue) {
      minValue = absSum;
      result = `${left} ${right}`;
    }

    if (minValue === 0) {
      break;
    }

    if (left + right > 0) {
      rightIdx--;
    } else {
      leftIdx++;
    }
  }

  return result;
}

console.log(solution(solutions))