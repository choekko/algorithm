class MaxHeap {
  constructor() {
    this.heap = [];
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    while (true) {
      if (currentIdx === 0) return;
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (this.compare(this.heap[currentIdx], this.heap[parentIdx])) {
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
      const leftChildIdx = currentIdx * 2 + 1;
      const rightChildIdx = currentIdx * 2 + 2;

      if (!this.heap[leftChildIdx] || !this.heap[rightChildIdx]) return;

      if (this.compare(this.heap[leftChildIdx], this.heap[rightChildIdx] ?? -Infinity)) {
        if (this.compare(this.heap[leftChildIdx], this.heap[currentIdx])) {
          this.swap(leftChildIdx, currentIdx);
          currentIdx = leftChildIdx;
          continue;
        }
      }

      if (this.compare(this.heap[rightChildIdx], this.heap[currentIdx])) {
        this.swap(rightChildIdx, currentIdx);
        currentIdx = rightChildIdx;
        continue;
      }

      return;
    }
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop() {
    if (!this.heap.length) return null;

    this.swap(0, this.heap.length - 1);
    const value = this.heap.pop();
    this.heapifyDown();
    return value;
  }

  compare(node1, node2) {
    return node1 > node2;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  getLength() {
    return this.heap.length;
  }
}


const maxHeap = new MaxHeap();

[5, 4, 2, 3, 1, 1, 1, 13, 200, 1, 11, 13, 5, 1, 9].forEach(number => maxHeap.push(number));

console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());

console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
console.log(maxHeap.pop());
