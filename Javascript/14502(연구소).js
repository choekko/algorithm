const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [rowSize, colSize] = input[0].split(' ').map(Number);
const matrix = [];
const virusPositions = [];
for (let i = 1; i <= rowSize; i++) {
  const line = input[i].split(' ').map(Number);
  matrix.push(line);

  for (let col = 0; col < colSize; col++) {
    if (line[col] === 2) {
      virusPositions.push({ row: i - 1, col });
    }
  }
}

const solution = (matrix, rowSize, colSize, virusPositions) => {
  const itemCount = rowSize * colSize;

  function* generateWalls() {
    for (let i = 0; i < itemCount; i++) {
      const firstWallRow = Math.floor(i / colSize);
      const firstWallCol = i % colSize;
      if (matrix[firstWallRow][firstWallCol] !== 0) continue;

      for (let j = i + 1; j < itemCount; j++) {
        const secondWallRow = Math.floor(j / colSize);
        const secondWallCol = j % colSize;
        if (matrix[secondWallRow][secondWallCol] !== 0) continue;

        for (let k = j + 1; k < itemCount; k++) {
          const thirdWallRow = Math.floor(k / colSize);
          const thirdWallCol = k % colSize;
          if (matrix[thirdWallRow][thirdWallCol] !== 0) continue;

          yield [
            { row: firstWallRow, col: firstWallCol },
            { row: secondWallRow, col: secondWallCol },
            { row: thirdWallRow, col: thirdWallCol }
          ]
        }
      }
    }
  }
  
  const createNewMatrix = () => {
    const newMatrix = Array.from({ length: rowSize }, (_, row) => Array.from({ length: colSize }, (_, col) => matrix[row][col]));
    return newMatrix;
  }

  const wallsGenerator = generateWalls();
  let maxSafeArea = 0;
  
  while (true) {
    const { value: wallPositions, done } = wallsGenerator.next();

    if (done) break;

    const newMatrix = createNewMatrix();

    for (const { row, col } of wallPositions) {
      newMatrix[row][col] = 1;
    }

    // 바이러스 퍼뜨리기
    const _virusPositions = [...virusPositions];
    const dRows = [-1, 0, 1, 0] // 북 동 남 서
    const dCols = [0, 1, 0, -1]
    
    while (_virusPositions.length) {
      const { row, col } = _virusPositions.pop();
      newMatrix[row][col] = 2;
      
      for (let i = 0; i < dRows.length; i++) {
        const nextRow = row + dRows[i];
        const nextCol = col + dCols[i];
        
        if (nextRow < 0 || nextRow >= rowSize || nextCol < 0 || nextCol >= colSize || newMatrix[nextRow][nextCol] !== 0) continue;
        _virusPositions.unshift({ row: nextRow, col: nextCol })
      }
    }

    // 안전 영역 카운트
    let safeArea = 0;

    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        if (newMatrix[row][col] === 0) {
          safeArea++;
        }
      }
    }

    maxSafeArea = Math.max(maxSafeArea, safeArea);
  }

  return maxSafeArea;
}

console.log(solution(matrix, rowSize, colSize, virusPositions));