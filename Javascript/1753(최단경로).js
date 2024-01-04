const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, edgeCount] = input[0].split(' ').map(Number);
const startNode = Number(input[1]);
const edgesPerNode = Array(nodeCount).fill(0).map(() => []);

for (let i = 2; i < 2 + edgeCount; i++) {
  const [ start, end, cost ] = input[i].split(' ').map(Number);
  edgesPerNode[start - 1].push({ end: end - 1, cost });
}

class MinHeap {
  constructor() {
    this.heap = []
  }

  enqueue(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  dequeue() {
    if (!this.heap.length) return null;
    if (this.heap.length === 1) return this.heap.pop();

    this.swap(0, this.heap.length - 1);

    const value = this.heap.pop();
    this.heapifyDown();

    return value;
  }

  heapifyUp () {
    let currentIdx = this.heap.length - 1;

    while (true) {
      if (!currentIdx) return;

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
    let parentIdx = 0;

    while (true) {
      const leftChildIdx = parentIdx * 2 + 1;
      const leftChild = this.heap[leftChildIdx];
      const rightChildIdx = parentIdx * 2 + 2;
      const rightChild = this.heap[rightChildIdx];

      if (this.compare(this.heap[parentIdx], leftChild ?? [Infinity])) {
        if (this.compare(rightChild ?? [Infinity], leftChild)) {
          this.swap(parentIdx, leftChildIdx);
          parentIdx = leftChildIdx;
          continue;
        }
      }

      if (this.compare(this.heap[parentIdx], rightChild ?? [Infinity])) {
        this.swap(parentIdx, rightChildIdx);
        parentIdx = rightChildIdx;
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

const solution = (startNode, edgesPerNode, nodeCount) => {
  const costs = Array(nodeCount).fill(0).map(() => ({ minCost: Infinity, isDone: false }));
  costs[startNode - 1] = { minCost: 0, isDone: false };

  let doneCount = 0;
  const minHeap = new MinHeap();
  minHeap.enqueue([0, startNode - 1]);

  while (doneCount < nodeCount && minHeap.heap.length) {
    const [prevCost, currentNode] = minHeap.dequeue();
    if (costs[currentNode].isDone) continue;

    const edges = edgesPerNode[currentNode];
    costs[currentNode].isDone = true;
    doneCount++;

    for (const { end, cost: edgeCost } of edges) {
      const cost = prevCost + edgeCost;

      costs[end].minCost = Math.min(costs[end].minCost, cost);
      minHeap.enqueue([costs[end].minCost, end]);
    }
  }

  return costs.map(({ minCost }) => minCost === Infinity ? 'INF' : minCost).join('\n');
}

console.log(solution(startNode, edgesPerNode, nodeCount))
