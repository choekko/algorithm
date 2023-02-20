let fs = require('fs');
let input = fs.readFileSync('./test.txt').toString().split('\n');

let graph;
let checkingArray;

input.forEach((line, idx) => {
  const [end, start] = line.split(' ');
  if (idx === 0) {
    const computerAmount = Number(end);
    checkingArray = Array.from({length: computerAmount + 1}).fill(false);
    graph = checkingArray.map(() => []);
    return;
  }
  graph[start].push(end);
})

let currentMax = 0;
let result = [];

console.log(graph)

graph.forEach((endList, number) => {
  if (!number || checkingArray[number]) return;
  
  checkingArray[number] = true;
  let watingStack = endList.map(end => [end, 1]);
  console.log(watingStack)

  while (watingStack.length) {
    const [next, count] = watingStack.pop();
    console.log()
    if (checkingArray[next]) {
      if (count > currentMax) {
        currentMax = count;
        result = [number];
        console.log(number, '-----')
        continue;
      }
      if (count === currentMax) {
        result.push(number);
        continue;
      }
    }

    checkingArray[next] = true;
    watingStack = watingStack.concat(graph[next].map(end => [end, count + 1]));
  }
})

console.log(result.join(' '))