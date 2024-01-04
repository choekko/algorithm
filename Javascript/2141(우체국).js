const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const houseCount = Number(input[0]);
const houses = [];

for (let i = 1; i <= houseCount; i++) {
  const [housePosition, peopleCount] = input[i].trim().split(' ').map(Number);
  houses.push({ housePosition, peopleCount });
}

const solution = (houseCount, houses) => {
  houses.sort((a, b) => a.housePosition - b.housePosition)
  const peoplePrefixSum = Array.from({length: houseCount}, () => 0n);
  peoplePrefixSum[0] = BigInt(houses[0].peopleCount);
  let minLengthSumInfo = {
    sum: 0n,
    position: houses[0].housePosition,
  }

  for (let i = 1; i < houseCount; i++) {
    // 누적합 배열 만들기
    peoplePrefixSum[i] = peoplePrefixSum[i - 1] + BigInt(houses[i].peopleCount);
    
    // 우체국이 houses[0]에 있을 때 거리 합 구하기
    minLengthSumInfo.sum +=  BigInt((houses[i].housePosition - houses[0].housePosition) * houses[i].peopleCount);
  }

  for (let i = 1; i < houseCount; i++) {
    const { housePosition } = houses[i];
    const offset = BigInt(housePosition - houses[i - 1].housePosition);

    const lengthSumPlusOffset = peoplePrefixSum[i - 1] * offset;
    const lengthSumMinusOffset =  (peoplePrefixSum[houseCount - 1] - peoplePrefixSum[i - 1]) * offset;

    const lengthSum = minLengthSumInfo.sum + lengthSumPlusOffset - lengthSumMinusOffset;
    if (minLengthSumInfo.sum > lengthSum) {
      minLengthSumInfo = {
        sum: lengthSum,
        position: housePosition
      }
    }
  }

  return minLengthSumInfo.position;
}

console.log(solution(houseCount, houses));

