const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [numberCount, sectionCount] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const solution = (numberCount, targetSectionCount, numbers) => {
    let left = 0;
    let right = Math.max(...numbers);
    let mid;

    while (true) {
      if (left > right) break;
      mid = Math.floor((left + right) / 2);

      let sectionCount = 1;
      let minNumber = Infinity;
      let maxNumber = -Infinity;

      for (let number of numbers) {
        if (number < minNumber) {
          minNumber = number;
        }
        if (number > maxNumber) {
          maxNumber = number;
        }

        if (maxNumber - minNumber > mid) {
          sectionCount += 1;
          minNumber = number;
          maxNumber = number;
        }
      }


      if (sectionCount <= targetSectionCount) { // 이 경우라면 현재의 mid가 답일 수도 있고 아닐 수도 있다.
        right -= 1;
      } else { // 이 경우라면 현재의 mid가 전혀 답일 수 없다
        left += 1;
      }
      // 결국 right 와 left를 계속 조절해나가면, 답일 수 밖에 없는 mid를 만드는 것이다.
      // 뭔가 당연한 얘기를 써둔 것 같지만.. 다시 풀다보면 왜 써놨는지 이해가 될 것이다.
    }

    return mid;
}

console.log(solution(numberCount, sectionCount, numbers));