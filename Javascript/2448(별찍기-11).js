const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const size = Number(input[0]);

const solution = (size) => {
  const lastLineLength = size / 3 * 5 + (size / 3 - 1)
  const result = [];

  const makeLine = (starIndices) => {
    return Array.from({ length: lastLineLength }, (_, idx) => {
      if (starIndices.includes(idx)) return '*'
      return ' '
    }).join('');
  }
  
  let line = makeLine([Math.floor(lastLineLength / 2)]);
  result.push(line);

  let prevLine = line;
  let count = 1;

  const stage1 = () => {
    // 이전 라인의 별 다섯개 묶음이 쭉 연결되어있으면, 양쪽 끝에서만 별을 발생시키자
    let starIndices = [];
    prevLine.replaceAll('*****',  (_, offset) => {
      starIndices.push(...[offset - 1, offset + 5]);
      return '';
    })

    const indicesForDeleting = [];
    const idxCountMap = {};

    starIndices.forEach((idx) => {
      if (idxCountMap[idx]) {
        idxCountMap[idx] += 1;
        return;
      }
      idxCountMap[idx] = 1;
    })

    Object.entries(idxCountMap).forEach(([idx, count]) => {
      if (count >= 2) {
        indicesForDeleting.push(Number(idx));
      }
    })

    starIndices = starIndices.filter(idx => !indicesForDeleting.includes(idx));

    const line = makeLine(starIndices);
    prevLine = line;
    result.push(line);
  }

  const stage2 = () => {
    const line = prevLine.replaceAll(' * ', '* *');
    prevLine = line;
    result.push(line);
  }

  const stage3 = () => {
    const line = prevLine.replaceAll(' * * ', '*****');
    prevLine = line;
    result.push(line);
  }

  const REMAIN_TO_FUNCTION = {
    0: stage1,
    1: stage2,
    2: stage3,
  }

  while (count < size) {
    REMAIN_TO_FUNCTION[count % 3]();
    count++;
  }

  return result.join('\n');
}

console.log(solution(size));