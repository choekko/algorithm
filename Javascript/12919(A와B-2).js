const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const [source, target] = input;

const solution = (source, target) => {
  // target에서 거꾸로 롤백하면서 source가 나타나는지 확인하기

  const traverse = (target) => {
    if (target === '') return false;
    if (target === source) return true;

    const lastChar = target[target.length - 1];
    const firstChar = target[0];

    if (lastChar === 'A' && firstChar === 'A') {
      return traverse(target.slice(0, target.length - 1));
    }
    if (lastChar === 'A' && firstChar === 'B') {
      return traverse(target.slice(0, target.length - 1)) || traverse(target.slice(1, target.length).split('').reverse().join(''));
    }
    if (lastChar === 'B' && firstChar === 'A') {
      return false;
    }
    return traverse(target.slice(1, target.length).split('').reverse().join(''));
  }

  return traverse(target) ? 1 : 0;
}

console.log(solution(source, target));