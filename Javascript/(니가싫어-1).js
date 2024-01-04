const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const mosquitoCount = Number(input[0]);
const times = [];

for (let i = 1; i < 1 + mosquitoCount; i++) {
  const [entry, exit] = input[i].split(' ').map(Number);
  times.push({ entry, exit });
}

const solution = (times) => {
  const offsetMap = {};

  times.forEach(({ entry, exit }) => {
    if (offsetMap[entry]) {
      offsetMap[entry] += 1;
    } else {
      offsetMap[entry] = 1;
    }

    if (offsetMap[exit]) {
      offsetMap[exit] -= 1;
    } else {
      offsetMap[exit] = -1;
    }
  })

  const sortedOffsetMapEntries = Object.entries(offsetMap)
    .sort((a, b) => Number(a[0]) - Number(b[0]))

  let currentCount = 0;
  let currentSequence = { start: 0, end: 0, length: 0 };

  const result = { maxCount: currentCount, maxLengthSequence: { ...currentSequence } };

  const updateResult = () => {
    if (currentCount >= result.maxCount) {
      result.maxCount = currentCount;
      result.maxLengthSequence = [currentSequence, result.maxLengthSequence].sort((a, b) => a.length - b.length)[1];
    }
  }

  sortedOffsetMapEntries.forEach(([timeString, offset]) => {
    if (!offset) return;

    const time = Number(timeString);

    currentSequence.end = time;
    currentSequence.length = currentSequence.end - currentSequence.start;

    updateResult();

    currentCount += offset;
    currentSequence = { start: time, end: time };
  })

  updateResult();

  return [result.maxCount, [result.maxLengthSequence.start, result.maxLengthSequence.end].join(' ')].join('\n');

}

console.log(solution(times));