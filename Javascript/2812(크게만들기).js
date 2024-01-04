const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, numberCountToDelete] = input[0].split(' ').map(Number);
const numbers = [...input[1]].map(Number);


class MaxHeap {
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

    const value = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();
    return value;
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    while(true) {
      if (!currentIdx) return;

      const current = this.heap[currentIdx];
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.heap[parentIdx];

      if (this.compare(current, parent ?? [-Infinity])) {
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
      const leftChildIdx = 2 * currentIdx + 1;
      const leftChild = this.heap[leftChildIdx];
      const rightChildIdx = 2 * currentIdx + 2;
      const rightChild = this.heap[rightChildIdx];

      if (this.compare(leftChild ?? [-Infinity], rightChild ?? [-Infinity])) {
        if (this.compare(leftChild, current)) {
          this.swap(currentIdx, leftChildIdx);
          currentIdx = leftChildIdx;
          continue;
        }
      }

      if (this.compare(rightChild ?? [-Infinity], current)) {
        this.swap(rightChildIdx, currentIdx);
        currentIdx = rightChildIdx;
        continue;
      }

      return;
    }
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  compare(node1, node2) {
    return node1[0] > node2[0];
  }
}

const solution = (numbers, numberCountToDelete) => {
  const targetDigit = numbers.length - numberCountToDelete;
  const maxHeap = new MaxHeap();
  let minIdx = 0;
  let result = '';
  let i;
  for (i = 0; i < numberCountToDelete; i++) {
    maxHeap.enqueue([numbers[i], i]);
  }

  while (result.length < targetDigit) {
    maxHeap.enqueue([numbers[i], i]);
    i++;
    while (true) {
      const [maxNumber, idx] = maxHeap.dequeue();

      if (idx >= minIdx) {
        result += String(maxNumber);
        minIdx = idx + 1;
        break;
      }
    }
  }

  return result;
}

console.log(solution(numbers, numberCountToDelete))