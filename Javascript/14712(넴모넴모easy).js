const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowCount, colCount] = input[0].split(' ').map(Number);

const solution = (rowCount, colCount) => {
  if (rowCount === 25 || colCount === 25) return 2 ** 25; // 빠르게 계산하도록 하기 위함. rowCount === 25 조건은 없어도 시간 초과 나지 않음

  const checkingArray = Array.from({ length: rowCount * colCount }, () => false);

  const isPossible = (idx) => {
    const upperIdx = idx - colCount;
    const leftIdx = idx - 1;
    const diagonalIdx = idx - colCount - 1;

    if (idx % colCount === 0) return true;
1
    return [upperIdx, leftIdx, diagonalIdx].some(idx => checkingArray[idx] !== true);
  }

  let count = 0;

  const traverse = (idx) => {
    if (idx === rowCount * colCount) {
      count++;
      return;
    }

    if (isPossible(idx)) {
      checkingArray[idx] = true;
      traverse(idx + 1);
    }
    checkingArray[idx] = false;
    traverse(idx + 1);
  }

  traverse(0);

  return count;
}

console.log(solution(rowCount, colCount))