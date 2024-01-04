const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [mp, mf, ms, mv] = input[1].split(' ').map(Number);
const ingredients = input.slice(2).map(line => {
  const [p, f, s, v, cost] = line.split(' ').map(Number);
  return { p, f, s, v, cost }
})

const solution = (mp, mf, ms, mv, ingredients) => {
  let minCost = Infinity;
  let targetIngredientNumbers;
  const checker = Array.from({length: ingredients.length }, () => false);

  const dfs = (pSum, fSum, sSum, vSum, costSum, idx) => {
    if (mp <= pSum && mf <= fSum && ms <= sSum && mv <= vSum) {
      if (minCost > costSum) {
        minCost = costSum;
        const _targetIngredientNumbers = [];
        checker.forEach((value, idx) => {
          if (value) {
            _targetIngredientNumbers.push(idx + 1);
          }
        })
        targetIngredientNumbers = _targetIngredientNumbers;
      }
      return;
    }
    for (let i = idx; i < ingredients.length; i++) {
      if (checker[i]) continue;
      const { p, f, s, v, cost} = ingredients[i];

      checker[i] = true;
      dfs(pSum + p, fSum + f, sSum + s, vSum + v, costSum + cost, idx + 1);
      checker[i] = false;
    }
  }

  dfs(0, 0, 0, 0, 0, 0 );

  const result = [minCost === Infinity ? -1 : minCost];
  if (targetIngredientNumbers) {
    result.push(targetIngredientNumbers.join(' '));
  }
  return result.join('\n');
}

console.log(solution(mp, mf, ms, mv, ingredients))