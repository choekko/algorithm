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
  const IMPOSSIBLE_SIZES = [[1, 1], [1, 2], [1, 3], [2, 1], [3, 1]];
  const isImpossible = IMPOSSIBLE_SIZES.some(([_rowSize, _colSize]) => _rowSize === rowSize && _colSize === colSize);

  if (isImpossible) return 0;

  const visitedArray = Array.from({ length: rowSize }, () => Array.from({length: colSize}, () => false));

  const dRowSet = [[-1, 0, 0], [0, 0, 1], [1, 0, 0], [0, 0, -1]]; // 북, 동, 남, 서 부메랑 별 탐색할 위치 계산용
  const dColSet = [[0, 0, 1], [1, 0, 0], [0, 0, -1], [-1, 0, 0]];


  let result = 0;

  const dfs = (row, col, boomerangType, sum) => {
    const dRows = dRowSet[boomerangType];
    const dCols = dColSet[boomerangType];

    let invalidFlag = false;
    for (let i = 0; i < dRows.length; i++) {
      const nearRow = row + dRows[i];
      const nearCol = col + dCols[i];

      if (nearRow < 0 || nearRow >= rowSize || nearCol < 0 || nearCol >= colSize || visitedArray[nearRow][nearCol]) {
        invalidFlag = true;
        break;
      }
    }

    if (!invalidFlag) {
      for (let i = 0; i < dRows.length; i++) {
        const nearRow = row + dRows[i];
        const nearCol = col + dCols[i];

        sum += matrix[nearRow][nearCol] * (i === 1 ? 2 : 1);

        visitedArray[nearRow][nearCol] = true;
      }
    }

    let nextRow = row;
    let nextCol = col;
    let breakFlag = false;

    do {
      if (nextCol !== colSize - 1 || nextRow !== rowSize - 1) {
        if (nextCol === colSize - 1) {
          nextRow++;
          nextCol = 0;
        } else {
          nextCol++;
        }
      } else {
        result = Math.max(result, sum);
        breakFlag = true;
        break;
      }
    } while (visitedArray[nextRow][nextCol])

    if (!breakFlag && !visitedArray[nextRow][nextCol]) {
      [0, 1, 2, 3].forEach(boomerangType => {
        dfs(nextRow, nextCol, boomerangType, sum);
      })
    }

    if (!invalidFlag) {
      for (let i = 0; i < dRows.length; i++) {
        const nearRow = row + dRows[i];
        const nearCol = col + dCols[i];

        visitedArray[nearRow][nearCol] = false;
      }
    }
  }

  [0, 1, 2, 3].forEach(boomerangType => {
    dfs(0, 0, boomerangType, 0);
  })

  return result;
}

console.log(solution(matrix, rowSize, colSize))
