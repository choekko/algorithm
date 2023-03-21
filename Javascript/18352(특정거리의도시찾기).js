let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');
const [numberCount, edgeCount, pathLength, startNumber] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(edge => edge.split(' ').map(Number));

class MinHeap {
  constructor() {
    this.heap = [];
  }

  heapifyDown() {
    let currentIdx = 0;

    while (true) {
      let leftChildIdx = currentIdx * 2 - 1;
      let rightChildIdx = currentIdx * 2;
      const current = this.heap[currentIdx];

      if (!current) return;

      const leftChild = this.heap[leftChildIdx] ?? -Infinity;
      const rightChild = this.heap[rightChildIdx] ?? -Infinity;
      if (this.compare(leftChild, rightChild) && this.compare(leftChild, current)) {
        this.swap(currentIdx, leftChildIdx);
        currentIdx = leftChildIdx;
        continue;
      }
      if (this.compare(rightChild, current)) {
        this.swap(currentIdx, rightChildIdx);
        currentIdx = rightChildIdx;
        continue;
      }
      return;
    }
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    if (currentIdx < 0) return;

    while (true) {
      const parentIdx = Math.floor(currentIdx / 2) - !(currentIdx % 2);
      const current = this.heap[currentIdx];
      const parent = this.heap[parentIdx];

      if (this.compare(parent, current)) {
        this.swap(currentIdx, parentIdx);
        currentIdx = parentIdx;
        continue;
      }
      return;
    }
  }

  compare(node1, node2) {
    if (!node1 || !node2) return false;
    return node1[0] - node2[0] > 0;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop() {
    if (!this.heap.length) return null;

    const returnValue = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap.pop();
    this.heapifyDown();
    return returnValue;
  }
}

const solution = (edges, numberCount, pathLength, startNumber) => {
  const edgesPerNumber = Array(numberCount + 1).fill(null).map(() => []);

  edges.forEach(([start, end]) => {
    edgesPerNumber[start].push(end);
  })

  const d = Array(numberCount + 1).fill(Infinity);
  const checker = Array(numberCount + 1).fill(false);
  d[startNumber] = 0;

  let currentNumber = startNumber;
  const minHeap = new MinHeap();

  while (true) {
    const targets = edgesPerNumber[currentNumber];

    targets.forEach(number => {
      if (checker[number]) return;
      const cost = Math.min(d[currentNumber] + 1, d[number]);
      d[number] = cost;
      minHeap.push([cost, number]);
    })

    checker[currentNumber] = true;

    let node = minHeap.pop();
    while (node && checker[node[1]]) {
      node = minHeap.pop();
    }
    if (!node) break;


    const [_, number] = node;
    currentNumber = number;
  }

  const result = [];

  d.forEach((minLength, idx) => {
    if (!idx) return;
    if (minLength === pathLength) {
      result.push(idx);
    }
  })

  return result.length === 0 ? '-1' : result.join('\n');
}

console.log(solution(edges, numberCount, pathLength, startNumber));

