const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [wordCount, letterCount] = input[0].split(' ').map(Number);
const words = [];

for (let i = 1; i <= wordCount; i++) {
  words.push(input[i]);
}

function* combination(numbers, n) {
  if (n === 0) yield []
  if (n === 1) {
    for (const number of numbers) {
      yield [number];
    }
  }

  for (let idx = 0; idx < numbers.length; idx++) {
    const number = numbers[idx];
    const remainingNumbers = numbers.slice(idx + 1);
    const subCombinations = combination(remainingNumbers, n - 1);

    for (const subCombination of subCombinations) {
      yield [number, ...subCombination];
    }
  }
}

const solution = (words, letterCount) => {
  if (letterCount < 5) return 0;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphabets = [...alphabet];
  const baseLetters = ['a', 'n', 't', 'i', 'c'];
  const otherLetters = alphabets.filter(alphabet => !baseLetters.includes(alphabet));
  const candidateGenerator = combination(otherLetters, letterCount - 5);

  let result = 0;

  for (const candidate of candidateGenerator) {
    const letterMap = {};
    [...baseLetters, ...candidate].forEach(letter => { letterMap[letter] = true });
    let count = 0;

    for (const word of words) {
      const target = word.slice(4, -4);
      if ([...target].every(letter => Boolean(letterMap[letter]))) {
        count++;
        continue;
      }
    }

    result = Math.max(result, count);
  }

  return result;
}

console.log(solution(words, letterCount))

// console.log(combination([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 12));

