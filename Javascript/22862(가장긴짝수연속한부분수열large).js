const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const [_, maxDeletionCount] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);


const solution = (numbers, maxDeletionCount) => {
  const evenNumberCountsInSection = [] // numbers에서 홀수를 만날 때마다, 이전에 마지막으로 만났던 홀수 이후부터의 짝수 개수를 담는다.

  let evenNumberCount = 0;
  numbers.forEach((number) => {
    if (number % 2) {
      evenNumberCountsInSection.push(evenNumberCount);
      evenNumberCount = 0;
      return;
    }
    evenNumberCount += 1;
  })
  evenNumberCountsInSection.push(evenNumberCount); // 마지막 부분이 짝수 수열로 끝날 경우를 대비

  if (evenNumberCountsInSection.length - 1 <= maxDeletionCount) return evenNumberCountsInSection.reduce((acc, count) => acc + count, 0);

  let leftIdx = 0;
  let rightIdx = 0 + maxDeletionCount;
  let currentSum = evenNumberCountsInSection.slice(leftIdx, rightIdx + 1).reduce((acc, curr) => acc + curr, 0);
  let result = currentSum;
  while (rightIdx < evenNumberCountsInSection.length - 1) {
    currentSum = currentSum - evenNumberCountsInSection[leftIdx] + evenNumberCountsInSection[rightIdx + 1];
    result = Math.max(result, currentSum);
    leftIdx++;
    rightIdx++;
  }

  return result;
}

console.log(solution(numbers, maxDeletionCount))