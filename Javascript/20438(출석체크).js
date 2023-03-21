const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const [studentCount, sleeperCount, codeCount, sectionCount] = input[0].split(' ').map(Number);
const sleepers = input[1].split(' ').map(Number);
const codeReceivers = input[2].split(' ').map(Number);
const sections = input.slice(3).map(section => section.split(' ').map(Number));


const solutions = (studentCount, sleepers, codeReceivers, sections) => {
  const attendee = Array(studentCount + 3).fill(0); // 0: 불출석, -1: 자는사람, 1: 출석

  sleepers.forEach(sleeper => attendee[sleeper] = -1);

  codeReceivers.forEach(receiver => {
    if (attendee[receiver] === -1) return;
    const startStudent = receiver;
    while (receiver < studentCount + 3) {
      if (attendee[receiver] !== -1) {
        attendee[receiver] = 1
      }
      receiver += startStudent
    }
  })

  const prefixSum = Array(studentCount + 3).fill(0);

  prefixSum.forEach((_, idx) => {
    if (idx < 3) return;
    prefixSum[idx] = prefixSum[idx - 1] + Number(attendee[idx] !== 1); // 왜 0 + true 가 1이 아닌 true 가 되지?
  })

  return sections.map(([start, end]) => prefixSum[end] - prefixSum[start - 1]).join('\n');
}

console.log(solutions(studentCount, sleepers, codeReceivers,  sections));