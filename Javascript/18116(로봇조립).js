const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const _queries = input.slice(1).map(line => line.split(' '));
const queries = [];
const iQuerySet = new Set();
for (const query of _queries) {
  if (query[0] === 'I' && iQuerySet.has(query.join(''))) {
    continue;
  }

  if (query[0] === 'I') {
    iQuerySet.add(query.join(''));
  }

  queries.push([query[0], Number(query[1]),  ...(query[2] ? [Number(query[2])] : [])])
}
const solution = (queries) => {

  const rootInfos = Array.from({length: 10 ** 6 + 1}, (_, idx) => ({ root: idx, count: 1 }));
  const ranks = Array.from({ length: 10 ** 7 }, () => 1)

  const getRootInfo = (nbr) => {
    const rootInfo = rootInfos[nbr];

    if (rootInfo.root === nbr) return rootInfo;
    rootInfo.root = getRootInfo(rootInfo.root).root;
    return rootInfos[rootInfo.root];
  }

  const union = (nbr1, nbr2) => {
    const root1 = getRootInfo(nbr1).root;
    const root2 = getRootInfo(nbr2).root;

    if (root1 === root2) return;

    const bigger = ranks[root1] < ranks[root2] ? root2 : root1;
    const smaller = bigger === root1 ? root2 : root1;

    rootInfos[bigger].root = smaller;
    ranks[smaller] += ranks[bigger];
    rootInfos[smaller].count += rootInfos[bigger].count;
  }

  const result = [];

  queries.forEach(([type, component1, component2]) => {
    if (type === 'I') {
      union(component1, component2);
      return;
    }
    if (type === 'Q') {
      result.push(getRootInfo(component1).count);
    }
  })

  return result.join('\n');
}

console.log(solution(queries));