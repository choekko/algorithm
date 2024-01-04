function solution(n) {
  const matrix = Array(n).fill(null).map(() => Array(n).fill(true));
  let result = 0;

  const dfs = (row, col) => {
    console.log(matrix, row, col);
    if (!matrix[row][col]) return;

    if (row === n - 1) {
      result++;
      return;
    }

    const check = (isPossible) => {
      for (let i = 0; i < n; i++) {
        matrix[row][i] = isPossible;
        matrix[i][col] = isPossible;
        if (row + i < n && col + i < n) {
          matrix[row + i][col + i] = isPossible;
        }
        if (row + i < n && col - i >= 0) {
          matrix[row + i][col - i] = isPossible;
        }
        if (row - i >= 0 && col + i < n) {
          matrix[row - i][col + i] = isPossible;
        }
        if (row - i >= 0 && col - i >= 0) {
          matrix[row - i][col - i] = isPossible;
        }
      }
    }

    check(false);

    for (let j = 0; j < n; j++) {
      if (matrix[row + 1][j]) {
        dfs(row + 1, j);
      }
    }

    check(true);
  }

  for (let col = 0; col < n; col++) {
    dfs(0, col);
  }

  return result;
}