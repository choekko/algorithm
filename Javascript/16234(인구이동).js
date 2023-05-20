const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [size, minDifference, maxDifference] = input[0].split(' ').map(Number);
const matrix = [];
for (let i = 1; i <= size; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

const solution = (size, minDifference, maxDifference, matrix) => {
  let dayCount = 0;
  const dRow = [-1, 0, 1, 0]; // 북 동 남 서
  const dCol = [0, 1, 0, -1];
  const getNewCheckingArray = () => Array(size).fill(0).map(() => Array(size).fill(false));
  let checkingArray = getNewCheckingArray();

  const lookAround = (row, col) => {
    const currentPopulation = matrix[row][col];
    const unitedCountries = [];
    for (let i = 0; i < dRow.length; i++) {
      const nextRow = row + dRow[i];
      const nextCol = col + dCol[i];

      if (nextRow < 0 || nextRow >= size || nextCol < 0 || nextCol >= size) continue;
      if (checkingArray[nextRow][nextCol]) continue;

      const otherPopulation = matrix[nextRow][nextCol];
      const difference = Math.abs(otherPopulation - currentPopulation);

      if (minDifference <= difference && difference <= maxDifference) {
        checkingArray[nextRow][nextCol] = true;
        unitedCountries.push({ row: nextRow, col: nextCol });
      }
    }

    return unitedCountries;
  }


  const traverse = (row, col) => {
    const unions = [{ row, col }];
    const queue = [{ row, col }];

    while (queue.length) {
      const { row, col } = queue.shift();
      checkingArray[row][col] = true;

      const unitedCountries = lookAround(row, col);
      queue.push(...unitedCountries);
      unions.push(...unitedCountries);
    }
    return unions
  }

  const move = (union) => {
    const sumOfPopulation = union.reduce((acc, { row, col }) => {
      const value = matrix[row][col];
      return acc + value;
    }, 0)

    const dividedValue = Math.floor(sumOfPopulation / union.length);

    union.forEach(({ row, col }) => {
      matrix[row][col] = dividedValue;
    })
  }


  let unions = [];

  while (true) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (checkingArray[row][col]) continue;
        const someUnions = traverse(row, col);

        if (someUnions.length <= 1) continue;
        unions.push(someUnions);
      }
    }

    if (!unions.length) break;

    while (unions.length) {
      const union = unions.pop();
      move(union);
    }
    checkingArray = getNewCheckingArray();
    dayCount++;
  }

  return dayCount;
}


console.log(solution(size, minDifference, maxDifference, matrix));
