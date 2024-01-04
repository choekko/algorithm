const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const solution = (input) => {
  const result = [];

  const isRepeatArray = (arr) => {
    let isNot = false;

    arr.sort((a, b) => {
      if (a !== b) {
        isNot = true;
      }
      return 0;
    })


    return !isNot;
  }


  const getBingo = (matrix) => {
    let bingo = { x: [], o: [] }

    const updateBingo = (line, type) => {
      if (isRepeatArray(line)) {
        if (line[0] === 'X') {
          bingo.x.push(type);
          return;
        }
        if (line[0] === 'O') {
          bingo.o.push(type);
          return;
        }
      }
    }

    for (let row = 0; row < 3; row++) {
      const values = [];
      for (let col = 0; col < 3; col++) {
        values.push(matrix[row][col]);
      }

      updateBingo(values, 'ROW');
    }

    for (let col = 0; col < 3; col++) {
      const values = [];
      for (let row = 0; row < 3; row++) {
        values.push(matrix[row][col]);
      }

      updateBingo(values, 'COL');
    }

    let values = [];

    for (let i = 0; i < 3; i++) {
      values.push(matrix[i][i]);
    }

    updateBingo(values, 'CROSS');

    values = [];

    for (let i = 0; i < 3; i++) {
      values.push(matrix[2 - i][i]);
    }

    updateBingo(values, 'CROSS');

    return bingo;
  }

  input.forEach(testCase => {
    if (testCase === 'end') return;

    const matrix = [];
    const testCaseAsArray = [...testCase];
    let xCount = 0;
    let oCount = 0;


    testCaseAsArray.forEach(value => {
      if (value === 'X') {
        xCount++;
      }
      if (value === 'O') {
        oCount++;
      }
    })

    const allCount = xCount + oCount;

    if (allCount % 2 && (xCount !== oCount + 1)) {
      result.push('invalid');
      return;
    }

    if (!(allCount % 2) && (xCount !== oCount)) {
      result.push('invalid');
      return;
    }


    [[0, 3], [3, 6], [6, 9]].forEach(([start, end]) => {
      matrix.push(testCaseAsArray.slice(start, end));
    })

    const bingo = getBingo(matrix);
    
    if ((bingo.o.length === 1 && bingo.x.length === 0 && !(allCount % 2))
      || (bingo.o.length === 0 && bingo.x.length === 1)
      || (bingo.o.length === 2 && bingo.x.length === 0 && !isRepeatArray(bingo.o))
      || (bingo.o.length === 2 && bingo.x.length === 0 && isRepeatArray(bingo.o) && bingo.o[0] === 'CROSS')
      || (bingo.o.length === 0 && bingo.x.length === 2 && !isRepeatArray(bingo.x))
      || (bingo.o.length === 0 && bingo.x.length === 2 && isRepeatArray(bingo.x) && bingo.x[0] === 'CROSS')
      || (bingo.o.length === 0 && bingo.x.length === 0 && allCount === 9)
    ) {
      result.push('valid');
      return;
    }

    result.push('invalid');
  })

  return result.join('\n');
}

console.log(solution(input));