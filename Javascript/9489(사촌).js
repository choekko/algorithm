const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const testCases = [];

for (let i = 0;; i += 2) {
  if (input[i] === '0 0') break;

  const [nodeCount, target] = input[i].split(' ').map(Number);
  const nodes = input[i + 1].split(' ').map(Number);

  testCases.push({ nodeCount, target, nodes });
}


class Node {
  value;
  cousinsCount;
  children;
  depth;
  constructor(value, depth) {
    this.value = value;
    this.depth = depth;
    this.children = [];
    this.cousinsCount = 0;
  }

  addChildren(nodes) {
    this.children = nodes;
  }

  setCousinsCount(cousinsCount) {
    this.cousinsCount = cousinsCount;
  }
}
const solution = (testCases) => {
  const getCousinsCount = ({ nodeCount, nodes, target }) => {

    const rootNode = new Node(nodes[0], 0);
    let bucket = [[rootNode]]
    let i = 1;
    let targetNode = rootNode.value === target ? rootNode : null;

    while (true) {
      let childrenBucket = [];

      for (const parentSiblings of bucket) {
        if (i >= nodeCount) break;

        let allChildrenCount = 0;

        for (const currentNode of parentSiblings) {
          const children = [];

          let prevValue = null;

          while (true) {
            if ((prevValue === null) || (prevValue + 1 === nodes[i])) {
              const child = new Node(nodes[i], currentNode.depth + 1);
              children.push(child);
              prevValue = nodes[i];
              i++;

              if (child.value === target) {
                targetNode = child;
              }
              continue;
            }
            break;
          }

          if (children.length) {
            currentNode.addChildren(children);
            childrenBucket.push(children);
            allChildrenCount += children.length;
            continue;
          }

          break;
        }

        for (const currentNode of parentSiblings) {
          for (const child of currentNode.children) {
            child.setCousinsCount(allChildrenCount - currentNode.children.length);
          }
        }
      }

      if (childrenBucket.length) {
        bucket = childrenBucket;
        continue;
      }

      break;
    }

    return targetNode.cousinsCount;
    // return rootNode
  }

  return testCases.map(getCousinsCount).join('\n');
  // return getCousinsCount(testCases[0]);
}


console.log(solution(testCases))
