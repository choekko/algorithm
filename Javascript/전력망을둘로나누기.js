// https://school.programmers.co.kr/learn/courses/30/lessons/86971

function solution(n, wires) {
  const nodeInfos = Array(n + 1).fill(null).map(() => ({ outerNodes: [] }));

  wires.forEach(([node1, node2]) => {
    nodeInfos[node1].outerNodes.push(node2);
    nodeInfos[node2].outerNodes.push(node1);
  })

  const getLinkedNodesCount = (rootNode, anotherRootNode) => {
    const stack = [rootNode];
    const checkingArray = Array(n + 1).fill(false);

    let count = 0;

    while (stack.length) {
      const currentNode = stack.pop();
      count += 1;
      checkingArray[currentNode] = true;

      nodeInfos[currentNode].outerNodes.forEach(node => {
        const isNotLinked = currentNode === rootNode && node === anotherRootNode
        if (checkingArray[node] || isNotLinked) return;
        stack.push(node);
      })
    }
    return count;
  }

  let result = Infinity
  wires.forEach(([root1, root2]) => { // 하나씩 끊어서 테스트

    const difference = Math.abs(getLinkedNodesCount(root1, root2) - getLinkedNodesCount(root2, root1));
    result = Math.min(result, difference);
  })

  return result;
}