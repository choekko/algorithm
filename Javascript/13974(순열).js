let fs = require('fs');
let input = fs.readFileSync('./test.txt').toString().split('\n');

const initialNumbers = Array.from({length: input[0]}, (_, i) => i + 1);

// const permutation = (numbers) => {
//   let result = [];
//   if (!numbers.length) return [[]];
//
//   numbers.forEach(number => {
//     const remainNumbers = numbers.filter(_number => _number !== number);
//     result = [...result, ...permutation(remainNumbers).map(candidate => [number, ...candidate])]
//   })
//
//   return result;
// }


function generatePermutationsLex(array) {
  const result = [array.slice()];
  const n = array.length;
  let i = n - 1;

  while (i > 0) {
    if (array[i-1] < array[i]) {
      let j = n - 1;
      while (j >= i && array[j] <= array[i-1]) {
        j--;
      }
      [array[i-1], array[j]] = [array[j], array[i-1]];
      reverse(array, i, n-1);
      result.push(array.slice());
      i = n - 1;
    } else {
      i--;
    }
  }

  return result;
}

function reverse(array, i, j) {
  while (i < j) {
    [array[i], array[j]] = [array[j], array[i]];
    i++;
    j--;
  }
}

generatePermutationsLex(initialNumbers).forEach(candidate => console.log(candidate.join(' ')));

// permutation(initialNumbers).forEach(candidate => console.log(candidate.join(' ')));