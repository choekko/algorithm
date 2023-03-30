const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [numberCount, targetSum] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const combination = (numbers, r) => {
  if (r === 1) return numbers.map(number => [number]);

  const result = [];
  numbers.forEach((number, idx) => {
    const candidates = combination(numbers.slice(idx + 1), r - 1).map(candidate => {
      candidate.unshift(number);
      return candidate;  // [number, ...candidate] 로 반환했더니 메모리 초과가 났었다.
    });
    result.push(...candidates);
  })
  return result;
}

const solution = (numbers, targetSum) => {
  const rArray = Array.from({ length: numbers.length }, (_, i) => i + 1);
  let result = 0;
  rArray.forEach(r => combination(numbers, r).forEach(candidate => {
    const sum = candidate.reduce((acc, curr) => acc + curr, 0);
    if (sum === targetSum) result++;
  }))


  return result;
}

console.log(solution(numbers, targetSum));