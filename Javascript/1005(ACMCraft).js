const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const testCasesLength = Number(input[0]);
const testCases = [];

for (let i = 1;;) {
  const [buildingCount, ruleCount] = input[i].split(' ').map(Number);
  const nodeInfos = Array(buildingCount + 1).fill(null).map(() => ({ enteredNodes: [], time: 0 }));
  input[i + 1].split(' ').map(Number).forEach((time, idx) => { nodeInfos[idx + 1].time = time });

  for (let j = i + 2; j < i + 2 + ruleCount; j++) {
    const [base, target] = input[j].split(' ').map(Number);
    nodeInfos[target].enteredNodes.push(base);
  }
  testCases.push({ nodeInfos, buildingForSuccess: Number(input[i + 2 + ruleCount]) });
  if (testCases.length >= testCasesLength) break;
  i += ruleCount + 3;
}

const solution = (testCases) => {
  const allTimeMemoMap = Array(testCases.length).fill(null).map(() => ({}));

  const getMinTime = (testCase, testCaseIdx) => {
    const { nodeInfos, buildingForSuccess } = testCase;

    return getTime(nodeInfos, buildingForSuccess, testCaseIdx);
  }

  const getTime = (nodeInfos, buildingForSuccess, testCaseIdx) => {
    // 초기에 재귀로 구성하였으나 시간초과 났음

    const { enteredNodes, time } = nodeInfos[buildingForSuccess]

    const stack = enteredNodes.map(node => [buildingForSuccess, node]);

    while (stack.length) {
      const [parentNode, currentNode] = stack[stack.length - 1];
      const {enteredNodes, time: currentNodeAloneTime} = nodeInfos[currentNode]

      if (enteredNodes.length && allTimeMemoMap[testCaseIdx][currentNode] === undefined) {
        stack.push(...enteredNodes.map(node => [currentNode, node]));
        continue;
      }

      const parentNodeAloneTime = nodeInfos[parentNode].time;
      let currentNodeAllTime;
      if (!enteredNodes.length) {
        currentNodeAllTime = currentNodeAloneTime;
      } else {
        currentNodeAllTime = allTimeMemoMap[testCaseIdx][currentNode];
      }
      allTimeMemoMap[testCaseIdx][parentNode] = Math.max(allTimeMemoMap[testCaseIdx][parentNode] ?? -Infinity, parentNodeAloneTime + currentNodeAllTime);
      stack.pop();
    }

    return allTimeMemoMap[testCaseIdx][buildingForSuccess] ?? time;
  }

  return testCases.map(getMinTime).join('\n');
}

console.log(solution(testCases));

