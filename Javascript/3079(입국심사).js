const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [tableCount, personCount] = input[0].split(' ').map(Number);
const tableCosts = input.slice(1).map(Number);

const solution = (tableCount, personCount, tableCosts) => {
  const maxTableCost = Math.max(...tableCosts);
  let upperTimeLimit = BigInt(personCount * maxTableCost);
  let lowerTimeLimit = 0n;
  let middleTime;
  let result;

  while (upperTimeLimit >= lowerTimeLimit) {
    middleTime = (upperTimeLimit + lowerTimeLimit) / 2n;

    const possiblePersonCount = tableCosts.reduce((acc, tableCost) => {
      const count = middleTime / BigInt(tableCost);
      return acc + count;
    }, 0n)



    if (possiblePersonCount >= personCount) {
      upperTimeLimit = middleTime - 1n;
      result = middleTime;
      continue;
    }
    if (possiblePersonCount < personCount) {
      lowerTimeLimit = middleTime + 1n;
      continue;
    }
  }
  return result.toString();
}

console.log(solution(tableCount, personCount, tableCosts))
