const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const formulaCount = Number(input[0]);
const formula = input[1].trim();

const calculate = (prevNumber, currentNumber, symbol) => {
  switch (symbol) {
    case '*':
      return prevNumber * currentNumber;
    case '+':
      return prevNumber + currentNumber;
    case '-':
      return prevNumber - currentNumber;
    default:
      return NaN;
  }
}


const combination = (numbers, n) => {
  if (n === 1) {
    const candidates = numbers.map(number => [number])
    return candidates;
  };

  const result = [];

  numbers.forEach((number, idx) => {
    const candidates = combination(numbers.slice(idx + 1), n - 1).map(candidate => [number, ...candidate])
    result.push(...candidates);
  })

  return result;
}

const solution = (formula, formulaCount) => {
  if (formulaCount === 1) {
    return Number(formula);
  }

  const candidates = [];
  const symbolOrders = Array.from({length: Math.floor(formulaCount / 2)}, (_, idx) => idx + 1)
  for (let n = 1; n <= Math.floor(formulaCount / 2); n++) {
    candidates.push(...combination(symbolOrders, n));
  }

  const getResult = (formula, candidate) => {
    let prevSymbol = '';
    let acc = null;
    const exposedArray = [];

    if (candidate) {
      let prevCandidateValue = 0;
      for (const value of [...candidate, symbolOrders[symbolOrders.length - 1] + 1] ) {
        if (value - prevCandidateValue > 2) {
          return -Infinity;
        }
        prevCandidateValue = value;
      }
    }

    for (let idx = 0; idx < formula.length; idx++) {
      const value = formula[idx];

      const isNumber = !isNaN(value);
      if (isNumber) {
        const numberValue = Number(value);
        if (acc === null) {
          acc = numberValue;
        } else {
          acc = calculate(acc, numberValue, prevSymbol);
        }
      } else {
        if (candidate?.includes(Math.floor((idx + 1) / 2))) {
          exposedArray.push(acc);
          exposedArray.push(value);
          acc = null;
          prevSymbol = '';
        } else {
          prevSymbol = value;
        }
      }
    }

    exposedArray.push(acc);

    return candidate ? getResult(exposedArray) : acc;
  }

  let maxResult = -Infinity;

  for (const candidate of candidates) {
    maxResult = Math.max(maxResult, getResult(formula, candidate));
  }

  return maxResult;
}

console.log(solution(formula, formulaCount))
