let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');
const commandLength = Number(input.shift());

class Queue {
  #queue
  #frontIdx
  #rearIdx
  get #size() { return this.#queue.length; }

  length;

  constructor(size) {
    this.#queue = [...Array(size).fill(null)];
    this.#frontIdx = -1;
    this.#rearIdx = -1;
    this.length = 0;
  }

  enqueue(node) {
    if (this.length >= this.#size) {
      throw Error('Queue Overflow');
    }

    if (this.#rearIdx / this.#size === 1) {
      this.#rearIdx = 0;
    } else {
      this.#rearIdx++;
    }

    this.#queue[this.#rearIdx] = node;
    this.length++;
  }

  dequeue() {
    if (!this.length) return null;
    const frontNode = this.#queue[this.#frontIdx + 1];

    if (this.#frontIdx / this.#size === 1) {
      this.#frontIdx = -1;
    } else {
      this.#frontIdx++
    }

    this.length--;
    return frontNode;
  }

  peekFront() {
    if (!this.length) return null;
    return this.#queue[this.#frontIdx + 1];
  }
  peekBack() {
    if (!this.length) return null;
    return this.#queue[this.#rearIdx];
  }
}

const queue = new Queue(commandLength);

const result = [];
input.forEach(command => {
  const [task, value] = command.split(' ');

  switch (task) {
    case 'push': {
      queue.enqueue(value);
      break;
    }
    case 'pop': {
      result.push(queue.dequeue() ?? -1);
      break;
    }
    case 'size': {
      result.push(queue.length);
      break;
    }
    case 'front': {
      result.push(queue.peekFront() ?? -1);
      break;
    }
    case 'back': {
      result.push(queue.peekBack() ?? -1);
      break;
    }
    case 'empty': {
      result.push(queue.length ? 0 : 1);
      break;
    }
    default: return;
  }
})

console.log(result.join('\n'));

