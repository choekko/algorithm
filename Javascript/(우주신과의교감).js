const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [alienCount] = input[0].split(' ').map(Number);
const alienPositions = input.slice(1, 1 + alienCount).map(line => {
  const [x, y] = line.split(' ').map(Number);
  return { x, y }
})
const alreadyLinkedLinks = input.slice(1 + alienCount).map(line => line.split(' ').map(node => Number(node) - 1));

const solution = (alienPositions, alreadyLinkedLinks) => {
  const getDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  const links = [];
  for (let i = 0; i < alienPositions.length; i++) {
    for (let j = i + 1; j < alienPositions.length; j++) {
      const cost = alreadyLinkedLinks.some((link) => link.includes(i) && link.includes(j)) ? 0 :getDistance(alienPositions[i], alienPositions[j]);
      links.push({ node1: i, node2: j, cost })
    }
  }

  links.sort((a, b) => a.cost - b.cost);

  const roots = Array.from( { length: alienPositions.length }, (_, idx) => idx);
  const ranks = Array.from({ length: alienPositions.length }, () => 0);
  const getRoot = (node) => {
    if (roots[node] === node) return node;

    return roots[node] = getRoot(roots[node]);
  }

  const union = (node1, node2) => {
    const root1 = getRoot(node1);
    const root2 = getRoot(node2);

    if (root1 === root2) return false;

    if (ranks[root1] === ranks[root2]) {
      ranks[root1]++
    }

    const [smaller, bigger] = [root1, root2].sort((a, b) => ranks[a] - ranks[b])
    roots[bigger] = smaller

    return true;
  }

  let result = 0;

  links.forEach(({ node1, node2, cost }) => {
    const isLinked = union(node1, node2);

    if (isLinked) {
      result += cost
    }
  })

  return result.toFixed(2);
}

console.log(solution(alienPositions, alreadyLinkedLinks))

