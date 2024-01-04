
// 기존 풀이

function solution(n) {
  if (n == 1) {
    return '1';
  }
  if (n == 2) {
    return '2';
  }
  if (n == 3) {
    return '4';
  }
  if (n > 3) {
    var tmp = Math.floor((n - 1) / 3);
    return solution(tmp) + solution((n - 1) % 3 + 1)
  }
}

// 너무 심오한 방법으로 푼 것 같다.. -> 문제를 잘못 봄, 0부터 시작하는 줄 알았다.
const solution = (number) => {
  const REMAIN_MAP = {
    0: 1,
    1: 2,
    2: 4,
  }

  let prevChangedNumber = 0; // 124 숫자 표현시 자릿수가 달라지기 시작하는 십진법 숫자들 중 number 보다 작은 값 (ex) 0, 3, 3 + 3 ** 2, 3 + 3 ** 3
  let lastSquareNumber = 1;
  let offset = 0;

  while (true) {
    const nextPrevChangedNumber = prevChangedNumber + 3 ** lastSquareNumber;

    if (nextPrevChangedNumber > number) {
      offset = number - prevChangedNumber;
      lastSquareNumber -= 1;
      break;
    }
    prevChangedNumber = nextPrevChangedNumber;
    lastSquareNumber++;
  }

  // 여기에 도달하면 number === 14 (3 + 3 ** 2 + 2) 를 기준으로 다음과 같은 값을 얻는다.
  // lastSquareNumber = 2
  // prevChangedNumber = 12
  // offset = 2; -> 이 친구는 prevChangedNumber 로부터 떨어진 간격을 의미한다.

  const baseString = '1'.repeat(lastSquareNumber + 1); // prevChangedNumber를 124 숫자로 바꿔준다. (자릿수가 달라지기 시작하는 숫자들은 '1' 로만 구성되어있다.)
  let replacement = '';

  while (offset) { // offset으로 3으로 지속적으로 나누면서 생긴 나머지들을 124 숫자로 바꿔서 replacement 앞에 계속 붙여준다. 단, 0은 나누지 않는다.
    replacement = REMAIN_MAP[offset % 3] + replacement;
    offset = Math.floor(offset / 3);
  }

  // 여기에 도달하면 offset === 2를 기준으로 replacement = 4 가 된다.
  // 이제, baseString 을 뒤에서부터 replacement 로 대체한다. (replacement도 뒷값부터)

  const baseStringArray = [...baseString];
  baseStringArray.splice(baseString.length - replacement.length, replacement.length, ...replacement);

  return Number(baseStringArray.join(''));
}

console.log(solution(14)) // 114
const solution = (number) => {
  const REMAIN_MAP = {
    0: 1,
    1: 2,
    2: 4,
  }

  let prevChangedNumber = 0; // 124 숫자 표현시 자릿수가 달라지기 시작하는 십진법 숫자들 중 number 보다 작은 값 (ex) 0, 3, 3 + 3 ** 2, 3 + 3 ** 3
  let lastSquareNumber = 1;
  let offset = 0;

  while (true) {
    const nextPrevChangedNumber = prevChangedNumber + 3 ** lastSquareNumber;

    if (nextPrevChangedNumber > number) {
      offset = number - prevChangedNumber;
      lastSquareNumber -= 1;
      break;
    }
    prevChangedNumber = nextPrevChangedNumber;
    lastSquareNumber++;
  }

  // 여기에 도달하면 number === 14 (3 + 3 ** 2 + 2) 를 기준으로 다음과 같은 값을 얻는다.
  // lastSquareNumber = 2
  // prevChangedNumber = 12
  // offset = 2; -> 이 친구는 prevChangedNumber 로부터 떨어진 간격을 의미한다.

  const baseString = '1'.repeat(lastSquareNumber + 1); // prevChangedNumber를 124 숫자로 바꿔준다. (자릿수가 달라지기 시작하는 숫자들은 '1' 로만 구성되어있다.)
  let replacement = '';

  while (offset) { // offset으로 3으로 지속적으로 나누면서 생긴 나머지들을 124 숫자로 바꿔서 replacement 앞에 계속 붙여준다. 단, 0은 나누지 않는다.
    replacement = REMAIN_MAP[offset % 3] + replacement;
    offset = Math.floor(offset / 3);
  }

  // 여기에 도달하면 offset === 2를 기준으로 replacement = 4 가 된다.
  // 이제, baseString 을 뒤에서부터 replacement 로 대체한다. (replacement도 뒷값부터)

  const baseStringArray = [...baseString];
  baseStringArray.splice(baseString.length - replacement.length, replacement.length, ...replacement);

  return Number(baseStringArray.join(''));
}

console.log(solution(14)) // 114