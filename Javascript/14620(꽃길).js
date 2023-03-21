let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');

const size = input.shift();
const costMatrix = input.map(line => line.split(' ').map(Number));

const dRow = [-1, 0, 1, 0]; // 북동남서
const dCol = [0, 1, 0, -1];

const combination = (numbers, r) => {
  let result = [];

  if (r < 1) return [];
  if (r === 1) return numbers.map(number => [number]);


  for (let idx = 0 ; idx < numbers.length ; idx++) {
    const candidates = combination(numbers.slice(idx + 1), r - 1);
    result = result.concat(candidates.map(candidate => [numbers[idx], ...candidate]));
  }
  return result;
}

const calculateCost = (row, col, costMatrix) => {
  let cost = costMatrix[row][col];
  for (let i = 0; i < 4 ; i++) {
    if (costMatrix[row + dRow[i]]?.[col + dCol[i]] === undefined) {
      return null;
    }
    cost += costMatrix[row + dRow[i]][col + dCol[i]];
  }
  return cost;
}


const isIntersected = (path, size) => {
  const dRow = [-1, -1, 1, 1, 0, 0, 1, -1, 0, 0, 2, -2]
  const dCol = [-1, 1, -1, 1, 1, -1, 0, 0, 2, -2, 0, 0]

  for (let i = 0 ; i < path.length ; i++) {
    const rowI = Math.floor(path[i] / size);
    const colI = path[i] % size;

    for (let j = i + 1 ; j < path.length; j++) {
      const rowJ = Math.floor(path[j] / size);
      const colJ = path[j] % size;

      for (let d = 0; d < dRow.length ; d++) {
        if (JSON.stringify([rowI + dRow[d], colI + dCol[d]]) === JSON.stringify([rowJ, colJ])) {
          return true;
        }
      }
    }
  }

  return false;
}

const solution = (size, costMatrix) => {
  const paths = combination([...Array(size * size).keys()], 3).filter(path => !isIntersected(path, size));
  let minCost = Infinity;

  loop: for (const path of paths) {
    let cost = 0;

    for (const position of path) {
      const row = Math.floor(position / size);
      const col = position % size;

      const costPerPosition = calculateCost(row, col, costMatrix);

      if (costPerPosition === null) continue loop;
      cost += costPerPosition;
    }
    minCost = Math.min(minCost, cost);
  }

  return minCost;
}


console.log(solution(size, costMatrix))
// console.log(combination([1, 2, 3, 4], 3))