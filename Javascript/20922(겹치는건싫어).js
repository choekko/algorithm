const fs = require('fs');
const input = fs.readFileSync('./test.txt').toString().split('\n')
const [numberCount, duplicateLimit] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

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
    if (!this.length) {
      this.front = this.rear = new Node(value);
    } else {
      this.rear = this.rear.next = new Node(value);
    }
    this.length++;
    return this;
  }

  dequeue() {
    if (!this.length) return null;

    const target = this.front.value;
    this.front = this.front.next;
    this.length--;
    if (this.length === 0) {
      this.rear = null;
    }
    return target;
  }

  peekFront() {
    return this.front?.value;
  }
}

const solution = (numbers, duplicateLimit) => {
  let duplicatedIndicesMap = {};
  let result = -Infinity;
  let leftIdx = 0;
  let currentIdx = 0;

  const updateResult = () => {
    result = Math.max(result, currentIdx - leftIdx);
  }

  while (leftIdx < numbers.length && currentIdx < numbers.length) {
    const currentNumber = numbers[currentIdx];

    const duplicatedIndices = duplicatedIndicesMap[currentNumber];
    if (duplicatedIndices?.length === duplicateLimit) {
      const frontIdx = duplicatedIndices.dequeue();
      updateResult();
      const newLeftIdx = duplicatedIndices.peekFront() <= frontIdx ? currentIdx : frontIdx + 1;
      leftIdx = Math.max(newLeftIdx, leftIdx);
    }
    if (!duplicatedIndices) {
      duplicatedIndicesMap[currentNumber] = (new Queue()).enqueue(currentIdx);
    } else {
      duplicatedIndices.enqueue(currentIdx);
    }
    currentIdx++;
  }
  updateResult();

  return result;
}
console.log(solution(numbers, duplicateLimit));
