const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.slice(1).map(line => line.split(''));
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

const solution = (matrix) => {
  const ROW_COUNT = matrix.length;
  const COL_COUNT = matrix[0].length;
  const D_ROWS = [-1, 0, 1, 0]; // 북 동 남 서
  const D_COLS = [0, 1, 0, -1];

  const personQueue = new Queue();
  const fireQueue = new Queue();

  matrix.forEach((line, row) => line.forEach((value, col) => {
    if (value === 'J') {
      personQueue.enqueue({ row, col, time: 0 });
      return;
    }

    if (value === 'F') {
      fireQueue.enqueue({ row, col, time: 0});
    }
  }))

  const spreadFire = () => {
    if (!fireQueue.length) return false;

    const prevTime = fireQueue.firstNode.value.time;

    while (fireQueue.length) {
      if (fireQueue.firstNode.value.time !== prevTime) break;
      const { row, col, time } = fireQueue.dequeue();

      for (let i = 0; i < D_COLS.length; i++) {
        const nextRow = row + D_ROWS[i];
        const nextCol = col + D_COLS[i];

        if (nextRow < 0 || nextRow >= ROW_COUNT || nextCol < 0 || nextCol >= COL_COUNT || ['F', '#'].includes(matrix[nextRow][nextCol])) continue;
        matrix[nextRow][nextCol] = 'F';
        fireQueue.enqueue({ row: nextRow, col: nextCol, time: time + 1 });
      }
    }

    return true;
  }

  const runAway = () => { // 이동 불가 시 -1, 이동했지만 아직 탈출 불가시 0, 탈출 시 시간값 반환
    if (!personQueue.length) return -1;

    const prevTime = personQueue.firstNode.value.time;

    while (personQueue.length) {
      if (personQueue.firstNode.value.time !== prevTime) break;
      const { row, col, time }= personQueue.dequeue();

      for (let i = 0; i < D_COLS.length; i++) {
        const nextRow = row + D_ROWS[i];
        const nextCol = col + D_COLS[i];

        if (nextRow < 0 || nextRow >= ROW_COUNT || nextCol < 0 || nextCol >= COL_COUNT) {
          return time + 1;
        }

        if (['F', '#', 'J'].includes(matrix[nextRow][nextCol])) continue;
        matrix[nextRow][nextCol] = 'J';
        personQueue.enqueue({ row: nextRow, col: nextCol, time: time + 1 });
      }
    }

    return 0;
  }

  while (true) {
    spreadFire();
    const result = runAway();

    if (result === 0) continue;
    if (result === -1) return 'IMPOSSIBLE';
    return result;
  }
}

console.log(solution(matrix))