const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [plantCount, initialWireCount] = input[0].split(' ').map(Number);
const maxWireLength = Number(input[1]);
const positions = input.slice(2, 2 + plantCount).map(line => line.split(' ').map(Number)).map(([row, col]) => ({ row, col}));
const edges = Array.from({length: plantCount}, () => []);
input.slice(2 + plantCount, 2 + plantCount + initialWireCount).map(line => line.split(' ').map(Number)).forEach(([plant1, plant2]) => {
  edges[plant1 - 1].push(plant2 - 1);
  edges[plant2 - 1].push(plant1 - 1);
})

class MinHeap {
  constructor() {
    this.heap = [];
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

  enqueue(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;
    while (currentIdx !== 0) {
      const current = this.heap[currentIdx];
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      const parent = this.heap[parentIdx];

      if (this.compare(current, parent)) {
        this.swap(parentIdx,  currentIdx);
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

      if (this.compare(leftChild ?? [Infinity], rightChild ?? [Infinity])) {
        if (this.compare(leftChild, current)) {
          this.swap(leftChildIdx, currentIdx);
          currentIdx = leftChildIdx;
          continue;
        }
      }
      if (this.compare(rightChild ?? [Infinity], current)) {
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
    return node1[0] < node2[0]
  }
}
const solution = (positions, maxWireLength, edges, plantCount) => {
  const getDistance = (position1, position2) => {
    const distance = Math.sqrt((position1.row - position2.row) ** 2 + (position1.col - position2.col) ** 2);

    return distance > maxWireLength ? Infinity : distance;
  }
  
  const minHeap = new MinHeap();

  const flags = Array.from({ length: plantCount }, () => false);
  let minWireLengthSums = Array.from({ length: plantCount }, () => Infinity);
  minWireLengthSums[0] = 0;
  minHeap.enqueue([0, 0]);
  
  let finishCount = 0;
  while (finishCount < plantCount) {
    const [wireLengthSum, currentNode] = minHeap.dequeue();

    edges[currentNode].forEach(freeNode => {
      minWireLengthSums[freeNode] = Math.min(minWireLengthSums[freeNode], wireLengthSum);
    })

    flags[currentNode] = true;

    for (let node = 0; node < plantCount; node++) {
      if (flags[node]) continue;
      const minWireLengthSum = minWireLengthSums[node];
      const minValue = Math.min(minWireLengthSum, wireLengthSum + getDistance(positions[currentNode], positions[node]));
      minHeap.enqueue([minValue, node]);
      minWireLengthSums[node] = minValue;
    }

    finishCount++;
  }

  return Math.floor(minWireLengthSums[plantCount - 1] * 1000);
}

console.log(solution(positions, maxWireLength,  edges, plantCount))
