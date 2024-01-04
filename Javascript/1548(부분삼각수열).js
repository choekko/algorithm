const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const numbers = input[1].split(' ').map(Number);

const solution = (numbers) => {
  if (numbers.length <= 2) {
    return numbers.length
  }

  numbers.sort((a, b) => a - b);

  let result = 0;

  for (let last = numbers.length - 1; last >= 0; last--) {
    const count = last + 1;

    if (count <= result) return result;

    // 예제를 보면 1, 2, 3 입력이 들어왔을 때 답이 2이다..
    // 즉, 한 개, 두 개로 이루어진 수열도 부분 삼각수열을 만족하는 수열이다.
    // 이에 따라 for문의 범위를 잘 생각해봐야한다.
    for (let i = 0; i < numbers.length; i++) {
      const _count = count - i;

      for (let j = i + 1; j < numbers.length; j++) {
        const __count = _count - (j - i - 1);

        if (numbers[i] + numbers[j] > numbers[last]) {
          result = Math.max(result, __count);
        }
      }
    }
  }

  return result;
}

console.log(solution(numbers));