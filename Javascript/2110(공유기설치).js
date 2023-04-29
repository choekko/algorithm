const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const routerCount = Number(input[0].split(' ')[1]);
const housePositions = input.slice(1).map(Number);

const solution = (housePositions, routerCount) => {
  housePositions.sort((a, b) => a - b);

  let lowerDistance = 1;
  let upperDistance = Math.ceil((housePositions[housePositions.length - 1] - housePositions[0]) / (routerCount - 1));
  let result = 0;

  while (lowerDistance <= upperDistance) {
    const middleDistance = Math.floor((lowerDistance + upperDistance) / 2);

    let prevHousePosition = housePositions[0];
    let installedRouterCount = 1;

    for (let i = 1; i < housePositions.length; i++) {
      if (housePositions[i] - prevHousePosition >= middleDistance) {
        installedRouterCount++;
        prevHousePosition = housePositions[i];
      }
    }

    if (installedRouterCount >= routerCount) {
      result = middleDistance;
      lowerDistance = middleDistance + 1;
    } else {
      upperDistance = middleDistance - 1;
    }
  }

  return result;
}

console.log(solution(housePositions, routerCount));