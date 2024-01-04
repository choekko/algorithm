const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const testCount = Number(input[0]);
const testCases = [];

for (let i = 1; i <= testCount * 2; i += 2) {
  const numbers = input[i + 1].split(' ').map(Number);

  testCases.push(numbers);
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  enqueue(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  dequeue() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    if (!this.heap.length) {
      return null;
    }

    const root = this.heap[0];

    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();

    return root;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  compare(node1, node2) {
    return node1 < node2;
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    while (currentIdx !== 0) {
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
    let parentIdx = 0;

    while (true) {
      const parent = this.heap[parentIdx];
      const leftChildIdx = parentIdx * 2 + 1;
      const rightChildIdx = parentIdx * 2 + 2;
      const leftChild = this.heap[leftChildIdx];
      const rightChild = this.heap[rightChildIdx];

      if (this.compare(leftChild ?? Infinity, rightChild ?? Infinity)) {
        if (this.compare(leftChild, parent)) {
          this.swap(parentIdx, leftChildIdx);
          parentIdx = leftChildIdx;
          continue;
        }
      }

      if (this.compare(rightChild ?? Infinity, parent)) {
        this.swap(rightChildIdx, parentIdx);
        parentIdx = rightChildIdx;
        continue;
      }

      return;
    }
  }
}

const minHeap = new MinHeap();

const solution = (testCases) => {
  const getMinCost = (numbers) => {
    const minHeap = new MinHeap();

    for (const number of numbers) {
      minHeap.enqueue(number);
    }

    let minCost = 0;
    while (minHeap.heap.length >= 2) {
      const smallestNumber = minHeap.dequeue();
      const secondSmallestNumber = minHeap.dequeue();

      const sum = smallestNumber + secondSmallestNumber;
      minHeap.enqueue(sum);
      minCost += sum;
    }

    return minCost;
  }

  return testCases.map(getMinCost).join('\n')
}

console.log(solution(testCases));



// 300
// 826