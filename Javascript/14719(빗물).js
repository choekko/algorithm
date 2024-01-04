const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [ceilHeight] = input[0].split(' ').map(Number);
const heights = input[1].split(' ').map(Number);

const solution = (ceilHeight, heights) => {
  let standingWater = 0;

  for (let level = 1; level <= ceilHeight; level++) {
    const types = [];
    for (const height of heights) {
      const offset = level - height;
      if (offset > 0) {
        if (!types.length || types.at(-1) === 'WALL') {
          types.push(1);
        } else {
          types[types.length - 1] += 1;
        }
      } else {
        if (types.at(-1) !== 'WALL') {
          types.push('WALL');
        }
      }
    }

    standingWater += types.reduce((acc, curr, idx) => {
      if (typeof curr === 'number' && types[idx - 1] === 'WALL' && types[idx + 1] === 'WALL') {
        return acc + curr;
      }
      return acc;
    }, 0)
  }

  return standingWater;
}

console.log(solution(ceilHeight, heights))


// 5