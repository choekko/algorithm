let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');

input.shift();
let bucket = [];
let count = 0;

input.forEach(rowString => {
  if (count < 3) {
    bucket.push(rowString.split(' ').map(status => status === 'T' ? 1 : 0));
    count++;
  }
  if (count === 3) {
    const result = findArr(bucket);
    console.log(result === Infinity ? -1 : result);
    count = 0;
    bucket = []
    return;
  }
})

function findArr(arr) {
  let result = Infinity;
  for (let bitMask = 0; bitMask < Math.pow(2, 8); bitMask++) {
    let copyArr = arr.map(row => row.slice());
    let changeBit = bitMask.toString(2).split('').filter(x => x === '1').length;
    if (result < changeBit) {
      continue;
    }
    for (let row = 0; row < 3; row++) {
      if (bitMask & (1 << row)) {
        for (let col = 0; col < 3; col++) {
          copyArr[row][col] = (copyArr[row][col] + 1) % 2;
        }
      }
    }
    for (let col = 0; col < 3; col++) {
      if (bitMask & (1 << (col + 3))) {
        for (let row = 0; row < 3; row++) {
          copyArr[row][col] = (copyArr[row][col] + 1) % 2;
        }
      }
    }
    if (bitMask & (1 << 6)) {
      for (let row = 0; row < 3; row++) {
        copyArr[row][row] = (copyArr[row][row] + 1) % 2;
      }
    }
    if (bitMask & (1 << 7)) {
      for (let row = 0; row < 3; row++) {
        copyArr[row][2 - row] = (copyArr[row][2 - row] + 1) % 2;
      }
    }
    let sumTemp = copyArr.map(row => row.reduce((acc, curr) => acc + curr)).reduce((acc, curr) => acc + curr);
    if (sumTemp === 9 || sumTemp === 0) {
      result = changeBit;
    }
  }
  return result;
}



