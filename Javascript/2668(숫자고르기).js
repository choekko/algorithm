const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const count = Number(input[0]);

const numbers = [0];
for (let i = 1; i <= count; i++) {
  numbers.push(Number(input[i]));
}

const solution = (numbers) => {
  const checkingArray = Array(numbers.length).fill(false);

  loop: for (let i = 1; i < numbers.length; i++) {
    let current = i;
    const breadCrumb = [];

    while (true) {
      if (checkingArray[current]) continue loop;

      const idxOfDuplicatedNumber = breadCrumb.findIndex(value => value === current);

      if (idxOfDuplicatedNumber !== -1) {
        for (let j = idxOfDuplicatedNumber; j < breadCrumb.length; j++) {
          checkingArray[breadCrumb[j]] = true;
        }
        continue loop;
      }
      breadCrumb.push(current);
      current = numbers[current];
    }
  }

  const result = [0];

  checkingArray.forEach((checked, number) => {
    if (checked) {
      result[0]++;
      result.push(number);
    }
  })

  return result.join('\n');
}

console.log(solution(numbers));