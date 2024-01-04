const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const teamNumber = Number(input[0].split(' ')[1]);
const heights = input[1].split(' ').map(Number);

const solution = (teamNumber, heights) => {
  const differences = [];

  let allCost = 0;
  for (let i = 1; i < heights.length; i++) {
    const difference = heights[i] - heights[i - 1];
    differences.push(difference);
    allCost += difference;
  }
  const excludedDifferences = differences.sort((a, b) => a - b).slice(differences.length - (teamNumber - 1), differences.length);

  return allCost - excludedDifferences.reduce((acc, curr) => acc + curr, 0);
}

console.log(solution(teamNumber, heights))
