const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const propositions = [...new Set(input.slice(1))].map(line => line.split(' => '));

const solution = (propositions) => {
  const BIGGER_ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const SMALLER_ALPHABETS = BIGGER_ALPHABETS.map(alphabet => alphabet.toLowerCase());
  const ALPHABETS = [...BIGGER_ALPHABETS, ... SMALLER_ALPHABETS];
  const matrix = {};

  for (const alphabet of ALPHABETS) {
    for (const _alphabet of ALPHABETS) {
      if (!matrix[alphabet]) {
        matrix[alphabet] = {};
      }
      matrix[alphabet][_alphabet] = alphabet === _alphabet;
    }
  }

  propositions.forEach(([before, after]) => {
    matrix[before][after] = true;
  })

  const result = [];

  for (const _alphabet of ALPHABETS) {
    for (const alphabet of ALPHABETS) {
      for (const __alphabet of ALPHABETS) {
        if (alphabet === __alphabet) continue;
        if (matrix[alphabet][_alphabet] && matrix[_alphabet][__alphabet]) {
          matrix[alphabet][__alphabet] = true;
          result.push([alphabet, __alphabet]);
        }
      }
    }
  }

  result.sort((a, b) => (a[0].charCodeAt() - b[0].charCodeAt()) || (a[1].charCodeAt() - b[1].charCodeAt()));

  const resultSet = new Set(result.map(proposition => `${proposition[0]} => ${proposition[1]}`));

  return [resultSet.size, ...resultSet].join('\n');
}


console.log(solution(propositions))