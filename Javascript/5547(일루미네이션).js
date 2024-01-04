const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [width, height] = input[0].split(' ').map(Number);
const matrix = [];

for (let i = 1; i <= height; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

const solution = (matrix, width, height) => {
  matrix.forEach(line => {
    line.unshift(0) ;
    line.push(0);
  });
  matrix.unshift(Array.from({ length: width + 2 }, () => 0));
  matrix.push(Array.from({ length: width + 2 }, () => 0));

  const dRowsForOddRow = [1, 1, 0, -1, -1, 0]; // 남서쪽부터 반시계
  const dColsForOddRow = [0, 1, 1, 1, 0, -1];
  const dRowsForEvenRow = [1, 1, 0, -1, -1, 0]
  const dColsForEvenRow = [-1, 0, 1, 0, -1, -1]

  const getWallCount = ({ row, col }) => {
    let count = 0;

    const dRows = row % 2 ? dRowsForOddRow : dRowsForEvenRow;
    const dCols = row % 2 ? dColsForOddRow : dColsForEvenRow;

    for (let i = 0; i < 6; i++) {
      const nextRow = row + dRows[i];
      const nextCol = col + dCols[i];

      if (matrix[nextRow]?.[nextCol]) {
        count++;
      }
    }

    if (count === 6) {
      count = 0; // 둘러싸여졌으므로
    }

    return count;
  }

  let result = 0;
  for (let row = 0; row < height + 2; row++) {
    for (let col = 0; col < width + 2; col++) {
      if (matrix[row][col]) {
        continue;
      }
      result += getWallCount({ row, col })
    }
  }

  return result;
}

console.log(solution(matrix, width, height))

// const solution = (matrix, width, height) => {
//   const checkingMatrix = Array.from({ length: height }, () => Array.from({ length: width }, () => false));
//   const dRowsForLooking = [1, 1, 0, -1, -1, 0]; // 남서쪽부터 반시계
//   const dColsForLooking = [0, 1, 1, 1, 0, -1];
//   const dRowsForChecking = dRowsForLooking.slice(0, 3);
//   const dCOlsForChecking = dColsForLooking.slice(0, 3);
//
//   const getWallCount = ({ row, col }) => {
//     let count = 6;
//
//     for (let i = 0; i < dColsForLooking.length; i++) {
//       const nextRow = row + dRowsForLooking[i];
//       const nextCol = col + dColsForLooking[i];
//
//       if (matrix[nextRow]?.[nextCol]) {
//         count--;
//       }
//     }
//
//     return count;
//   }
//
//   const dfs = ({ startRow, startCol }) => {
//     const queue = [{ row: startRow, col: startCol }];
//     let count = 0;
//     while (queue.length) {
//       const { row, col } = queue.pop();
//       count += getWallCount({ row, col });
//
//       for (let i = 0; i < dRowsForChecking.length; i++) {
//         const nextRow = row + dRowsForChecking[i];
//         const nextCol = col + dCOlsForChecking[i];
//
//         if (nextRow < 0 || nextRow >= height || nextCol < 0 || nextCol >= width || checkingMatrix[nextRow][nextCol]) {
//           continue;
//         }
//
//         checkingMatrix[nextRow][nextCol] = true;
//         queue.unshift({ row: nextRow, col: nextCol });
//       }
//     }
//
//     return count;
//   }
//
//   let result = 0;
//   for (let row = 0; row < height; row++) {
//     for (let col = 0; col < width; col++) {
//       if (!matrix[row][col] || checkingMatrix[row][col]) {
//         continue;
//       }
//       result += dfs({ startRow: row, startCol: col })
//     }
//   }
//
//   return result;
// }

