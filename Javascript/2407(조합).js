let fs = require('fs');
let input = fs.readFileSync('./test.txt').toString().split('\n');

const [m, n] = input[0].split(' ').map(Number);

// class Combination {
//   constructor(iterable, r) {
//     this.pool = [...iterable];
//     this.r = r;
//     this.indices = [...Array(r).keys()];
//     this.finished = false;
//   }
//
//   getNext() {
//     if (this.finished) return null;
//
//     const result = this.indices.map(i => this.pool[i]);
//     let i = this.r - 1;
//
//     while (i >= 0 && this.indices[i] === this.pool.length - this.r + i) {
//       i--;
//     }
//
//     if (i < 0) {
//       this.finished = true;
//       return null;
//     }
//
//     this.indices[i]++;
//     for (let j = i + 1; j < this.r; j++) {
//       this.indices[j] = this.indices[j - 1] + 1;
//     }
//
//     return result;
//   }
// }

function* generateCombinations(n, r) {
  const combination = [...Array(r).keys()];

  while (true) {
    yield combination;

    let i = r - 1;
    while (i >= 0 && combination[i] == n - r + i) {
      i--;
    }
    if (i < 0) {
      return;
    }

    combination[i]++;
    for (let j = i + 1; j < r; j++) {
      combination[j] = combination[j - 1] + 1;
    }
  }
}

const iterable = Array.from({length: m}, (_, i) => i + 1);
const r = n;
const combinations = generateCombinations(iterable.length, r);

for (const combination of combinations) {
  const values = combination.map((index) => iterable[index]);
  console.log(values.join(' '));
}