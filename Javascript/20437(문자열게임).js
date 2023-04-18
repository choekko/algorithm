const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const testCasesNumber = Number(input[0]);
const testCases = [];
for(let i = 1; i <= testCasesNumber * 2; i += 2) {
  testCases.push({ string: input[i], duplicationCount: Number(input[i + 1])});
}

const solution = (testCases) => {
  const getResult = (testCase) => {
    const { string, duplicationCount } = testCase;

    if (duplicationCount === 1) return '1 1';

    const info = {};
    let leftIdx = 0;
    let rightIdx = 0;
    let minResult = Infinity;
    let maxResult = -Infinity;

    while (rightIdx < string.length) {
      const char = string[rightIdx];

      if (info[char]?.count === duplicationCount - 1) {
        const frontIdxInBreadCrumb = info[char].breadCrumb.shift();

        minResult = Math.min(minResult, rightIdx - frontIdxInBreadCrumb + 1);
        maxResult = Math.max(maxResult, rightIdx - frontIdxInBreadCrumb + 1);


        leftIdx = frontIdxInBreadCrumb + 1;
        info[char].count -= 1;
      }

      if (info[char]) {
        info[char].count += 1;
        info[char].breadCrumb.push(rightIdx);
      } else {
        info[char] = { count: 1, breadCrumb: [rightIdx] }
      }

      rightIdx += 1;
    }

    if (minResult === Infinity) return '-1';

    return `${minResult} ${maxResult}`
  }

  return testCases.map(getResult).join('\n');
}

console.log(solution(testCases));