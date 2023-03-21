const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
const formula = input[0];

const solution = (formula) => {
  const formulaTokens = formula.replace(/[+-]/g, (match) => `%${match}%`).split('%');

  let negativeFlag = 0;
  let result = 0;

  for (let formulaToken of formulaTokens) {
    const isNumberToken = !Number.isNaN(Number(formulaToken));

    if (isNumberToken) {
      result += Number(`${negativeFlag ? '-' : '+'}${formulaToken}`);
      continue;
    }

    if (!negativeFlag) {
      const isMinus = formulaToken === '-';
      if (isMinus) {
        negativeFlag = 1;
      }
    }
  }

  return result;
}

console.log(solution(formula));