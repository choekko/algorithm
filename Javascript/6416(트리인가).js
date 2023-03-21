const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const treeCases = [];

let treeCase = {}; // { 노드 번호 : [진입 차수, 진출 노드들] }
input.forEach(line => {
  if (!line || line === '-1 -1') return;

  const edges = line.split('  ').map(edge => edge.split(' ').map(Number));
  edges.forEach(edge => {
    const [start, end] = edge;
    if (start === 0 && end === 0) {
      treeCases.push(treeCase);
      treeCase = {};
      return;
    }

    if (treeCase[start]) {
      treeCase[start][1].push(end);
    } else {
      treeCase[start] = [0, [end]];
    }

    if (treeCase[end]) {
      treeCase[end][0]++;
    } else {
      treeCase[end] = [1, []];
    }
  })
})

const solution = (treeCases) => {
  const isUCountInvalid = (treeCase) => {
    let rootCount = 0;
    let flag = 0;
    Object.entries(treeCase).forEach(([number, [uCount]]) => {
      if (uCount === 0) {
        rootCount++;
        treeCase['root'] = number; // Side Effect 유의. isTraversalImpossible 에서 쓰고 사라질 친구
      }
      if (uCount > 1) flag = 1;
    })
    return flag || rootCount !== 1;
  }

  const isTraversalImpossible = (treeCase) => {
    const root = treeCase['root']; // isUCountInvalid를 통과한 친구는 root 값이 표기되어있다.
    delete treeCase['root'];

    const numbersByString = Object.keys(treeCase);
    const visitInfo = {};

    const stack = [root];

    while (stack.length) {
      const current = stack.pop();
      visitInfo[current] = true;

      treeCase[current][1].forEach(number => {
        stack.push(number);
      })
    }

    return numbersByString.some(number => !visitInfo[number]);
  }

  const validateTreeCase = (treeCase) => {
    if (!Object.keys(treeCase).length) return true; // 노드가 없어도 트리로 취급해야한다.

    return !isUCountInvalid(treeCase) && !isTraversalImpossible(treeCase);
  }

  const result = [];

  treeCases.forEach((treeCase, idx) => {
    const label = `Case ${idx + 1} is ${validateTreeCase(treeCase) ? '' : 'not ' }a tree.`
    result.push(label);
  })

  return result.join('\n');
}

console.log(solution(treeCases));

