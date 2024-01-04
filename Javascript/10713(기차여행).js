const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [cityCount, dateCount] = input[0].split(' ').map(Number);
const positions = input[1].split(' ').map(Number);
const trails = input.slice(2).map(line => {
  const [baseCost, icCost, icDefaultCost] = line.split(' ').map(Number);
  return { baseCost, icCost, icDefaultCost };
})

const solution = (positions, trails, cityCount) => {
  const links = [];

  for (let i = 0; i < cityCount - 1; i++) {
    if (positions[i] > positions[i + 1]) {
      links.push([positions[i + 1], positions[i] - 1]);
      continue;
    }
    if (positions[i] < positions[i + 1]) {
      links.push([positions[i], positions[i + 1] - 1]);
    }
  }

  links.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0]
  });

  const visitCounts = Array.from({ length: cityCount + 1 }, () => 0) // 0 패딩 있음
  trails.unshift(null) // 0 패딩

  for (const [start, end] of links) {
    visitCounts[start]++;
    if (visitCounts[end + 1] !== undefined) {
      visitCounts[end + 1]--;
    }
  }

  let currentCount = 0;
  for (let i = 1; i <= cityCount; i++) {
    visitCounts[i] += currentCount;
    currentCount = visitCounts[i];
  }

  let resultCost = 0;

  for (let i = 1; i < cityCount; i++) {
    const visitCount = visitCounts[i];
    const { baseCost, icCost, icDefaultCost } = trails[i];
    const minCost = Math.min(baseCost * visitCount, icCost * visitCount + icDefaultCost);
    resultCost += minCost;
  }

  return resultCost;
}

console.log(solution(positions, trails, cityCount))