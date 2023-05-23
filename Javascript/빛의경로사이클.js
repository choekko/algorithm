// https://school.programmers.co.kr/learn/courses/30/lessons/86052

const solution = (matrix) => {
  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  const dRows = [-1, 0, 1, 0]; // 북 동 남 서
  const dCols = [0, 1, 0, -1];
  const rotateDirIdx = (dirIdx, type) => {
    if (type === 'S') return dirIdx;
    if (type === 'R') return dirIdx + 1 >= dRows.length ? 0 : dirIdx + 1;

    return dirIdx - 1 < 0 ? dRows.length - 1 : dirIdx - 1;
  }

  const move = (currentInfo) => {
    const { row, col, dirIdx } = currentInfo;
    let nextRow = row + dRows[dirIdx];
    let nextCol = col + dCols[dirIdx];

    if (nextRow < 0) {
      nextRow = rowCount - 1;
    } else if (nextRow >= rowCount) {
      nextRow = 0;
    }
    if (nextCol < 0) {
      nextCol = colCount - 1;
    } else if (nextCol >= colCount) {
      nextCol = 0;
    }
    const nextType = matrix[nextRow][nextCol];

    return { row: nextRow, col: nextCol, dirIdx: rotateDirIdx(dirIdx, nextType), prevInfo: currentInfo };
  }

  const cycleNodesMap = {};

  const cutOffNoneCycleNode = (startNodeInfo, cycleNodesMap) => {
    let currentNodeInfo = startNodeInfo;
    let cutCount = 0;

    while (true) {
      const { row, col, dirIdx, prevInfo } = currentNodeInfo;

      cycleNodesMap[[row, col, dirIdx]] = null;
      cutCount++;

      if (!prevInfo) break;

      currentNodeInfo = prevInfo;
    }
    return cutCount;
  }

  const cycleLengths = [];

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      for (let dirIdx = 0; dirIdx < dRows.length; dirIdx++) {
        const cycleNodesMapBucket = {};
        let currentNodeInfo = { row, col, dirIdx, prevInfo: null };
        let isAlreadyChecked = false;
        let traversingCount = 0;

        while (true) {
          const { row, col, dirIdx, prevInfo } = currentNodeInfo;
          const key = [row, col, dirIdx];

          if (cycleNodesMap[key]) {
            isAlreadyChecked = true;
            break;
          }

          if (cycleNodesMapBucket[key]) {
            const cutCount = cutOffNoneCycleNode(cycleNodesMapBucket[key], cycleNodesMapBucket);
            cycleNodesMapBucket[key] = prevInfo;
            traversingCount -= cutCount;
            break;
          }
          cycleNodesMapBucket[key] = prevInfo;
          currentNodeInfo = move(currentNodeInfo);
          traversingCount++;
        }

        if (isAlreadyChecked) continue;

        Object.entries(cycleNodesMapBucket).map(([key]) =>{
          cycleNodesMap[key] = true;
        })

        cycleLengths.push(traversingCount);
      }
    }
  }

  return cycleLengths.sort((a, b) => a - b);
}
