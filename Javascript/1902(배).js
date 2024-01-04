const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const craneCapacities = input[1].split(' ').map(Number);
const freights = input[3].split(' ').map(Number);

const solution = (craneCapacities, freights) => {
  craneCapacities.sort((a, b) => b - a);
  freights.sort((a, b) => a - b);

  let currentCraneIdx = 0;
  let time = 0;
  const waitingFreights = []

  while (true) {
    if (!freights.length && !waitingFreights.length) {
      return time + 1;
    }

    if (currentCraneIdx > craneCapacities.length - 1 || !freights.length) {
      time++;
      currentCraneIdx = 0;

      while (waitingFreights.length) {
        freights.push(waitingFreights.pop());
      }
    }

    const freight = freights.pop();

    if (freight > craneCapacities[0]) {
      return -1;
    }

    if (craneCapacities[currentCraneIdx] < freight) {
      waitingFreights.push(freight);
      continue;
    }
    currentCraneIdx++;

  }
}

console.log(solution(craneCapacities, freights));