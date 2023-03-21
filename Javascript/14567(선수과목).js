const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const [subjectCount, edgeCount] = input[0].split(' ').map(Number);
const edges = input.slice(1).map(edge => edge.split(' ').map(Number));

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = this.rear = new Node(null);
    this.length = 0;
  }

  enqueue(value) {
    this.rear.value = value;
    this.rear.next = new Node(null);
    this.rear = this.rear.next;
    this.length++;
  }

  dequeue() {
    if (!this.length) return null;

    const value = this.front.value;
    this.front = this.front.next;
    this.length--;
    return value;
  }
}

const solution = (subjectCount, edges) => {
  // accessInfo : Array<[진입 차수, Array<진출 노드>]>
  const accessInfo = Array(subjectCount + 1).fill(null).map(() => [0, []]); // 0 인덱스 패딩 있음
  const semesters = Array(subjectCount + 1).fill(0);

  for (let edge of edges) {
    const [preSubject, subject] = edge;
    accessInfo[preSubject][1].push(subject);
    if (accessInfo[subject]) { // 이 가드를 안하면 백준이 타입에러를 낸다.. 왤까..? 이 문제만 그런게 아니다. ㅠㅠ
      accessInfo[subject][0]++;
    }
  }

  const subjects = new Queue(); // [과목, 이수학기]

  for (let i = 1; i < subjectCount + 1; i++) {
    if (accessInfo[i][0] === 0) {
      subjects.enqueue([i, 1]);
    }
  }
  while (subjects.length) {
    const [subjectName, semester] = subjects.dequeue();
    semesters[subjectName] = semester;

    accessInfo[subjectName][1].forEach(nextSubjectName => {
      const enterDegree = accessInfo[nextSubjectName][0] -= 1;
      if (enterDegree === 0) {
        subjects.enqueue([nextSubjectName, semester + 1]);
      }
    })
  }

  return semesters.slice(1).join(' ');
}

console.log(solution(subjectCount, edges));