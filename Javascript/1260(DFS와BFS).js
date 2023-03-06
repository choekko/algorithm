let fs = require('fs');
let input = fs.readFileSync('./test.txt').toString().split('\n');
const [vertexCount, edgeCount, startNumber] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(edge => edge.split(' ').map(Number));

class Queue {
  constructor(size) {
    this.queue = [...Array(size).fill(null)];
    this.frontIndex = 0;
    this.rearIndex = 0;
    this.length = 0;
    this.size = size;
  }

  dequeue() {
    if (!this.length) return null;
    const frontNode = this.queue[this.frontIndex];
    this.queue[this.frontIndex] = null;
    this.frontIndex = (this.frontIndex + 1) % this.size;
    this.length--;
    return frontNode;
  }

  enqueue(node) {
    if (this.length === this.size) throw Error('Queue Overflow');
    this.queue[this.rearIndex] = node;
    this.rearIndex = (this.rearIndex + 1 ) % this.size;
    this.length++;
  }
}

const solution = () => {
  const stack = [];
  const queue = new Queue(edgeCount);


  let graph = Array.from({ length: vertexCount + 1 }, () => []);

  console.log(edges);
  edges.forEach(([ leftNode, rightNode ]) => {
    graph[leftNode].push(rightNode);
    graph[rightNode].push(leftNode);
  })
  graph = graph.map(info => {
    return info.sort((a, b) => a - b);
  });
  console.log(graph)


  const visitForDfs = [...Array(vertexCount + 1).fill(false)];
  const visitForBfs = [...visitForDfs];

  const dfsResult = [];
  const bfsResult = [];

  stack.push(startNumber);
  queue.enqueue(startNumber);

  while (stack.length) {
    const currentNode = stack.pop();
    if (visitForDfs[currentNode]) continue;

    dfsResult.push(currentNode);
    visitForDfs[currentNode] = true;

    for (let i = graph[currentNode].length - 1; i >= 0 ; i--) {
      const node = graph[currentNode][i];

      if (!visitForDfs[node]) {
        stack.push(node);
      }
    }
  }

  while (queue.length) {
    const currentNode = queue.dequeue();
    if (visitForBfs[currentNode]) continue;

    bfsResult.push(currentNode);
    visitForBfs[currentNode] = true;

    graph[currentNode].forEach(node => {
      if (!visitForBfs[node]) {
        queue.enqueue(node);
      }
    })
  }

  console.log(dfsResult.join(' '));
  console.log(bfsResult.join(' '));
}

solution();



