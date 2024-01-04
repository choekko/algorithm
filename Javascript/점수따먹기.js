// 초기 코드 -> 시간 초과

// const fs = require('fs');
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// const input = fs.readFileSync(filePath).toString().trim().split('\n');
// const [rowSize, colSize] = input[0].split(' ').map(Number);
// const matrix = []
//
// for (let i = 1; i <= rowSize; i++) {
//   matrix.push(input[i].split(' ').map(Number));
// }
//
// const solution = (matrix, rowSize, colSize) => {
//   const prefixSumMatrix = Array(rowSize).fill(0).map(() => Array(colSize).fill(0));
//
//   for (let row = 0; row < rowSize; row++) {
//     for (let col = 0; col < colSize; col++) {
//       prefixSumMatrix[row][col] = (prefixSumMatrix[row - 1]?.[col] ?? 0) + (prefixSumMatrix[row][col - 1] ?? 0) + matrix[row][col] - (prefixSumMatrix[row - 1]?.[col - 1] ?? 0);
//     }
//   }
//
//   const getSubMatrixSum = ({ rowStart, colStart, rowEnd, colEnd }) => {
//     return prefixSumMatrix[rowEnd][colEnd] - (prefixSumMatrix[rowStart - 1]?.[colEnd] ?? 0) - (prefixSumMatrix[rowEnd][colStart - 1] ?? 0) + (prefixSumMatrix[rowStart - 1]?.[colStart - 1] ?? 0);
//   }
//
//   let result = -Infinity;
//
//   for (let rowStart = 0; rowStart < rowSize; rowStart++) {
//     for (let rowEnd = rowStart + 1; rowEnd < rowSize; rowEnd++) {
//       for (let colStart = 0; colStart < colSize; colStart++) {
//         for (let colEnd = colStart + 1; colEnd < colSize; colEnd++) {
//           result = Math.max(result, getSubMatrixSum({ rowStart, colStart, rowEnd, colEnd }));
//         }
//       }
//     }
//   }
//
//   return result;
// }
//
// console.log(solution(matrix, rowSize, colSize));



// 초기 코드에서 옵셔널과 널 병합 연산자를 사용하지 않도록 수정된 코드 -> 시간초과 나지 않음
const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = [Array(colSize + 1).fill(0)];

for (let i = 1; i <= rowSize; i++) {
  matrix.push([0, ...input[i].split(' ').map(Number)]);
}

const solution = (matrix, rowSize, colSize) => {
  const prefixSumMatrix = Array(rowSize + 1).fill(0).map(() => Array(colSize + 1).fill(0));

  for (let row = 1; row <= rowSize; row++) {
    for (let col = 1; col <= colSize; col++) {
      prefixSumMatrix[row][col] = prefixSumMatrix[row - 1][col] + prefixSumMatrix[row][col - 1] + matrix[row][col] - prefixSumMatrix[row - 1][col - 1];
    }
  }

  const getSubMatrixSum = ({ rowStart, colStart, rowEnd, colEnd }) => {
    return prefixSumMatrix[rowEnd][colEnd] - prefixSumMatrix[rowStart - 1][colEnd] - prefixSumMatrix[rowEnd][colStart - 1] + prefixSumMatrix[rowStart - 1][colStart - 1];
  }

  let result = -Infinity;

  for (let rowStart = 1; rowStart <= rowSize; rowStart++) {
    for (let rowEnd = rowStart; rowEnd <= rowSize; rowEnd++) {
      for (let colStart = 1; colStart <= colSize; colStart++) {
        for (let colEnd = colStart; colEnd <= colSize; colEnd++) {
          result = Math.max(result, getSubMatrixSum({ rowStart, colStart, rowEnd, colEnd }));
        }
      }
    }
  }

  return result;
}

console.log(solution(matrix, rowSize, colSize));