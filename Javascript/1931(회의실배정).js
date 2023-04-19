const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const times = input.slice(1).map(line => line.split(' ').map(Number).reduce((acc, curr, idx) => {
  acc[idx === 0 ? 'start' : 'end'] = curr;
  return acc;
}, {}));

const solution = (times) => {
  const sortedTimes = [...times].sort((a, b) => {
    if (a.end === b.end) {
      return a.start - b.start;
    }
    return a.end - b.end;
  })

  let prevEnd = 0;
  let count = 0;

  for (let i = 0; i < times.length; i++) {
    const { start, end } = sortedTimes[i];

    if (prevEnd <= end && prevEnd <= start) {
      prevEnd = end;
      count += 1;
      continue;
    }
  }

  return count;
}

console.log(solution(times))
