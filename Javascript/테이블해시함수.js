const solution = (data, col, rowBegin, rowEnd) => {
  const colIdx = col - 1;
  const rowIdxBegin = rowBegin - 1;
  const rowIdxEnd = rowEnd - 1;

  data.sort((a, b) => {
    if (a[colIdx] === b[colIdx]) {
      return b[0] - a[0]
    }
    return a[colIdx] - b[colIdx];
  })

  const getS = (rowIdx) => {
    return data[rowIdx].reduce((acc, curr) => acc + (curr % (rowIdx + 1)) , 0);
  }

  let result = getS(rowIdxBegin);

  for (let i = rowIdxBegin + 1; i <= rowIdxEnd; i++) {
    result ^= getS(i);
  }

  return result;
}

console.log(solution([[2, 2, 6], [1, 5, 10], [4, 2, 9], [3, 8, 3]], 2, 2, 3)) // return: 4