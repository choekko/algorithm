// https://school.programmers.co.kr/learn/courses/30/lessons/92341?language=javascript

const calculateTime = (start, end = '23:59') => {
  const [hourOfStart, minuteOfStart] = start.split(':').map(Number);
  const [hourOfEnd, minuteOfEnd] = end.split(':').map(Number);

  return hourOfEnd * 60 + minuteOfEnd - (hourOfStart * 60 + minuteOfStart);
}

const calculateCost = (time, defaultMinutes, defaultCost, unitMinute, unitCost) => {
  const remainTime = time - defaultMinutes;
  if (remainTime <= 0) return defaultCost;

  return defaultCost + Math.ceil(remainTime / unitMinute) * unitCost;
}

function solution(fees, records) {
  const [defaultMinutes, defaultCost, unitMinute, unitCost] = fees;
  const recordMap = {};

  records.forEach(record => {
    const [timeByString, carNumber, type] = record.split(' ');

    if (!recordMap[carNumber]) {
      recordMap[carNumber] = {
        IN: [],
        OUT: [],
      }
    }

    recordMap[carNumber][type].push(timeByString);
  })

  return Object.entries(recordMap)
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, [_, { IN, OUT }]) => {
      let allTime = 0;
      IN.forEach((startTime, idx) => {
        allTime += calculateTime(startTime, OUT[idx]);
      })
      const allCost = calculateCost(allTime, defaultMinutes, defaultCost, unitMinute, unitCost);
      acc.push(allCost);
      return acc;
    }, [])
}