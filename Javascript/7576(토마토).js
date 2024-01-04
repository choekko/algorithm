const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [colCount, rowCount] = input[0].split(' ');
const matrix = [];

for (let i = 1; i <= rowCount; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.firstNode = null;
    this.lastNode = null;
    this.length = 0;
  }

  enqueue(value) {
    if (!this.length) {
      this.firstNode = new Node(value);
      this.lastNode = this.firstNode;
    } else {
      this.lastNode.next = new Node(value);
      this.lastNode = this.lastNode.next;
    }
    this.length++;
  }

  dequeue() {
    if (!this.length) return null;

    this.length--;
    const value = this.firstNode.value;
    this.firstNode = this.firstNode.next;
    return value;
  }
}

const solution = (matrix, rowCount, colCount) => {
  const targetRipeTomatoInfos = new Queue();
  const dRows = [-1, 0, 1, 0] // 북 동 남 서
  const dCols = [0, 1, 0, -1];

  let numberOfTomatoToRipen = function() { // 익혀야할 과일 수
    let count = 0;
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (matrix[row][col] === 0) {
          count++;
        } else if (matrix[row][col] === 1) {
          targetRipeTomatoInfos.enqueue({ row, col, ripenDay: 0 });
        }
      }
    }
    return count;
  }();

  const ripenAround = ({ row, col, ripenDay }) => { // 주변을 익게 하기
    for (let dirIdx = 0; dirIdx < dRows.length; dirIdx++) {
      const nextRow = row + dRows[dirIdx];
      const nextCol = col + dCols[dirIdx];

      if (0 > nextRow || nextRow >= rowCount || 0 > nextCol || nextCol >= colCount) continue;

      const tomatoStatus = matrix[nextRow][nextCol];

      if (tomatoStatus === 0) {
        matrix[nextRow][nextCol] = 1;
        targetRipeTomatoInfos.enqueue({ row: nextRow, col: nextCol, ripenDay: ripenDay + 1 });
        numberOfTomatoToRipen--;
      }
    }
  }

  if (numberOfTomatoToRipen === 0) return 0;
  if (!targetRipeTomatoInfos.length) return -1;

  let lastDay = 0;
  let numberOfTomatoToRipenInLastDay = numberOfTomatoToRipen;
  let targetRipeTomatoInfo;
  while (targetRipeTomatoInfos.length) {
    targetRipeTomatoInfo = targetRipeTomatoInfos.dequeue();

    if (lastDay !== targetRipeTomatoInfo.ripenDay) {
      if (numberOfTomatoToRipenInLastDay === numberOfTomatoToRipen) return -1;
      lastDay = targetRipeTomatoInfo.ripenDay;
      numberOfTomatoToRipenInLastDay = numberOfTomatoToRipen;
    }

    ripenAround(targetRipeTomatoInfo);

    if (!targetRipeTomatoInfos.length && numberOfTomatoToRipen && numberOfTomatoToRipenInLastDay === numberOfTomatoToRipen) return -1;
  }

  return lastDay;
}

console.log(solution(matrix, rowCount, colCount));