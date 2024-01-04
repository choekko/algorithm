const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const input = [];
rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const [setCount, commandCount] = input[0].trim().split(' ').map(Number);
  const commands = [];

  for (let i = 1; i <= commandCount; i++) {
    const [ type, number1, number2 ] = input[i].trim().split(' ').map(Number);
    commands.push({ type, number1, number2 });
  }

  console.log(solution(setCount, commands));
  process.exit();
});

const solution = (setCount, commands) => {
  const setParents = Array(setCount + 1).fill(0).map((_, idx) => idx);

  const union = (parent1, parent2) => {
    if (parent1 < parent2) {
      setParents[parent2] = parent1;
      return;
    }
    setParents[parent1] = parent2;
  }


  const findParent = (node) => {
    if (setParents[node] === node) return node;
    setParents[node] = findParent(setParents[node]);

    return setParents[node];
  }

  const result = [];

  commands.forEach(({ type, number1, number2 }) => {
    const parent1 = findParent(number1);
    const parent2 = findParent(number2);
    if (type === 1) {
      result.push(parent1 === parent2 ? 'YES' : 'NO');
      return;
    }
    union(parent1, parent2);
  })

  return result.join('\n');
}