const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const testCount = Number(input[0]);
const testCases = [];

for (let i = 1;;) {
  if (testCases.length >= testCount) break;

  const [size, degree] = input[i].split(' ').map(Number);
  const matrix = [];
  for (let j = i + 1; j <= i + size; j++) {
    matrix.push(input[j].split(' ').map(Number));
  }
  testCases.push({ matrix, degree });
  i += size + 1;
}

const solution = (testCases) => {
  const dVecRows = [1, 0, 0, -1, -1, 0, 0, 1, 1, 0, 0, -1, -1, 0, 0, 1]; // 수평선 오른쪽 부터 45도 회전 벡터, 360도를 대응하기 위해 한 번 반복된 배열이다.
  const dVecCols = [0, -1, -1, 0, 0, 1, 1, 0, 0, -1, -1, 0, 0, 1, 1, 0];
  const pUnitVecToDVecStartIdx = { // pUnitVec : 위치 단위 벡터
    '0,1': 0,
    '1,1': 1,
    '1,0': 2,
    '1,-1': 3,
    '0,-1': 4,
    '-1,-1': 5,
    '-1,0': 6,
    '-1,1': 7,
  }

  const getPUnitVec = (pVec) => {
    const [pVecRow, pVecCol] = pVec;

    return [pVecRow / Math.abs(pVecRow || 1), pVecCol / Math.abs(pVecCol || 1)]; // 정확한 위치 단위 벡터는 아님
  }

  const rotate = ({ matrix, degree }) => {
    const degreeSize = degree >= 0 ? degree / 45 : (360 + degree) / 45;
    if (!degreeSize) return matrix;

    const newMatrix = JSON.parse(JSON.stringify(matrix));
    const size = matrix.length;
    const middleIdx = Math.floor(size / 2);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const pVec = [row - middleIdx, col - middleIdx];
        const pUnitVec = getPUnitVec(pVec);
        if (pVec[0] !== 0 && pVec[1] !== 0 && Math.abs(pVec[0]) !== Math.abs(pVec[1])) continue;  // 대각선, 수직선, 수평선 방향 값들인지 판별
        const distance = Math.abs(pVec[0] || pVec[1]);

        const dVecStartIdx = pUnitVecToDVecStartIdx[pUnitVec];
        const dRow = dVecRows.slice(dVecStartIdx, dVecStartIdx + degreeSize).reduce((acc, curr) => acc + curr, 0) * distance;
        const dCol = dVecCols.slice(dVecStartIdx, dVecStartIdx + degreeSize).reduce((acc, curr) => acc + curr, 0) * distance;
        const nextRow = row + dRow;
        const nextCol = col + dCol;

        newMatrix[nextRow][nextCol] = matrix[row][col];
      }
    }

    return newMatrix;
  }

  const result = testCases.map(rotate);

  return result.flat().map(line => line.join(' ')).join('\n')
}

console.log(solution(testCases))

