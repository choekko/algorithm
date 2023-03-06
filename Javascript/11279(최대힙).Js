let fs = require('fs');
let input = fs.readFileSync('./test.txt').toString().split('\n');

class MaxHeap {
  heap;

  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop(node) {
    if (!this.heap.length) return null;
    [this.heap[0], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[0]];
    const maxNode = this.heap.pop(node);
    this.heapifyDown();
    return maxNode;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex !== 0) {
      const isCurrentIndexOdd = currentIndex % 2 === 1;
      const parentIndex =  (currentIndex - (isCurrentIndexOdd ? 1 : 2)) / 2

      if (this.swapWithCompare(currentIndex, parentIndex)) {
        currentIndex = parentIndex;
        continue;
      }
      return;
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;

      if (leftChildIndex >= this.heap.length && rightChildIndex >= this.heap.length) return;

      let biggerChildIndex = rightChildIndex;
      if (this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex] ?? -Infinity)) {
        biggerChildIndex = leftChildIndex;
      }
      if (this.swapWithCompare(biggerChildIndex, currentIndex)) {
        currentIndex = biggerChildIndex;
        continue;
      }
      return;
    }
  }

  compare(a, b) {
    return a - b > 0
  }

  swapWithCompare(indexA, indexB) {
    if (this.compare(this.heap[indexA], this.heap[indexB] ?? -Infinity)) {
      [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
      return true;
    }
    return false;
  }
}

const maxHeap = new MaxHeap();
const result = [];

input.forEach((string, idx) => {
  if (idx === 0) return;
  if (string === '0') {
    const maxNode = maxHeap.pop();
    result.push(maxNode ?? '0');
    return;
  }
  maxHeap.push(string);
})

console.log(result.join('\n'));