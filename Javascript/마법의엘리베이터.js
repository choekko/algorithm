// https://school.programmers.co.kr/learn/courses/30/lessons/148653#

const solution = (storey) => {

  const traverse = (storey, count) => {
    if (!storey) return count;

    const unitsNumber = storey % 10;
    const tensNumber = Math.floor((storey % 100) / 10);

    if (unitsNumber < 5 || (unitsNumber === 5 && tensNumber < 5)) {
      /**
       * 상기 조건문에서 tensNumber <= 5 면 안 된다.
       *
       * `~55`의 일, 십 자릿수를 처리하는 방법에는 두 가지가 있다.
       *
       * 1. 일의 자리수를 5만큼 내리고(횟수 5), 다음 루틴을 돈다.
       *    - 이 경우, 십의 자릿수도 5만큼 내리길 기대하게 된다.
       *    - 총 기대 횟수: 10
       *
       * 2. 일의 자리수를 5를 올리고(횟수 5) 다음 루틴을 돈다.
       *    - 이 경우 십의 자릿수는 6이 되는데, 6 이상의 값은 항상 올림처리 되므로 4만큼 횟수(횟수 4)를 사용해서 자신의 자릿수를 0을 만들고, 자신보다 윗 자릿수의 값을 1 올린다.
       *    - 1만큼 상승하게 되는 그 윗 자리수는 다시 루틴이 돌 때, 상승하기 전 숫자일 때보다 `횟수가 1만큼 증가하거나 그대로`이게 된다.
       *    - 총 기대 횟수: 9~10
       *
       *  즉, 이 경우 십의 자리수, 일의 자리수 모두 5를 깎는 1번 방법이 아닌 2번 방법이 더욱 횟수가 줄어들 여지가 있으므로, 2번 방법으로 진행될 수 있도록 해야한다.
       *  이에 따라 기존에 tensNumber ≤ 5 로 작성했던 조건을 tensNumber < 5 로 수정했더니 문제를 통과하였다.
       */

      const nextStorey = Math.floor(storey / 10);
      return traverse(nextStorey, count + unitsNumber);
    }

    const nextStorey = Math.floor(storey / 10) + 1;
    return traverse(nextStorey, count + 10 - unitsNumber);
  }

  return traverse(storey, 0);
}

console.log(solution(2554));