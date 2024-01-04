const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [sourceAsString, targetAsString] = input.slice(0, 2);

const solution = (sourceAsString, targetAsString) => {
  const source = [...sourceAsString];
  const target = [...targetAsString];
  const reversedSource = [...source].reverse();
  const reversedTarget = [...target].reverse();

  let i = 0;

  const bucket = [];

  while (true) {
    const targetChar = reversedTarget[i];
    const sourceChar = reversedSource[i];

    if (!sourceChar) break;

    if (targetChar === sourceChar) {
      i++;
      continue;
    }

    bucket.push(reversedSource.splice(i, 1));
  }

  if (bucket.sort().join('') === reversedTarget.slice(i).sort().join('')) {
    return bucket.length;
  }

  return -1;
}

console.log(solution(sourceAsString, targetAsString))


// CBABAABA -> BCBABAAA -> BBCBAAAA -> ABBCBAAA
// ABBCBAAA