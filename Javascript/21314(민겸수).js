const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const target = input[0];

const solution = (target) => {
  let maxDecimalNumberByString = '';
  let minDecimalNumberByString = '';

  let kFlag = false;
  let mCount = 0;
  for (let i = target.length - 1; i >= 0; i--) {
    const char = target[i];
    const nextChar = target[i - 1] ?? '';

    if (char === 'K') {
      if (nextChar === 'K') {
        maxDecimalNumberByString = '5' + maxDecimalNumberByString;
        kFlag = false;
      }
      minDecimalNumberByString = '5' + minDecimalNumberByString;
      kFlag = true;
    }
    else if (char === 'M') {
      if (nextChar !== 'M') {
        minDecimalNumberByString = '1' + '0'.repeat(mCount) + minDecimalNumberByString; // <--- number 타입으로 다룰 경우, 2^31 - 1 보다 큰 값을 다루게 될 때 의도대로 되지 않게 된다.

        if (kFlag) {
          maxDecimalNumberByString ='5' + '0'.repeat(mCount + 1) + maxDecimalNumberByString;
          kFlag = false;
        } else {
          maxDecimalNumberByString = '1'.repeat(mCount + 1) + maxDecimalNumberByString;
        }
        mCount = 0;
      } else {
        mCount += 1;
      }
    }
  }

  if (kFlag) {
    maxDecimalNumberByString = '5' + maxDecimalNumberByString;
  }

  return [maxDecimalNumberByString, minDecimalNumberByString].join('\n');
}

console.log(solution(target));