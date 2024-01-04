const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [nodeCount, edgeCount] = input[0].split(' ').map(Number);

const edges = [];

for (let i = 1; i < edgeCount + 1; i++) {
  edges.push(input[i].split(' ').map(Number));
}

const solution = (nodeCount, edges) => {
  const linkedInfos = Array(nodeCount + 1).fill(0).map(() => []);

  for (const [node1, node2] of edges) {
    linkedInfos[node1].push(node2);
    linkedInfos[node2].push(node1);
  }

  const traverse = (targetChickenHouse, otherChickenHouse, costs) => {
    const checkingArray = Array(nodeCount + 1).fill(false);
    let bucket = [...linkedInfos[targetChickenHouse]];
    let tmp = [];
    let distance = 1;

    while (bucket.length) {
      const nextNode = bucket.pop();

      if (!checkingArray[nextNode] && ![targetChickenHouse, otherChickenHouse].includes(nextNode)) {
        checkingArray[nextNode] = true;
        tmp.push(...linkedInfos[nextNode]);
        costs[nextNode] = Math.min(costs[nextNode], distance);
      }

      if (!bucket.length && tmp.length) {
        bucket = tmp;
        tmp = [];
        distance += 1;
      }
    }
  }

  let result = {
    chickenHouse1: null,
    chickenHouse2: null,
    minCost: Infinity,
  }


  for (let chickenHouse1 = 1; chickenHouse1 <= nodeCount; chickenHouse1++) {
    for (let chickenHouse2 = chickenHouse1 + 1; chickenHouse2 <= nodeCount; chickenHouse2++) {
      const costs = Array(nodeCount + 1).fill(Infinity);
      costs[0] = 0;
      costs[chickenHouse1] = 0;
      costs[chickenHouse2] = 0;
      traverse(chickenHouse1, chickenHouse2, costs);
      traverse(chickenHouse2, chickenHouse1, costs);
      const sum = costs.reduce((acc, curr) => acc + curr, 0) * 2; // 왕복 계산

      if (result.minCost > sum) {
        result = {
          chickenHouse1,
          chickenHouse2,
          minCost: sum,
        }
      }
    }
  }

  return Object.values(result).join(' ');
}

console.log(solution(nodeCount, edges));
