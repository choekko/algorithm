const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const positions = input.slice(1).map(line => line.split(' ').map(Number));

const solution = (positions) => {
  let result = 0;

  const getDistance = ([x1, y1], [x2, y2]) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  for (let i = 0; i < positions.length; i++) {
    const orthogonalPosition = positions[i];
    const unitVectorsMap = {} // 단위벡터: 개수
    for (let j = 0; j < positions.length; j++) {
      if (j === i) continue;
      const [x, y] = positions[j]
      const unitVector = [x - orthogonalPosition[0], y - orthogonalPosition[1]].map(value => value / getDistance(orthogonalPosition, positions[j]));
      if (unitVectorsMap[unitVector]) {
        unitVectorsMap[unitVector] += 1;
      } else {
        unitVectorsMap[unitVector] = 1;
      }
    }

    for (const [unitVectorString, count] of Object.entries(unitVectorsMap)) {
      const [unitX, unitY] = unitVectorString.split(',').map(Number);
      const orthogonalUnitVector = [-unitY, unitX];
      if (unitVectorsMap[orthogonalUnitVector]) {
        result += unitVectorsMap[orthogonalUnitVector] * count;
      }
    }
  }

  return result;
}

console.log(solution(positions));
