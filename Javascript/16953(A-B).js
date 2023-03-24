const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [start, target] = input[0].split(' ').map(Number);

const solution = (start, target) => {
  let _target = target;
  let count = 0;
  while (_target >= start) {
    if (_target === start) return count + 1;

    if (!(_target % 2)) {
      _target /= 2;
    } else {
      const unitsValueOfTarget = _target % 10;

      if (unitsValueOfTarget !== 1) return -1;

      _target = Math.floor(_target / 10);
    }
    count++;
  }

  return -1;
}

console.log(solution(start, target));