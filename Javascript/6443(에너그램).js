const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const count = Number(input[0]);
const words = [];

for (let i = 1; i <= count; i++) {
  words.push(input[i]);
}


const permutation = (numbers, n, breadCrumb, breadCrumbSet) => {
  if (breadCrumbSet.has(breadCrumb)) return [];

  breadCrumbSet.add(breadCrumb);
  if (n === 1) return numbers.map(number => [number]);

  let result = [];

  numbers.forEach((number, idx) => {
    const candidates = permutation(numbers.filter((_, _idx) => _idx !== idx), n - 1, breadCrumb + number + '', breadCrumbSet)
      .map(candidate => [number, ...candidate]);

    result = [...result, ...candidates];
  })

  return result;
}

const solution = (words) => words.flatMap(word => permutation([...word].sort(), word.length, '', new Set()))
    .map(charArray => charArray.join(''))
    .join('\n');

console.log(solution(words));