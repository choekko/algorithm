const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [cuttingCountsLength, possiblePositionsLength, cakeLength] = input[0].split(' ').map(Number);

const possiblePositions = input.slice(1, 1 + possiblePositionsLength).map(Number);
const cuttingCounts = input.slice(1 + possiblePositionsLength, 1+ possiblePositionsLength + cuttingCountsLength).map(Number);


const solution = (cakeLength, possiblePositions, cuttingCounts) => {
  possiblePositions.push(cakeLength);
  const getMaxMinValue = (cuttingCount) => {

    const binarySearch = (left, right, maxMinValue) => {
      // let left = 0;
      // let right = cakeLength;

      while (left <= right) {
        const center = Math.floor((left + right) / 2);

        let count = 0;
        let prevPosition = 0;
        let flag = false;
        let distance = 0;
        for (const position of possiblePositions) {
          distance = position - prevPosition;

          if (distance < center) {
            continue;
          }
          if (distance === center) {
            flag = true;
          }
          prevPosition = position;
          count++
        }
        if (prevPosition === possiblePositions[possiblePositions.length - 1]) {
          count--
        }

        if (count <= cuttingCount && distance < center) {
          flag = false;
        }

        if (count > cuttingCount) {
          left = center + 1;
          if (flag) {
            maxMinValue = Math.max(maxMinValue, center);
          }
          continue;
        }
        if (count === cuttingCount) {
          if (flag) {
            left = center + 1;
            maxMinValue = Math.max(maxMinValue, center);
            continue;
          }
          const prevMaxMinValue = maxMinValue;
          const biggerSearch = binarySearch(center + 1, right, maxMinValue);
          return Math.max(biggerSearch, biggerSearch === prevMaxMinValue ? binarySearch(left, center - 1, maxMinValue) : -Infinity);
        }
        if (count < cuttingCount) {
          right = center - 1
        }
      }
      return maxMinValue;
    }


    return binarySearch(0, cakeLength, -Infinity)
  }

  return cuttingCounts.map(getMaxMinValue).join('\n');
}

console.log(solution(cakeLength, possiblePositions, cuttingCounts));




// 작은 조각길이 최대값
// 15
// 10