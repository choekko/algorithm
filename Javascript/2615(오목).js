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

