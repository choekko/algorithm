const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [targetLength] = input[0].split(' ').map(Number);
const pipes = input.slice(1).map(line => {
  const [length, capacity] = line.split(' ').map(Number);
  return { length, capacity };
})

const solution = (targetLength, pipes) => {
  pipes.sort((a, b) => a.length - b.length);

  const possibleResult = {};

  for (const { length: pipeLength, capacity: pipeCapacity } of pipes) {
    const results = Object.entries(possibleResult);

    results.forEach(([lengthAsString, capacity]) => {
      const length = Number(lengthAsString);
      const lengthSum = length + pipeLength;

      if (lengthSum > targetLength) return;
      possibleResult[lengthSum] = Math.max(possibleResult[lengthSum] ?? -Infinity, Math.min(capacity, pipeCapacity));
    })

    if (pipeLength > targetLength) break;

    if (possibleResult[pipeLength]) {
      possibleResult[pipeLength] = Math.max(possibleResult[pipeLength], pipeCapacity);
    } else {
      possibleResult[pipeLength] = pipeCapacity;
    }
  }

  return possibleResult[targetLength];
}

console.log(solution(targetLength, pipes))