const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const strings = input.slice(1);

const solution = (strings) => {
  let prevStringAsArray = [...''.repeat(strings[0].length)];
  let count = 0;

  for (let i = strings.length - 1; i >= 0; i--) {
    count++;
    const checker = {};
    const stringAsArray = [...strings[i]];

    let flag = false;
    for (let j = 0; j < stringAsArray.length; j++) {
      const subString = stringAsArray[j] + prevStringAsArray[j];
      prevStringAsArray[j] = subString;

      if (checker[subString]) {
        flag = true;
      } else {
        checker[subString] = true;
      }
    }

    if (!flag) break;
  }

  return strings.length - count;
}

console.log(solution(strings))