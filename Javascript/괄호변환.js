// https://school.programmers.co.kr/learn/courses/30/lessons/60058#

function solution(p) {

  const getCorrectString = (str) => {
    let countOfOpenBracket = 0;
    let countOfClosedBracket = 0;
    let countOfSet = 0;
    let countOfOpenBracketForCalculating = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '(') {
        countOfOpenBracket++;
        countOfOpenBracketForCalculating++;
      } else {
        countOfClosedBracket++;
        if (countOfOpenBracketForCalculating) {
          countOfOpenBracketForCalculating--;
          countOfSet++;
        }
      }

      if (countOfOpenBracket === countOfClosedBracket) {
        const currentBracketCount = i + 1;
        const isUCorrectString = Math.floor(currentBracketCount / 2) === countOfSet;
        const correctV = getCorrectString(str.slice(currentBracketCount));

        if (isUCorrectString) {
          return str.slice(0, currentBracketCount) + correctV;
        }

        const remainU = [...str.slice(1, currentBracketCount - 1)].reduce((acc, curr) => {
          if (curr === ')') return acc + '(';
          return acc + ')';
        }, '')
        return `(${correctV})${remainU}`;
      }
    }
    return ''
  }

  return getCorrectString(p);
}