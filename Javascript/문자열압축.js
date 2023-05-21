// https://school.programmers.co.kr/learn/courses/30/lessons/60057

function solution(s) {
  const infos = Array(s.length + 1).fill(null).map(() => ({ words: [], wordBucket: "" }));

  const update = (char, isLast) => {
    for (let i = 1; i < infos.length; i++) {
      infos[i].wordBucket += char;

      const wordBucket = infos[i].wordBucket;
      if (wordBucket.length === i || isLast) {
        infos[i].wordBucket = '';
        infos[i].words.push(wordBucket);
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    update(char, i === s.length - 1);
  }

  let result = Infinity;

  for (let i = 1; i < infos.length; i++) {
    let compressedString = '';
    let prevWord = '';
    let prevWordCount = 0;

    for (let word of infos[i].words) {
      if (prevWord === '') {
        prevWord = word;
        prevWordCount = 1;
        continue;
      }
      if (word !== prevWord) {
        const stringToBeAdded = prevWordCount <= 1 ? prevWord : prevWordCount + prevWord;
        prevWord = word;
        prevWordCount = 1;
        compressedString += stringToBeAdded;
        continue;
      }
      prevWordCount += 1;
    }
    compressedString += prevWordCount <= 1 ? prevWord : prevWordCount + prevWord;

    result = Math.min(result, compressedString.length);
  }

  return result;
}