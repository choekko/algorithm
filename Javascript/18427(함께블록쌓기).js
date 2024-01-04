const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, __, target] = input[0].split(' ').map(Number);
const blocksPerStudent = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (blocksPerStudent, target) => {
  blocksPerStudent.forEach(blocks => {
    blocks.sort();
  })
  const d = Array.from({ length: target + 1 }, () => 0);
  d[0] = 1

  for (const blocks of blocksPerStudent) {
    const _d = [...d];

    for (const block of blocks) {
      for (let height = 0; height < d.length; height++) {
        const count = _d[height];
        if (d[height + block] !== undefined) {
          d[height + block] += count;
          d[height + block] %= 10007;
        }
      }
    }
  }

  return d[target];
}

console.log(solution(blocksPerStudent, target));