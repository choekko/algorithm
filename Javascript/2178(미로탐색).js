const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowCount, colCount] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map(line => [...line].map(Number));

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(value) {
    if (!this.rear) {
      this.front = this.rear = new Node(value);
    } else {
      this.rear.next = new Node(value);
      this.rear = this.rear.next;
    }
    this.length++;
  }

  dequeue() {
    if (!this.length) return null;

    const value = this.front.value;
    this.front = this.front.next;

    if (!this.front) {
      this.rear = null;
    }
    this.length--;
    return value;
  }
}

const solution = (matrix) => {
  const goal = [rowCount - 1, colCount - 1];

  const isComplete = (currentPosition) => {
    return currentPosition[0] === goal[0] && currentPosition[1] === goal[1];
  }

  const lookAround = (currentPosition, count, checkingMatrix) => {
    const [row, col] = currentPosition;

    const dRow = [-1, 0, 1, 0]; // 북동남서
    const dCol = [0, 1, 0, -1];

    for (let i = 0; i < 4; i++) {
      const nextRow = row + dRow[i];
      const nextCol = col + dCol[i];
      if (nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount) continue;
      if (!matrix[nextRow][nextCol] || checkingMatrix[nextRow][nextCol]) continue;

      checkingMatrix[nextRow][nextCol] = 1;
      queue.enqueue({
        position: [nextRow, nextCol],
        count: count + 1,
      })
    }
  }

  const queue = new Queue();
  queue.enqueue({
    position:  [0, 0],
    count: 1,
  })
  const checkingMatrix = Array(rowCount).fill(null).map(() => Array(colCount).fill(0));

  while (true) {
    const { position, count } = queue.dequeue();

    if (isComplete(position)) return count;
    lookAround(position, count, checkingMatrix);
  }
}

console.log(solution(matrix));

/**
 - 초기 풀이 때에는 queue에 다음 이동 위치를 담을 때 checkingBit를 넣으려는 시도를 했었다.
 - 뻗어나가는 경로 별로 checkingBit가 필요하다고 생각했었는데..
 - 1. 일단 단일 경로만 생각해보더라도 position의 개수가 최대 100 * 100 = 10000 이어서, 2^10000 의 checkingBit를 만들 수 없다.
 - 2. 뻗어나가는 경로별로 checking을 할 필요가 없는 이유는, bfs 상 다른 경로에서 누군가 왔던 position이면 갈 필요가 없기 때문이다 (다른 경로가 더 빠르게 도착했었다는 이야기이므로)
 */