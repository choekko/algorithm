const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [size, treeCount, maxYear] = input[0].split(' ').map(Number);
const supplies = [];
const trees = [];

let i = 1;
for (; i < 1 + size; i++) {
  supplies.push(input[i].split(' ').map(Number));
}


for (let k = 0; k < treeCount; k++) {
  const [row, col, age] = input[i + k].split(' ').map(Number);
  trees.push({ row: row - 1, col: col - 1, age });
}

const solution = (size, supplies, trees, maxYear) => {
  trees.sort((a, b) => b.age - a.age);

  const matrix = Array.from({ length: size }, () => Array.from({ length: size }, () => 5));

  const diedTrees = []

  const spring = () => {
    const newTrees = [];

    while (trees.length) {
      const tree = trees.pop();
      const { row, col, age} = tree;

      if (matrix[row][col] < age) {
        diedTrees.push(tree);
        continue;
      }

      matrix[row][col] -= age;
      newTrees.push({ row, col, age: age + 1});
    }

    trees = newTrees;
    trees.sort((a, b) => b.age - a.age);
  }

  const summer = () => {
    while (diedTrees.length) {
      const { row, col, age } = diedTrees.pop();

      matrix[row][col] += Math.floor(age / 2)
    }
  }

  const fall = () => {
    const prevTrees = [...trees];
    const D_ROWS = [-1, -1, 0, 1, 1, 1, 0, -1] // 북에서부터 시계방향
    const D_COLS = [0, 1, 1, 1, 0, -1, -1, -1]

    for (const { row, col, age } of prevTrees) {

      if (age % 5) continue;

      for (let i = 0; i < D_ROWS.length; i++) {
        const newRow = row + D_ROWS[i];
        const newCol = col + D_COLS[i];

        if (matrix[newRow]?.[newCol] === undefined) continue;
        trees.push({ row: newRow, col: newCol, age: 1});
      }
    }
  }

  const winter = () => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        matrix[row][col] += supplies[row][col];
      }
    }
  }

  let year = 0;

  while (true) {
    if (year === maxYear) return trees.length;

    spring();
    summer();
    fall();
    winter();
    year++;
  }


}

console.log(solution(size, supplies, trees, maxYear))
