// 다시 풀기
// let fs = require('fs');
// let input = fs.readFileSync('./input.txt').toString().split('\n');

// const ROW_NUM = input.length;
// const COL_NUM = input[0].split(' ').length;

// const inputMatrix = input.map(col => col.split(' '));
// const matrixForCheck = Array.from({length: ROW_NUM}).fill(0).map(() => Array.from({length: COL_NUM}).map(() => false));

// const waitingQueue = [];

// const drow = [0, 0, 1, -1, 1, 1, -1, -1]
// const dcol = [1, -1, 0, 0, 1, -1, 1, -1]
// const curcuitBase = Array.from({length: drow.length});

// const search = (row, col, linkedStack, blackOrWhite, prevDrow = 0, prevDcol = 1, startPosition) => {
//   curcuitBase.forEach((_, idx) => {
//     const nextPositionRow = row + drow[idx];
//     const nextPositionCol = col + dcol[idx];
//     if (nextPositionRow >= 0 && nextPositionRow < ROW_NUM 
//       && nextPositionCol >= 0 && nextPositionCol < COL_NUM && !matrixForCheck[nextPositionRow][nextPositionCol]) {
//         const isContinuous = drow[idx] === prevDrow && dcol[idx] === prevDcol

//         const nextLinkedStack = (isContinuous || linkedStack === 1) ? linkedStack + 1 : 1;
//         if (isContinuous || inputMatrix[nextPositionRow][nextPositionCol] === blackOrWhite) {
//           waitingQueue.push([nextPositionRow, nextPositionCol,  nextLinkedStack, blackOrWhite, drow[idx], dcol[idx], nextLinkedStack === 2 ? [row, col] : startPosition]);
//         }
//     }
//   })
// }

// const eureka = inputMatrix.some((line, startRow) => {
//   let flag = 0;
//   line.some((blackOrWhite, startCol) => {
//     if (blackOrWhite === '0' || matrixForCheck[startRow][startCol]) return false;
//     matrixForCheck[startRow][startCol] = true;
//     waitingQueue.push([startRow, startCol, 1, blackOrWhite, 0, 1, [startRow, startCol]]);

//     while (waitingQueue.length) {
//       const [row, col, linkedStack, blackOrWhite, prevDrow, prevDcol, startPosition] = waitingQueue.pop();
//       if (linkedStack === 5) {
//         console.log(blackOrWhite);
//         console.log(`${startPosition[0] + 1} ${startPosition[1] + 1}`);
//         flag = 1;
//         return true
//       }
//       matrixForCheck[row][col] = true;
//       search(row, col, linkedStack, blackOrWhite, prevDrow, prevDcol, startPosition);
//       console.log(row, col, waitingQueue);
//     }

//   })
//   if (flag === 1) {
//     return true
//   }
//  })

//  if (!eureka) console.log(0);


const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const matrix = input.map(line => line.split(' '));


const solution = (matrix) => {
  const dRow = [-1, 0, 1, 1] // 북동, 동, 남동, 남
  const dCol = [1, 1, 1, 0]
  const MATRIX_MAX_ROW = matrix.length - 1;
  const MATRIX_MAX_COL = matrix[0].length - 1;
  const checkingMatrix = Array(MATRIX_MAX_ROW + 1).fill(null).map(() =>
    Array(MATRIX_MAX_COL + 1).fill(false)
  )

  const matchStatus = {
    black: null,
    white: null
  }; // 오목이 달성되었을 경우 맨 왼쪽 최상단 위치를 넣는다.

  const checkIsOverflow = (row, col) => {
    return row > MATRIX_MAX_ROW || row < 0 || col > MATRIX_MAX_COL || col < 0;
  }

  const checkIsSameStone = (row, col, stoneType) => {
    return matrix[row][col] === stoneType;
  }

  const isStartPosition = (row, col, dirIdx) => {
    const backRow = row + dRow[dirIdx] * -1;
    const backCol = col + dCol[dirIdx] * -1;

    if (checkIsOverflow(backRow, backCol)) return true;

    const backStoneType = matrix[backRow][backCol];

    return !checkIsSameStone(row, col, backStoneType);
  }


  const stack = [];

  const checkMatchStatus = () => {
    while (stack.length) {
      const { row, col, dirIdx, count, startPosition } = stack.pop();
      const currentStoneType = matrix[row][col];
      const nextRow = row + dRow[dirIdx];
      const nextCol = col + dCol[dirIdx];

      const isNextStoneNotContinuous = checkIsOverflow(nextRow, nextCol) || !checkIsSameStone(nextRow, nextCol, currentStoneType);
      if ((isNextStoneNotContinuous || !checkIsSameStone(nextRow, nextCol, currentStoneType)) && count === 5) {
        if (currentStoneType === '1') {
          matchStatus.black = startPosition;
          return;
        } else {
          matchStatus.white = startPosition;
          continue;
        }
      }

      if (!isNextStoneNotContinuous && count < 5) {
        stack.push({ row: nextRow, col: nextCol, dirIdx, count: count + 1, startPosition });
      }
    }
  }

  for (let row = 0; row <= MATRIX_MAX_ROW; row++) {
    for (let col = 0; col <= MATRIX_MAX_COL; col++) {
      if (matrix[row][col] !== '0') {
        for (let dirIdx = 0; dirIdx < dRow.length; dirIdx++) {
          if (isStartPosition(row, col, dirIdx)) {
            stack.push({ row, col, dirIdx, count: 1, startPosition: [row, col] });
            checkMatchStatus();
            if (matchStatus.black) {
              console.log('1');
              console.log(matchStatus.black.map(value => value + 1).join(' ')); // 1부터 시작하는 번호로 출력해야하므로 기록해둔 position에 1씩 더한다
              return;
            }
          }
        }
      }
    }
  }

  if (matchStatus.white) {
    console.log('2');
    console.log(matchStatus.white.map(value => value + 1).join(' ')); // 1부터 시작하는 번호로 출력해야하므로 기록해둔 position에 1씩 더한다
    return ;
  }

  console.log('0');
}

solution(matrix);


