const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const [nByString, kByString] = input[0].split(' ');


// const solution = (n, k) => {
//   const factorialNumbers = [];
//   const kByBigInt = BigInt(k);
//   const nByBigInt = BigInt(n);
//
//   const factorialize = (number) => {
//     if (number === 1n) return;
//     for (let factorialNumber = 2n; ; factorialNumber++) {
//       if (!(number % factorialNumber)) {
//         factorialNumbers.push(factorialNumber);
//         factorialize(number / factorialNumber);
//         break;
//       }
//     }
//   }
//
//   factorialize(kByBigInt);
//
//   const numberCountMap = factorialNumbers.reduce((acc, curr) => {
//     if (acc[curr]) {
//       acc[curr] += 1n;
//     } else {
//       acc[curr] = 1n;
//     }
//     return acc;
//   }, {})
//
//   const entries = Object.entries(numberCountMap).map(entry => entry.map(BigInt));
//
//   // console.log(entries)
//   const traverse = (accumulatedRowCount, entriesIdx) => {
//     const [currentNumber, maxCount] = entries[entriesIdx] ;
//     // console.log('-----', currentNumber, maxCount)
//
//     for (let count = 0n; count <= maxCount; count++) {
//       const currentAmount = accumulatedRowCount * ((currentNumber * count) === 0n ? 1n : (currentNumber * count));
//
//       // console.log({ currentAmount, entriesIdx })
//       if (currentAmount === 0n) continue;
//       if (entriesIdx === BigInt(entries.length) - 1n) {
//         const countOfCuttingRow = currentAmount - 1n;
//         const countOfCuttingCol = (kByBigInt / currentAmount) - 1n;
//
//         // console.log({ countOfCuttingRow, countOfCuttingCol })
//         if (countOfCuttingRow + countOfCuttingCol === nByBigInt) {
//           return 'YES';
//         }
//         if (count === maxCount) {
//           return 'NO';
//         }
//       } else {
//         const result = traverse(currentAmount, entriesIdx + 1n);
//         if (result === 'YES') return 'YES';
//       }
//     }
//     return 'NO';
//   }
//
//   return traverse(1n, 0n);
// }

const solution = (nByString, kByString) => {
  const kByBigInt = BigInt(kByString);
  const n = Number(nByString);
  let maxNumber = Math.floor(n / 2);
  let minNumber = 0;

  while (minNumber <= maxNumber) {
    const middleNumber = Math.floor((maxNumber + minNumber) / 2);

    const piecesCount = BigInt(middleNumber + 1) * BigInt(n - middleNumber + 1);
    if (piecesCount === kByBigInt) {
      return 'YES';
    }
    if (piecesCount < kByBigInt) {
      minNumber = middleNumber + 1;
      continue;
    }

    if (piecesCount > kByBigInt) {
      maxNumber = middleNumber - 1;
    }
  }

  return 'NO';
}

console.log(solution(nByString, kByString));

