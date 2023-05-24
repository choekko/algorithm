const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numberLength = Number(input[0]);

const solution = (numberLength) => {
  const NEXT_NUMBERS_MAP = {
    0: [1],
    1: [0, 2],
    2: [1, 3],
    3: [2, 4],
    4: [3, 5],
    5: [4, 6],
    6: [5, 7],
    7: [6, 8],
    8: [7, 9],
    9: [8],
  }

  let prevMemo = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const getStairNumberCount = (countPerLastNumber) => {
    return countPerLastNumber.reduce((acc, curr) => (acc + curr) % 1000000000, 0);
  }
  if (numberLength === 1) return getStairNumberCount(prevMemo);

  let currentOrder = 2;

  while (currentOrder <= numberLength) {
    const currentMemo = Array.from({ length: 10 }, () => 0);

    prevMemo.forEach((count, lastNumber) => {
      const possibleNextNumbers = NEXT_NUMBERS_MAP[lastNumber];

      possibleNextNumbers.forEach(number => {
        currentMemo[number] = (currentMemo[number] + count) % 1000000000;
      })
    })

    prevMemo = currentMemo;
    currentOrder++;
  }

  return getStairNumberCount(prevMemo);
}

console.log(solution(numberLength));