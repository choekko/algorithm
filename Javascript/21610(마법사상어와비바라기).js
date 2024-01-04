const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [mapSize, commandCounts] = input[0].split(' ').map(Number);
const map = []
const commands = [];

for (let i = 1; i < 1 + mapSize; i++) {
  map.push(input[i].split(' ').map(Number));
}

for (let i = 1 + mapSize; i < 1 + mapSize + commandCounts; i++) {
  const [dir, distance] = input[i].split(' ').map(Number);
  commands.push({ dir, distance });
}

const solution = (mapSize, map, commands) => {
  const dRow = [0, 0, -1, -1, -1, 0, 1, 1, 1] // 가만히, 서, 북서, 북, 북동, 동, 남동, 남, 남서
  const dCol = [0, -1, -1, 0, 1, 1, 1, 0, -1]

  let cloudPositions = [
    { row: mapSize - 1, col: 0 },
    { row: mapSize - 1, col: 1 },
    { row: mapSize - 2, col: 0 },
    { row: mapSize - 2, col: 1 },
  ];
  let prevCloudPositionInfo = {};

  const moveClouds = ({ dir, distance }) => {
    let count = cloudPositions.length;
    while (count) {
      const { row, col } = cloudPositions.shift();

      let newRow = row + (dRow[dir] * distance);
      let newCol = col + (dCol[dir] * distance);

      while (newRow < 0) {
        newRow += mapSize;
      }
      while (newRow >= mapSize) {
        newRow -= mapSize;
      }
      while (newCol < 0) {
        newCol += mapSize;
      }
      while (newCol >= mapSize) {
        newCol -= mapSize;
      }

      cloudPositions.push({ row: newRow, col: newCol});
      count--;
    }
  }

  const rainAndCopyWater = () => {
    for (const { row, col } of cloudPositions) {
      map[row][col] += 1;
      prevCloudPositionInfo[[row, col]] = true;
    }

    for (const { row, col } of cloudPositions) {
      const dRow = [-1, -1, 1, 1]; // 북서 북동 남동 남서
      const dCol = [-1, 1, 1, -1];

      let validCount = 0;
      for (let i = 0; i < dRow.length; i++) {
        const newRow = row + dRow[i];
        const newCol = col + dCol[i];

        if (newRow < 0 || newRow >= mapSize || newCol < 0 || newCol >= mapSize || !map[newRow][newCol]) continue;
        validCount++;
      }

      map[row][col] += validCount;
    }
    cloudPositions = [];
  }

  const createCloud = () => {
    for (let row = 0; row < mapSize; row++) {
      for (let col = 0; col < mapSize; col++) {
        if (!prevCloudPositionInfo[[row, col]] && map[row][col] >= 2) {
          cloudPositions.push({ row, col });
          map[row][col] -= 2;
        }
      }
    }
    prevCloudPositionInfo = {}
  }

  const getAllWaterAmount = () => {
    let waterAmount = 0;
    for (let row = 0; row < mapSize; row++) {
      for (let col = 0; col < mapSize; col++) {
        waterAmount += map[row][col];
      }
    }

    return waterAmount;
  }

  // const check = (identifier = '') => { // 상태 확인용 함수
  //   console.log(`-----${identifier}-----`);
  //   console.log(map.map((line, _row) => line.map((item, _col) => {
  //     if (cloudPositions.find(({ row, col }) => row === _row && col === _col)) {
  //       return `${item}`
  //     }
  //     return item;
  //   })));
  // }

  commands.forEach(command => {
    moveClouds(command);
    rainAndCopyWater();
    createCloud();
  })

  return getAllWaterAmount();
}

console.log(solution(mapSize, map, commands))