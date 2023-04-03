const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const nodeInfos = input.slice(1).map(line => line.split(' '));

const solution = (nodeInfos) => {
  const nodeInfosMap = {};

  nodeInfos.forEach(([current, leftChild, rightChild]) => {
    nodeInfosMap[current] = {
      leftChild: leftChild === '.' ? null : leftChild,
      rightChild: rightChild === '.' ? null : rightChild
    }
  })

  const TRAVERSE_TYPE_TO_ORDER_MAP = {
    'PREORDER': ['current', 'left', 'right'],
    'INORDER': ['left', 'current', 'right'],
    'POSTORDER': ['left', 'right', 'current'],
  }

  const traverse = (current, type) => {
    if (!current) return '';

    const { leftChild, rightChild } = nodeInfosMap[current];
    const ingredients = {
      current,
      left: traverse(leftChild, type),
      right: traverse(rightChild, type)
    }

    return TRAVERSE_TYPE_TO_ORDER_MAP[type].map(position => ingredients[position]).join('');
  }

  Object.keys(TRAVERSE_TYPE_TO_ORDER_MAP).forEach(type => {
    console.log(traverse('A', type));
  })
}

solution(nodeInfos);