const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, houseCount] = input[0].split(' ').map(Number);
const wellPositions = input[1].split(' ').map(Number);

const solution = (houseCount, wellPositions) => {
  let count = 0;
  let result = 0;
  const wellInfos = wellPositions.reduce((acc, curr) => {
    acc[curr] = {
      isLeftEnded: false,
      isRightEnded: false,
    }
    return acc
  } , {});
  const checker = {}

  for (const wellPosition of wellPositions) {
    checker[wellPosition] = true
  }


  let currentDistance = 1;
  const directions = [-1, 1];

  loop: while (true) {
    const validWellInfos = Object.entries(wellInfos)
    for (const [_position, { isLeftEnded, isRightEnded }] of validWellInfos) {
      const position = Number(_position);
      for (const direction of directions) {
        if (direction === -1 && isLeftEnded) continue;
        if (direction === 1 && isRightEnded) continue;

        const targetPosition = position + direction * currentDistance;

        if (checker[targetPosition]) {
          if (direction === -1) {
            wellInfos[position].isLeftEnded = true;
          } else {
            wellInfos[position].isRightEnded = true;
          }
          if (wellInfos[position].isLeftEnded && wellInfos[position].isRightEnded) {
            delete wellInfos[position];
          }
          continue;
        }

        checker[targetPosition] = true;
        result += currentDistance;
        count++;

        if (count === houseCount) {
          break loop;
        }
      }
    }
    currentDistance++;
  }

  return result;
}

console.log(solution(houseCount, wellPositions))