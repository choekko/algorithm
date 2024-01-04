const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const developers = input[1].split(' ').map(Number);

const solution = (developers) => {
  let leftIdx = 0;
  let rightIdx = developers.length - 1;
  let result = -Infinity;


  while (leftIdx < rightIdx) {
    const left = developers[leftIdx];
    const right = developers[rightIdx];
    const smallerValue = Math.min(left, right);
    const stat = (rightIdx - leftIdx - 1) * smallerValue;

    if (stat > result) {
      result = stat;
    }

    const isLeftBigger = left > right;

    if (isLeftBigger) {
      rightIdx--;
    } else {
      leftIdx++;
    }
  }

  return result;
}

console.log(solution(developers));


// 4