const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const sheets = input[1].split(' ').map(Number);
const cases = input.slice(3).map(line => line.split(' ').map(Number));

const solution = (_sheets, cases) => {
  const infos = Array(_sheets.length + 1).fill(0);
  const sheets = [0, ..._sheets];
  for (let i = 1; i < infos.length; i++) {
    const prevImpossibleCount = infos[i - 1];
    const prevSheet = sheets[i - 1];
    const currentSheet = sheets[i];

    infos[i] = currentSheet < prevSheet ? prevImpossibleCount + 1: prevImpossibleCount;
  }
  const result = [];

  for (const section of cases) {
    const [start, end] = section;

    result.push(infos[end] - infos[start]);
  }

  return result.join('\n');
}

console.log(solution(sheets, cases))