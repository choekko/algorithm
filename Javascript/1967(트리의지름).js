const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodeCount = Number(input[0]);
const edges = input.slice(1).map(line => {
  const [parent, child, cost] = line.split(' ').map(Number);

  return { parent, child, cost }
})

const solution = (nodeCount, edges) => {
  const graphInfo = Array.from({ length: nodeCount + 1 }, () => ({ parent: 0, outerDegree: 0, diameter: 0, maxLength: 0 }))  // maxLength는 양쪽 child 로부터 올라온 길이중 최대
  const costMap = edges.reduce((acc, { parent, child, cost }) =>  (acc[[parent,child]] = cost, acc), {})

  for (const { parent, child } of edges) {
    graphInfo[parent].outerDegree++;
    graphInfo[child].parent = parent;
  }

  let bucket = [];

  while (true) {
    graphInfo.forEach(({ outerDegree}, idx) => {
      if (!outerDegree && idx > 1) {
        bucket.push(idx);
      }
    })

    if (!bucket.length) break;

    while (bucket.length) {
      const node = bucket.pop();
      const parent = graphInfo[node].parent;
      graphInfo[parent].maxLength = Math.max(graphInfo[node].maxLength + costMap[[parent, node]], graphInfo[parent].diameter);
      graphInfo[parent].diameter += graphInfo[node].maxLength + costMap[[parent, node]];
      graphInfo[parent].outerDegree--;
      graphInfo[node].outerDegree = -1;
    }
  }

  return Math.max(...graphInfo.map(({ diameter }) => diameter));

}

console.log(solution(nodeCount, edges));

