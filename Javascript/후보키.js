// https://school.programmers.co.kr/learn/courses/30/lessons/42890

const combination = (array, r) => {
  if (r === 1) return array.map(item => [item]);

  const result = [];

  array.forEach((item, idx) => {
    result.push(...combination(array.slice(idx + 1), r - 1).map(candidate => [item, ...candidate]))
  })

  return result;
}

function solution(relation) {
  const candidateKeyMap = {}; // 가능한 후보키만 넣어두는 객체
  const relationColumnCount = relation[0].length;
  const relationTupleCount = relation.length;
  const indices = Array.from({length: relationColumnCount}, (_, i) => i);

  for (let columnCount = 1; columnCount <= relationColumnCount; columnCount++) {
    const keys = combination(indices, columnCount); // key는 배열 형태로 다룸

    keyLoop: for (let key of keys) {
      for (let length = 1; length < key.length; length++) {
        const innerKeys = combination(key, length);
        const isNotMinimum = innerKeys.some(key => Boolean(candidateKeyMap[key]));

        if (isNotMinimum) continue keyLoop;
      }

      const valueMap = {};

      for (let tupleIdx = 0; tupleIdx < relationTupleCount; tupleIdx++) {
        const value = key.map(columnIdx => relation[tupleIdx][columnIdx]);

        if (valueMap[value]) continue keyLoop;

        valueMap[value] = true;
      }
      candidateKeyMap[key] = true;
    }
  }

  return Object.keys(candidateKeyMap).length;
}