const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const strings = input.slice(1);

const solution = (strings) => {

  const checkPalindrome = (string, result) => { // 0: 팰린드롬, 1: 유사 팰린드롬, 2: 그 외
    if (result >= 2) return 2;

    let leftIdx = 0;
    let rightIdx = string.length - 1;

    while (leftIdx < rightIdx && result < 2) {
      if (string[leftIdx] !== string[rightIdx]) {
        if (leftIdx + 1 >= rightIdx) {
          result++;
          break;
        }

        let tmp = Infinity;
        if (string[leftIdx + 1] === string[rightIdx]) {
          tmp = Math.min(tmp, checkPalindrome(string.slice(leftIdx + 2, rightIdx), result + 1));
        }
        if (string[rightIdx - 1] === string[leftIdx]) {
          tmp = Math.min(tmp, checkPalindrome(string.slice(leftIdx + 1, rightIdx - 1), result + 1));
        }

        if (tmp !== Infinity) {
          return tmp;
        }
        result = 2;
        break;
      }
      leftIdx++;
      rightIdx--;
    }

    return result;
  }

  return strings.map(string => checkPalindrome(string, 0)).join('\n');
}

console.log(solution(strings));