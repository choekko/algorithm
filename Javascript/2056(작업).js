const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const infos = input.slice(1).map((line) => {
  const [cost, _, ...prerequisites] = line.split(' ').map(Number);

  return { cost, prerequisites: prerequisites?.map(value => value - 1) ?? [], startTime: 0 };
})

const solution = (infos) => {
  for (let i = 0; i < infos.length; i++) {
    const { prerequisites } = infos[i];

    prerequisites.forEach(prerequisite => {
      if (infos[prerequisite].outerNodes) {
        infos[prerequisite].outerNodes.push(i);
        return;
      }
      infos[prerequisite].outerNodes = [i]
    })

    infos[i].inDegree = prerequisites.length;
  }

  let allCost = 0;

  let stack = [];
  let maxEndTime = 0;
  while (true) {
    infos.forEach((info) => {
      if (!info.inDegree) {
        stack.push(info);
      }
    })

    if (!stack.length) break;

    while (stack.length) {
      const info  = stack.pop();
      const endTime = info.startTime + info.cost;
      maxEndTime = Math.max(maxEndTime, endTime);
      
      info.outerNodes?.forEach(node => {
        infos[node].inDegree -= 1;
        infos[node].startTime = Math.max(infos[node].startTime, endTime);
      })

      info.inDegree -= 1;
    }
  }

  return maxEndTime;
}

console.log(solution(infos))

