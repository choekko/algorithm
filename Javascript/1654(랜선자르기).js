let fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().split('\n');

let [_, numberOfNeeds] = input.shift().split(' ');
numberOfNeeds = Number(numberOfNeeds);
const lineLengths = input.map(Number);

const solution = (lineLengths, numberOfNeeds) => {
  const getSplitLineNumber = (size) => lineLengths.reduce((acc, lineLength) => acc + Math.floor(lineLength / size), 0);

  let shortLength = 0;
  let longLength = Math.pow(2, 31) - 1;
  let middleLength;
  while (shortLength <= longLength) {
    middleLength = Math.floor((shortLength + longLength) / 2);

    if (numberOfNeeds <= getSplitLineNumber(middleLength)) {
      if (shortLength === middleLength) {
        shortLength = middleLength + 1;
      } else {
        shortLength = middleLength;
      }
      continue;
    }
    if (longLength === middleLength) {
      longLength = middleLength - 1;
      middleLength -= 1;
    } else {
      longLength = middleLength;
    }
  }

  return middleLength;
}

console.log(solution(lineLengths, numberOfNeeds));