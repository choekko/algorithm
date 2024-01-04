const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [size, maxHealth, maxDurability] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map(line => [...line]);

const solution = (matrix, size, maxHealth, maxDurability) => {
  const maxPossibilityMatrix = Array.from({ length: size }, () => Array.from({ length: size }, () => 0 ));
  const dRows = [-1, 0, 1, 0];
  const dCols = [0, 1, 0, -1];
  let minCost = Infinity;

  const queue = [{ row: 0, col: 0, health: maxHealth + 1, durability: 0, cost: 0}];

  const bfs = ({ row, col, health, durability, cost }) => {
    const current = matrix[row][col];

    if (current === 'E') {
      minCost = Math.min(minCost, cost);
      return;
    }

    if (current === 'U') {
      durability = maxDurability;
    }

    if (durability) {
      durability -= 1;
    } else {
      health -= 1;
    }

    if (!health) return;

    const currentPossibility = health + durability;

    if (maxPossibilityMatrix[row][col] < currentPossibility) {
      maxPossibilityMatrix[row][col] = currentPossibility;
    } else {
      return;
    }

    for (let i = 0; i < dCols.length; i++) {
      const nextRow = row + dRows[i];
      const nextCol = col + dCols[i];

      if (0 > nextRow || 0 > nextCol || nextRow >= size || nextCol >= size) continue;

      queue.push({row: nextRow, col: nextCol, health, durability, cost: cost + 1});
    }
  }

  while (queue.length) {
    const current = queue.shift();
    bfs(current);
  }

  return minCost === Infinity ? -1 : minCost;
}

console.log(solution(matrix, size, maxHealth, maxDurability));
