const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = [];

for (let i = 1; i <= rowSize; i++) {
  const line = input[i].split(' ').map(Number);
  matrix.push(line);
}

const solution = (matrix, rowSize, colSize) => {
  const S = [
    {
      dRows: [0, -1, -1],
      dCols: [1, 1, 2],
    },
    {
      dRows: [1, 1, 2],
      dCols: [0, 1, 1],
    }
  ];
  const Z = [
    {
      dRows: [0, 1, 1],
      dCols: [1, 1, 2],
    },
    {
      dRows: [1, 1, 2],
      dCols: [0, -1, -1],
    }
  ];
  const J = [
    {
      dRows: [0, -1, -2],
      dCols: [1, 1, 1],
    },
    {
      dRows: [1, 1, 1],
      dCols: [0, 1, 2],
    },
    {
      dRows: [0, 1, 2],
      dCols: [-1, -1, -1],
    },
    {
      dRows: [0, 0, 1],
      dCols: [1, 2, 2],
    }
  ];
  const L = [
    {
      dRows: [1, 2, 2],
      dCols: [0, 0, 1],
    },
    {
      dRows: [-1, -1, -1],
      dCols: [0, 1, 2],
    },
    {
      dRows: [0, 1, 2],
      dCols: [1, 1, 1],
    },
    {
      dRows: [0, 0, -1],
      dCols: [1, 2, 2],
    }
  ];
  const O = [
    {
      dRows: [0, 1, 1],
      dCols: [1, 0, 1],
    },
  ];
  const I = [
    {
      dRows: [1, 2, 3],
      dCols: [0, 0, 0],
    },
    {
      dRows: [0, 0, 0],
      dCols: [1, 2, 3],
    }
  ];
  const T = [
    {
      dRows: [0, 0, 1],
      dCols: [1, 2, 1],
    },
    {
      dRows: [1, 1, 2],
      dCols: [0, -1, 0],
    },
    {
      dRows: [0, -1, 0],
      dCols: [1, 1, 2],
    },
    {
      dRows: [1, 1, 2],
      dCols: [0, 1, 0],
    }
  ];

  const CHECK_LIST = [S, Z, J, L, O, I, T];

  let result = -Infinity;

  const check = (row, col) => {
    CHECK_LIST.forEach(types => {
      types.forEach(({ dRows, dCols }) => {
        let sum = matrix[row][col];
        for (let i = 0; i < dRows.length; i++) {
          const nextRow = row + dRows[i];
          const nextCol = col + dCols[i];

          if (nextRow < 0 || nextRow >= rowSize || nextCol < 0 || nextCol >= colSize) return;
          sum += matrix[nextRow][nextCol];
        }
        result = Math.max(result, sum);
      })
    })
  }

  for (let row = 0; row < rowSize; row++) {
    for (let col = 0; col < colSize; col++) {
      check(row, col);
    }
  }

  return result;
}

console.log(solution(matrix, rowSize, colSize))
