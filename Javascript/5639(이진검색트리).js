const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodes = input.map(Number);

const solution = (nodes) => {
  const result = [];

  const traverse = (nodes) => {
    const root = nodes[0];
    const leftChildIdx = nodes.findIndex(node => node < root);
    const rightChildIdx = nodes.findIndex(node => node > root);

    const leftSubTree = leftChildIdx === -1
      ? null
      : nodes.slice(leftChildIdx, rightChildIdx === -1 ? nodes.length : rightChildIdx);
    const rightSubTree = rightChildIdx === -1
      ? null
      : nodes.slice(rightChildIdx, nodes.length);

    leftSubTree && traverse(leftSubTree);
    rightSubTree && traverse(rightSubTree);
    result.push(root);
  }

  traverse(nodes);

  return result.join('\n');
}

console.log(solution(nodes))


// 메모리 초과 코드
// const solution = (nodes) => {
//   const getTree = (nodes) => {
//     let bucket = [{ node: nodes[0], section: [1, nodes.length - 1]}];
//     const tree = [];
//     let bucketTemp = [];
//
//     while (bucket.length) {
//       for (const { node, section: [startIdx, endIdx] } of bucket) {
//         tree.push(node);
//
//         let leftChild = null;
//         let leftChildSection = [-1, -2];
//         let rightChild = null;
//         let rightChildSection = [-1, -2];
//
//         if (startIdx <= endIdx) {
//           for (let i = startIdx; i <= endIdx; i++) {
//             const targetNode = nodes[i];
//             if (targetNode > node) {
//               rightChild = targetNode;
//               leftChildSection = [startIdx + 1, i - 1];
//               rightChildSection = [i + 1, endIdx];
//               break;
//             }
//           }
//
//           if ((nodes[startIdx]) < node) {
//             leftChild = nodes[startIdx];
//
//             if (!rightChild) {
//               leftChildSection = [startIdx + 1, endIdx];
//             }
//           }
//         }
//
//         bucketTemp.push({ node: leftChild, section: leftChildSection });
//         bucketTemp.push({ node: rightChild, section: rightChildSection });
//       }
//
//       if (!bucketTemp.filter(item => item.node).length) {
//         while (!tree[tree.length - 1]) {
//           tree.pop();
//         }
//         return tree;
//       }
//
//       bucket = bucketTemp;
//       bucketTemp = [];
//     }
//   }
//
//
//   const traverseWithPostOrder = (tree, idx, result) => {
//     if (idx >= tree.length) return;
//
//     traverseWithPostOrder(tree, idx * 2 + 1, result);
//     traverseWithPostOrder(tree, idx * 2 + 2, result)
//     if (tree[idx]) {
//       result.push(tree[idx]);
//     }
//   }
//   const result = [];
//   const tree = getTree(nodes);
//   traverseWithPostOrder(tree, 0, result);
//
//   return result.join('\n');
// }
//
// console.log(solution(nodes))