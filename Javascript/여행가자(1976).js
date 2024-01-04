const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const cityCount = Number(input[0].trim());
const matrix = [];
for (let i = 2; i < 2 + cityCount; i++) {
  const line = input[i].trim().split(' ').map(Number);
  matrix.push(line);
}

const path = input[2 + cityCount].trim().split(' ').map(city => Number(city) - 1);

const solution = (matrix, path, cityCount) => {
  for (let middle = 0; middle < cityCount; middle++) {
    for (let start = 0; start < cityCount; start++) {
      for (let end = 0; end < cityCount; end++) {
        if (matrix[start][middle] && matrix[middle][end]) {
          matrix[start][end] = 1;
        }
      }
    }
  }

  let prevCity = path[0];

  for (let i = 1; i < path.length; i++) {
    const nextCity = path[i];
    if (prevCity !== nextCity && !matrix[prevCity][nextCity]) {
      return 'NO';
    }
    prevCity = nextCity;
  }


  return 'YES';
}

console.log(solution(matrix, path, cityCount));