const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [numberCount, divider] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const solution = (numbers, numberCount, divider) => {
  const prefixSums = Array(numberCount).fill(0);
  const remainCount = {};
  prefixSums[0] = numbers[0];
  remainCount[numbers[0] % divider] = 1; // remain 당 index count

  for (let i = 1; i < numberCount; i++) {
    const value = numbers[i];
    prefixSums[i] = prefixSums[i - 1] + value;

    const remain = prefixSums[i] % divider;

    if (remainCount[remain]) {
      remainCount[remain] += 1;
    } else {
      remainCount[remain] = 1;
    }
  }

  let result = remainCount[0] ?? 0; // remain === 0 이면 해당 index의 누적합은 나누어 떨어짐

  Object.values(remainCount).forEach(count => { // remain이 같은 index 두 개를 잡는 조합 수 구하기
    result += count * (count - 1) / 2;
  })

  return result;
}

console.log(solution(numbers, numberCount, divider))



// 7