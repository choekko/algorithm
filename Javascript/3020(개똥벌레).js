const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [_, height] = input[0].split(' ').map(Number);

const stalactites = [] // 종유석
const stalagmites = [] // 석순
input.slice(1).forEach((value, idx) => {
  const length = Number(value);

  if (idx % 2) {
    stalagmites.push(length);
  } else {
    stalactites.push(length);
  }
})

const solution = (height,  stalactites, stalagmites) => {
  const prefixSumStalagmites = Array.from({ length: height + 1 }, () => 0);
  const prefixSumStalactites =  Array.from({ length: height + 1 }, () => 0);

  stalagmites.forEach(value => {
    prefixSumStalagmites[value]++;
  })

  stalactites.forEach(value => {
    prefixSumStalactites[value]++;
  })

  for (let i = height; i > 0; i--) {
    prefixSumStalactites[i] += prefixSumStalactites[i + 1] ?? 0;
    prefixSumStalagmites[i] += prefixSumStalagmites[i + 1] ?? 0;
  }
  
  const prefixSumAllPerHeight = Array.from({ length: height + 1 }, () => 0);

  for (let i = 1; i < height + 1; i++) {
    prefixSumAllPerHeight[i] = prefixSumStalagmites[i] + prefixSumStalactites[height - i + 1];
  }

  const minCount = Math.min(...prefixSumAllPerHeight.slice(1));
  const lineCount = prefixSumAllPerHeight.slice(1).reduce((acc, curr) => acc + (curr === minCount), 0);

  return [minCount, lineCount].join(' ');
}

console.log(solution(height, stalactites, stalagmites))