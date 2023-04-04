// https://school.programmers.co.kr/learn/courses/30/lessons/77485

function solution(rows, columns, queries) {
  const matrix = Array(rows + 1).fill(0)
    .map((_, row) => Array(columns + 1).fill(0).map((_, col) => (row - 1) * columns + col));

  const rotate = ([row1, col1], [row2, col2]) => {
    const northItems = [];
    const eastItems = [];
    const southItems = [];
    const westItems = [];

    let min = Infinity;

    for (let i = row2; i > row1; i--) {
      westItems.push([[i, col1], matrix[i][col1]]);
      min = Math.min(min, matrix[i][col1]);
    }

    for (let i = row1; i < row2; i++) {
      eastItems.push([[i, col2], matrix[i][col2]]);
      min = Math.min(min, matrix[i][col2]);
    }

    for (let j = col1; j < col2; j++) {
      northItems.push([[row1, j], matrix[row1][j]]);
      min = Math.min(min, matrix[row1][j]);
    }

    for (let j = col2; j > col1; j--) {
      southItems.push([[row2, j], matrix[row2][j]]);
      min = Math.min(min, matrix[row2][j]);
    }

    northItems.forEach(([[row, col], value]) => {
      matrix[row][col + 1] = value;
    })
    eastItems.forEach(([[row, col], value]) => {
      matrix[row + 1][col] = value;
    })
    southItems.forEach(([[row, col], value]) => {
      matrix[row][col - 1] = value;
    })
    westItems.forEach(([[row, col], value]) => {
      matrix[row - 1][col] = value;
    })

    return min;
  }

  return queries.map(([row1, col1, row2, col2]) => rotate([row1, col1], [row2, col2]));
}