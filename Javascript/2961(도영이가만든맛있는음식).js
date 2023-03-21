const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
const foodPairs = input.slice(1).map(foodPair => foodPair.split(' ').map(Number));

const combination = (numbers, r) => {
  if (r === 1) return numbers.map(number => [number]);

  const result = [];
  numbers.forEach((number, idx) => {
    result.push(...combination(numbers.slice(idx + 1), r - 1).map(candidate => [number, ...candidate]));
  })
  return result;
}

const solution = (foodPairs) => {
  const indices = Array.from({ length: foodPairs.length }, (_, i) => i);
  const indicesCandidates = indices.flatMap((_, idx) => combination(indices, idx + 1));

  let result = Infinity;

  console.log(indicesCandidates)

  indicesCandidates.forEach(indicesCandidate => {
    const amountMap = indicesCandidate.reduce((acc, curr) => ({
      sour: acc.sour * foodPairs[curr][0],
      bitter: acc.bitter + foodPairs[curr][1],
    }), {
      sour: 1,
      bitter: 0,
    })

    const difference = Math.abs(amountMap.sour - amountMap.bitter);
    result = Math.min(difference, result);
  })

  return result;
}

console.log(solution(foodPairs));
