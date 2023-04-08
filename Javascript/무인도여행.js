// https://school.programmers.co.kr/learn/courses/30/lessons/154540

function solution(maps) {
  const checkingMatrix = maps.map(line => Array(line.length).fill(false));
  const dRow = [-1, 0, 1, 0] // 북 동 남 서
  const dCol = [0, 1, 0, -1]
  const rowLength = maps.length;
  const colLength = maps[0].length;
  const result = [];

  const stack = [];

  const checkDays = () => {
    let days = 0;
    while (stack.length) {
      const [row, col] = stack.pop();

      if (maps[row][col] === 'X' || checkingMatrix[row][col]) continue;

      days += Number(maps[row][col]);
      checkingMatrix[row][col] = true;

      for (let dirIdx = 0; dirIdx < dRow.length; dirIdx++) {
        const nextRow = row + dRow[dirIdx];
        const nextCol = col + dCol[dirIdx];
        const isOverflow = nextRow < 0 || nextCol < 0 || nextRow >= rowLength || nextCol >= colLength;
        const isContinuous = !isOverflow && (maps[nextRow][nextCol] !== 'X')
        if (isContinuous) {
          stack.push([nextRow, nextCol])
        }
      }
    }
    result.push(days);
  }

  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      if ((maps[row][col] !== 'X') && !checkingMatrix[row][col]) {
        stack.push([row, col]);
        checkDays();
      }
    }
  }

  return result.length ? result.sort((a, b) => a - b) : [-1];
}