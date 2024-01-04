const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const populations = input[1].trim().split(' ').map(Number);
const linksPerNode = input.slice(2).map(line => line.trim().split(' ').map(pairNode => pairNode - 1).slice(1)); // 1부터 시작하므로
const combination = (array, r) => {
  if (r === 1) return array.map(value => [value]);

  const result = [];
  array.forEach((value, idx) => {
    const candidates = combination(array.slice(idx + 1), r - 1).map(candidate => [value, ...candidate])
    result.push(...candidates);
  })

  return result;
}

const solution = (populations, linksPerNode) => {
  const checkIsLinked = (section) => {
    const roots = {};
    section.forEach(node => roots[node] = node);

    const getRoot = (node) => {
      const root = roots[node];
      if (root === node) return root;

      return roots[node] = getRoot(root);
    }

    const union = (node1, node2) => {
      if (roots[node1] === undefined || roots[node2] === undefined) return;
      const root1 = getRoot(node1);
      const root2 = getRoot(node2);

      if (root1 === root2) return;

      const [smaller, bigger] = [node1, node2].sort(() => root2 - root1);
      roots[roots[bigger]] = roots[smaller];
    }

    section.forEach(node => linksPerNode[node]
      .filter(pairNode => section.includes(pairNode))
      .forEach(pairNode => {
        union(node, pairNode);
      })
    )

    section.forEach(node => getRoot(node)); // 43% 에서 계속 틀리다가, 이 부분과 같이 union 모두 완료 후 roots 재정리를 진행하니 통과

    const set = new Set(Object.values(roots));

    return set.size === 1
  }

  let result = Infinity;
  const nodes = Array.from({ length: populations.length }, (_, i) => i)
  for (let r = 1; r <= Math.floor(populations.length / 2); r++) {
    const firstSectionNodesCandidates = combination(nodes, r);

    for (const firstSectionNodes of firstSectionNodesCandidates) {
      const firstSection = firstSectionNodes;
      const secondSection = nodes.filter(node => !firstSectionNodes.includes(node));

      if (checkIsLinked(firstSection) && checkIsLinked(secondSection)) {
        const firstSectionPopulation = firstSection.reduce((acc, curr) => acc + populations[curr], 0);
        const secondSectionPopulation = secondSection.reduce((acc, curr) => acc + populations[curr], 0);
        result = Math.min(result, Math.abs(firstSectionPopulation - secondSectionPopulation));
      }
    }
  }

  return result === Infinity ? -1 : result;
}

console.log(solution(populations, linksPerNode))
