const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const dragons = input.slice(1).map(line => {
  const [startCol, startRow, direction, generation] = line.split(' ').map(Number);

  return { startRow, startCol, directions: [direction], generation }
})

const solution = (dragons) => {
  const matrix = Array.from({ length: 101 }, () => Array.from({ length: 101 }, () => false));
  const dRows = [0, -1, 0, 1];
  const dCols = [1, 0, -1, 0];
  const goDragon = ({ startRow, startCol, directions, generation }) => {
    let row = startRow;
    let col = startCol;
    matrix[row][col] = true;

    const move = (direction) => {
      const newRow = row + dRows[direction];
      const newCol = col + dCols[direction];
      if (newRow < 0 || newRow > 100 || newCol < 0 || newCol > 100) {
        return false;
      }
      row = newRow;
      col = newCol
      matrix[row][col] = true;
      return true;
    }

    if (!move(directions[0])) return;

    for (let currentGeneration = 1; currentGeneration <= generation; currentGeneration++) {
      const prevDirectionsLength = directions.length;
      for (let i = prevDirectionsLength - 1; i >= 0; i--) {
        const prevDirection = directions[i];
        const newDirection = (prevDirection + 1) % 4

        if (!move(newDirection)) break;

        directions.push(newDirection);
      }
    }
  }

  dragons.forEach(goDragon);
  const getValidSquareCount = (matrix) => {
    let count = 0;
    for (let row = 0; row < 100; row++) {
      for (let col = 0; col < 100; col++) {
        count += Number([[row, col], [row + 1, col], [row, col + 1], [ row + 1, col + 1]].every(([row, col]) => matrix[row][col]));
      }
    }
    return count;
  }

  return getValidSquareCount(matrix);
}

console.log(solution(dragons));