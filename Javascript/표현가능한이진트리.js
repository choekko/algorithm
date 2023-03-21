// https://school.programmers.co.kr/learn/courses/30/lessons/150367#

function solution(numbers) {

  // 부모 노드가 더미 노드면 자손 노드들도 더미 노드여야한다.
  // 해당 판단을 zeroFlag를 이용해서 진행한다.
  const checkIsValidBinaryTree = (binaryString, leftIdx, rightIdx, zeroFlag) => {
    const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    const middleValue = binaryString[middleIdx];

    if (middleValue === '1' && zeroFlag) return false;
    if (leftIdx === rightIdx) return true;

    const isLeftSubTreeValid = checkIsValidBinaryTree(binaryString, leftIdx, middleIdx - 1, zeroFlag || middleValue === '0');
    const isRightSubTreeValid = checkIsValidBinaryTree(binaryString, middleIdx + 1, rightIdx, zeroFlag || middleValue === '0');

    return isLeftSubTreeValid && isRightSubTreeValid;
  }
  const checkIsPossible = (number) => {
    const binaryString = number.toString(2);

    for (let rootIdx = 0; rootIdx < binaryString.length; rootIdx++) {
      const rightSectionLength = binaryString.length - rootIdx - 1;

      if (rightSectionLength * 2 + 1 < binaryString.length) break;
      if (Number.isInteger(Math.log2(rightSectionLength + 1))) {
        const paddedBinaryString = binaryString.padStart(rightSectionLength * 2 + 1, '0');

        if (checkIsValidBinaryTree(paddedBinaryString, 0, paddedBinaryString.length - 1, 0)) {
          return 1;
        }
      }
    }
    return 0;
  }
  return numbers.map(checkIsPossible);
}

solution([14555]);