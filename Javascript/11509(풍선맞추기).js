const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  const prevCount = {};
  let arrowCount = 0;

  const increasePrevCount = number => {
    if (prevCount[number]) {
      prevCount[number] += 1;
    } else {
      prevCount[number] = 1;
    }
  }

  for (const number of numbers) {
    if (prevCount[number + 1]) {
      prevCount[number + 1] -= 1;
      increasePrevCount(number);
    } else {
      increasePrevCount(number);
      arrowCount++;
    }
  }

  return arrowCount;
}

console.log(solution(numbers))