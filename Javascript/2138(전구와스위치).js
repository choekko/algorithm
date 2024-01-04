const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [source, target] = input.slice(1);

const solution = (_source, _target) => {
  let source = [..._source].map(Number);
  const target = [..._target].map(Number);

  const traverse = (source, target) => {
    let count = 0;
    for (let i = 1; i < source.length; i++) {
      if (target[i - 1] !== source[i - 1]) {
        for (let j = i - 1; j <= i + 1; j++) {
          if (source[j] === undefined) break;
          source[j] = Number(!source[j]);
        }
        count++;
      }
    }

    if (source.join('') === target.join('')) return count;
    else return Infinity;
  }

  const countWhenFirstBulbNonClicked = traverse(source, target);

  source = [..._source].map(Number);
  [0, 1].forEach(idx => source[idx] = Number(!source[idx]));
  const countWhenFirstBulbClicked = traverse(source, target) + 1;

  const minCount = Math.min(countWhenFirstBulbNonClicked, countWhenFirstBulbClicked);

  return minCount === Infinity ? -1 : minCount;
}

console.log(solution(source, target));