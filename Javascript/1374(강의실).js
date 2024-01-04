const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const schedules = input.slice(1).map(line => {
  const [_, start, end] = line.split(' ').map(Number);
  return { start, end };
})

class MinHeap {
  constructor() {
    this.heap = [];
  }

  enqueue(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  dequeue() {
    if (!this.heap.length) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();

    return root;
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    while (currentIdx > 0) {
      const current = this.heap[currentIdx];
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.heap[parentIdx];

      if (this.compare(current, parent)) {
        this.swap(currentIdx, parentIdx);
        currentIdx = parentIdx;
        continue;
      }

      return;
    }
  }

  heapifyDown() {
    let currentIdx = 0;

    while (true) {
      const current = this.heap[currentIdx];
      const leftIdx = Math.floor(2 * currentIdx + 1);
      const leftChild = this.heap[leftIdx];
      const rightIdx = Math.floor(2 * currentIdx + 2);
      const rightChild = this.heap[rightIdx];

      if (this.compare(leftChild ?? Infinity, rightChild ?? Infinity)) {
        if (this.compare(leftChild, current)) {
          this.swap(currentIdx, leftIdx);
          currentIdx = leftIdx;
          continue;
        }
      }

      if (this.compare(rightChild, current)) {
        this.swap(currentIdx, rightIdx);
        currentIdx = rightIdx;
        continue;
      }

      return;
    }
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  compare(node1, node2) {
    return node1 < node2;
  }
}

const solution = (schedules) => {
  schedules.sort((a, b) => a.start - b.start);

  const minHeap = new MinHeap();

  let count = 0;

  for (const { start, end } of schedules) {
    const minEndTime = minHeap.heap[0]
    if (minEndTime === undefined || minEndTime > start) {
      minHeap.enqueue(end);
      count++;
      continue;
    }
    minHeap.dequeue();
    minHeap.enqueue(end);
  }

  return count;
}

console.log(solution(schedules))


