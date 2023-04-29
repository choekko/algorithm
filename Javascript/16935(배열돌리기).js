const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const [rowCount, colCount, commandCount] = input[0].split(' ').map(Number);
const matrix = input.slice(1, 1 + rowCount).map(line => line.split(' ').map(Number));
const commandList = input[rowCount + 1].split(' ').map(Number);

const solution = (matrix, commandList) => {
  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  const command1 = (matrix) => {
    const newMatrix = []
    for (let row = rowCount - 1; row >= 0; row--) {
      newMatrix.push(matrix[row]);
    }
    return newMatrix;
 }

 const command2 = (matrix) => {
    const newMatrix = [];

    for (let row = 0; row < rowCount; row++) {
      const newRow = [];

      for (let col = colCount - 1; col >= 0; col--) {
        newRow.push(matrix[row][col]);
      }
      newMatrix.push(newRow);
    }

    return newMatrix;
 }

 const command3 = (matrix) => {
    const newMatrix = [];

    for (let col = 0; col < colCount; col++) {
      const newRow = [];
      for (let row = rowCount - 1; row >= 0; row--) {
        newRow.push(matrix[row][col]);
      }
      newMatrix.push(newRow);
    }

    return newMatrix;
 }

 const command4 = (matrix) => {
   const newMatrix = [];

   for (let col = colCount - 1; col >= 0; col--) {
     const newRow = [];
     for (let row = 0; row < rowCount; row++) {
       newRow.push(matrix[row][col]);
     }
     newMatrix.push(newRow);
   }

   return newMatrix;
 }


 const getSomeMatrix = (startRow, startCol, rowSize, colSize) => {
    const someMatrix = [];
    for (let row = startRow; row < startRow + rowSize; row++) {
      const rowLine = []
      for (let col = startCol; col < startCol + colSize; col++) {
        rowLine.push(matrix[row][col]);
      }
      someMatrix.push(rowLine);
    }
    return someMatrix;
 }

 const setSomeMatrix = (matrix, startRow, startCol, newMatrix) => {
    const rowSize = newMatrix.length;
    const colSize = newMatrix[0].length;

    for (let row = startRow; row < startRow + rowSize; row++) {
      for (let col = startCol; col < startCol + colSize; col++) {
        matrix[row][col] = newMatrix[row - startRow][col - startCol];
      }
    }
 }

  const halfRowCount = Math.floor(rowCount / 2);
  const halfColCount = Math.floor(colCount / 2);

  const startPosition = {
    section1: [0, 0],
    section2: [0, halfColCount],
    section3: [halfRowCount, halfColCount],
    section4: [halfRowCount, 0],
  }

  const sectionMatrix = {
    section1: getSomeMatrix(...startPosition.section1, halfRowCount, halfColCount),
    section2: getSomeMatrix(...startPosition.section2, halfRowCount, halfColCount),
    section3: getSomeMatrix(...startPosition.section3, halfRowCount, halfColCount),
    section4: getSomeMatrix(...startPosition.section4, halfRowCount, halfColCount),
  }

 const command5 = (matrix) => {
    const order = [2, 3, 4, 1];
    order.forEach(currentSectionNo => {
      const prevSectionNo = currentSectionNo === 1 ? 4 : currentSectionNo - 1;
      const prevSection = sectionMatrix[`section${prevSectionNo}`];
      setSomeMatrix(matrix, ...startPosition[`section${currentSectionNo}`], prevSection);
    })

    return matrix;
  }

  const command6 = (matrix) => {
    const order = [4, 3, 2, 1];
    order.forEach(currentSectionNo => {
      const prevSectionNo = currentSectionNo === 4 ? 1 : currentSectionNo + 1;
      const prevSection = sectionMatrix[`section${prevSectionNo}`];
      setSomeMatrix(matrix, ...startPosition[`section${currentSectionNo}`], prevSection);
    })

    return matrix;
  }

  const command = {
    command1,
    command2,
    command3,
    command4,
    command5,
    command6
  }

  let currentMatrix = matrix;
 commandList.forEach(commandNo => {
   currentMatrix = command[`command${commandNo}`](currentMatrix);
 })

  currentMatrix.forEach(line => console.log(line.join(' ')))
}

solution(matrix, commandList);