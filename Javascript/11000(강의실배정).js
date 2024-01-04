const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const times = input.slice(1).map(line => {
  const [start, end] = line.split(' ').map(Number);
  return { start, end };
})

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop() {
    if (!this.heap.length) return null;

    const rootNode = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();
    return rootNode;
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    while (true) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      if (this.compare(this.heap[parentIdx], this.heap[currentIdx])) {
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
      const leftChildIdx = currentIdx * 2 + 1;
      const rightChildIdx = currentIdx * 2 + 2;
      const leftChild = this.heap[leftChildIdx];
      const rightChild = this.heap[rightChildIdx];

      if (leftChild === undefined && rightChild === undefined) return;

      if (this.compare(rightChild ?? +Infinity, leftChild)) {
        if (this.compare(current, leftChild)) {
          this.swap(currentIdx, leftChildIdx);
          currentIdx = leftChildIdx;
          continue;
        }
      }

      if (this.compare(current, rightChild)) {
        this.swap(currentIdx, rightChildIdx);
        currentIdx = rightChildIdx;
        continue;
      }

      return;
    }
  }

  compare(node1, node2) {
    return node1 > node2;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
}

const solution = (times) => {
  times.sort((a, b) => a.start - b.start);

  const minEndTimeHeap = new MinHeap();
  let roomCount = 0;

  for (const { start, end } of times) {
    const minEndTime = minEndTimeHeap.pop();

    if (!minEndTime || minEndTime > start) {
      roomCount++;
      minEndTime && minEndTimeHeap.push(minEndTime);
    }
    minEndTimeHeap.push(end);
  }

  return roomCount;
}

console.log(solution(times));

