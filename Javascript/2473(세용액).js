const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const solutions = input[1].split(' ').map(Number);

// 시간 초과
// const solution = (solutions) => {
//   solutions.sort((a, b) => a - b);
//
//   let minOffset = Infinity;
//   let result;
//
//   for (let i = 0; i < solutions.length - 2; i++) {
//     for (let j = i + 1; j < solutions.length - 1; j++) {
//       const first = solutions[i];
//       const second = solutions[j];
//
//       let leftIdx = j + 1;
//       let rightIdx = solutions.length - 1;
//
//       while (leftIdx <= rightIdx) {
//         const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
//         const third = solutions[middleIdx];
//         const sum = first + second + third;
//         const offset = Math.abs(sum);
//         const candidate = [first, second, third];
//
//         if (sum === 0) {
//           return candidate.join(' ');
//         }
//
//         if (offset < minOffset) {
//           minOffset = offset;
//           result = candidate;
//         }
//
//         if (sum < 0) {
//           leftIdx = middleIdx + 1;
//         } else {
//           rightIdx = middleIdx - 1;
//         }
//       }
//     }
//   }
//
//   return result.join(' ');
// }

const solution = (solutions) => {
  solutions.sort((a, b) => a - b);

  let minOffset = Infinity;
  let result;

  for (let i = 0; i < solutions.length - 2; i++) {
    const first = solutions[i];
    let secondIdx = i + 1
    let thirdIdx = solutions.length - 1;

    while (secondIdx < thirdIdx) {
      const second = solutions[secondIdx];
      const third = solutions[thirdIdx];
      const sum = first + second + third;
      const offset = Math.abs(sum);

      if (offset < minOffset) {
        minOffset = offset;
        result = [first, second, third].join(' ');
      }

      if (sum === 0) {
        return result;
      }
      if (sum < 0) {
        secondIdx++;
      }
      if (sum > 0) {
        thirdIdx--;
      }
    }
  }

  return result;
}

console.log(solution(solutions))