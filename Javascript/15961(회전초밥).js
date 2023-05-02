const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, __, continuity, couponNumber] = input[0].split(' ').map(Number);
const dishes = input.slice(1);

const solution = (continuity, couponNumber, dishes) => {
  const currentDishesInfo = {};

  for (let i = 0; i < continuity; i++) {
    const dish = dishes[i];

    if (currentDishesInfo[dish]) {
      currentDishesInfo[dish] += 1;
    } else {
      currentDishesInfo[dish] = 1;
    }
  }

  currentDishesInfo['kindCount'] = Object.keys(currentDishesInfo).length;

  let maxKindCount = currentDishesInfo.kindCount + !currentDishesInfo[couponNumber];
  let left = 0;
  let right = continuity - 1;
  let repeatFlag = 0;

  while (true) {
    if (repeatFlag && right >= continuity - 1) break; // 회전초밥이니까 오른쪽 포인터의 가능한 위치를 잘 생각해야한다.

    const dishToRemove = dishes[left];

    let dishIdxToAdd;
    if (right === dishes.length - 1) {
      repeatFlag = 1;
      dishIdxToAdd = 0;
    } else {
      dishIdxToAdd = right + 1;
    }
    const dishToAdd = dishes[dishIdxToAdd];

    currentDishesInfo[dishToRemove] -= 1;
    if (!currentDishesInfo[dishToRemove]) {
      currentDishesInfo.kindCount -= 1;
    }

    if (currentDishesInfo[dishToAdd]) {
      currentDishesInfo[dishToAdd] += 1;
    } else {
      currentDishesInfo[dishToAdd] = 1;
      currentDishesInfo.kindCount += 1;
    }
    maxKindCount = Math.max(maxKindCount, currentDishesInfo.kindCount + !currentDishesInfo[couponNumber]);

    left += 1;
    right = dishIdxToAdd;
  }

  return maxKindCount;
}

console.log(solution(continuity, couponNumber, dishes))