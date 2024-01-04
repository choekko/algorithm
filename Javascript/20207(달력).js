const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const schedules = input.slice(1).map(line => {
  const [start, end] = line.split(' ').map(Number);
  return { start, end };
})

const solution = (schedules) => {
  schedules.sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return b.end - a.end;
  })

  const maxEndDate = Math.max(...schedules.map(({ end }) => end))


  const calendar = [];

  for (const { start, end } of schedules) {
    const row = calendar.find(line => !line[start]);

    if (!row) {
      calendar.push(Array.from({ length: maxEndDate + 1 }, (_, date) => {
        return date>= start && date <= end;
      })) // 0 패딩 있음
      continue;
    }

    for (let date = start; date <= end; date++) {
      row[date] = true;
    }
  }

  let result = 0;
  let maxHeightBuffer = 0;
  let widthBuffer = 0;

  for (let date = 1; date <= maxEndDate; date++) {
    let hasNoSchedule = true;

    for (let row = 0; row < calendar.length; row++) {
      if (calendar[row][date]) {
        hasNoSchedule = false;
        maxHeightBuffer = Math.max(maxHeightBuffer, row + 1);
      }
    }
    if (hasNoSchedule) {
      result += maxHeightBuffer * widthBuffer;
      maxHeightBuffer = 0;
      widthBuffer = 0;
    } else {
      widthBuffer++;
    }
  }

  result += maxHeightBuffer * widthBuffer;

  // console.log(calendar.map(line => line.map(Number).join('')).join('\n'))

  return result;
}

console.log(solution(schedules));