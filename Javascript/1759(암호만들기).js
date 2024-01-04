const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [targetLength] = input[0].split(' ').map(Number);
const alphabets = input[1].split(' ');

const combination = (arr, r) => {
  if (r === 1) return arr.map(value => [value]);

  const result = [];
  arr.forEach((value, idx) => {
    const candidates = combination(arr.slice(idx + 1), r - 1).map(candidate => [value, ...candidate]);
    result.push(...candidates);
  })

  return result;
}


const solution = (alphabets, targetLength) => {
  alphabets.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

  const candidates = combination(alphabets, targetLength);

  return candidates.filter(candidate => {
    let consonantCount = 0;
    let vowelCount = 0;

    for (const alphabet of candidate) {
      if (['a', 'e', 'i', 'o', 'u'].includes(alphabet)) {
        vowelCount++;
      } else {
        consonantCount++;
      }
    }

    return consonantCount >= 2 && vowelCount >= 1;
  }).map(candidate => candidate.join(''))
    .join('\n');
}

console.log(solution(alphabets, targetLength))



