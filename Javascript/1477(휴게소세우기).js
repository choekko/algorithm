const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, countToAdd, maxPosition] = input[0].split(' ').map(Number);
const positions = input[1]?.split(' ').map(Number) ?? []; // 지어진 휴게소가 없을 수도 있음에 유의

const solution = (countToAdd, maxPosition, positions) => {
  const sortedPositions = [0, ...positions.sort((a, b) => a - b), maxPosition];
  const intermediateInfos = [];

  let intermediateInfosIdxWhichHasMaxDistance = 0;

  const updateIntermediateInfosIdxWhichHasMaxDistance = () => {
    let maxDistance = -Infinity;

    intermediateInfos.forEach(({ currentMaxDistance }, idx) => {
      if (currentMaxDistance > maxDistance) {
        intermediateInfosIdxWhichHasMaxDistance = idx;
        maxDistance = currentMaxDistance;
      }
    })
  }

  for (let i = 0; i < sortedPositions.length - 1; i++) {
    const distance = sortedPositions[i + 1] - sortedPositions[i];
    intermediateInfos.push({ distance, currentMaxDistance: distance, dividedCount: 1 });
  }

  updateIntermediateInfosIdxWhichHasMaxDistance();

  while (countToAdd) {
    const target = intermediateInfos[intermediateInfosIdxWhichHasMaxDistance];
    target.currentMaxDistance = Math.ceil(target.distance / (target.dividedCount + 1));
    target.dividedCount++;
    updateIntermediateInfosIdxWhichHasMaxDistance();
    countToAdd--;
  }

  return intermediateInfos[intermediateInfosIdxWhichHasMaxDistance].currentMaxDistance;
}

console.log(solution(countToAdd, maxPosition, positions));
