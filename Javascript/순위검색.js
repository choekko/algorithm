// https://school.programmers.co.kr/learn/courses/30/lessons/72412?language=javascript

const getPersonCountMeetMinimumScore = (sortedScores, minimumScore) => {
  let leftIdx = 0;
  let rightIdx = sortedScores.length - 1;
  let minimumIdx = null;

  while (leftIdx <= rightIdx) {
    const middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    const currentScore = sortedScores[middleIdx];

    if (currentScore >= minimumScore) {
      minimumIdx = middleIdx;
      rightIdx = middleIdx - 1;
    } else {
      leftIdx = middleIdx + 1;
    }
  }
  return minimumIdx !== null ? sortedScores.length - minimumIdx : 0;
}

function solution(info, query) {
  let conditionToScoresMap = {};

  info.forEach(item => {
    const tokens = item.split(' ');
    const condition = tokens.slice(0, 4);
    const score = Number(tokens[4]);

    if (conditionToScoresMap[condition]) {
      conditionToScoresMap[condition].push(score);
    } else {
      conditionToScoresMap[condition] = [score];
    }
  })

  conditionToScoresMap = Object.fromEntries(
    Object.entries(conditionToScoresMap)
      .map(([condition, scores]) => [condition, scores.sort((a, b) => a - b)])
  )

  const result = [];
  query.forEach(item => {
    let tokens = item.split(' and ');
    tokens = [...tokens.slice(0, 3), ...tokens[3].split(' ')]
    const [language, job, career, food] = tokens.slice(0, 4);
    const minimumScore = Number(tokens[4]);

    let personCount = 0;

    Object.entries(conditionToScoresMap).forEach(([condition, scores]) => {
      const [_language, _job, _career, _food] = condition.split(',');
      const isLanguageEqual = language === '-' || language === _language;
      const isJobEqual = job === '-' || job === _job;
      const isCareerEqual = career === '-' || career === _career;
      const isFoodEqual = food === '-' || food === _food;

      if (isLanguageEqual && isJobEqual && isCareerEqual && isFoodEqual) {
        personCount += getPersonCountMeetMinimumScore(scores, minimumScore)
      }
    })

    result.push(personCount);
  })

  return result;
}