// https://school.programmers.co.kr/learn/courses/30/lessons/72411?language=javascript

const combination = (charArray, r) => {
  if (r === 1) return charArray.map(char => [char]);

  let result = [];

  charArray.forEach((char, idx) => {
    result.push(...combination(charArray.slice(idx + 1), r - 1).map(candidate => [char, ...candidate]));
  })

  return result;

}

function solution(orders, menuCounts) {
  const courseMap = {}; // { [코스 종류]: 사람 수 }

  menuCounts.forEach(count => {
    orders.forEach(order => {
      if (order.length < count) return;
      combination([...order].sort(), count).forEach(candidate => {
        const candidateString = candidate.join('');
        courseMap[candidateString] = courseMap[candidateString] ? courseMap[candidateString] + 1 : 1;
      })
    })
  })

  const menuCountToCourseMap = menuCounts.reduce((acc, menuCount) => (acc[menuCount] = { maxPersonCount: 0, courses: [] }, acc), {});

  Object.entries(courseMap).forEach(([course, personCount]) => {
    const menuCount = course.length;

    if (menuCountToCourseMap[menuCount].maxPersonCount === personCount) {
      menuCountToCourseMap[menuCount].courses.push(course);
      return;
    }
    if (menuCountToCourseMap[menuCount].maxPersonCount < personCount) {
      menuCountToCourseMap[menuCount].maxPersonCount = personCount;
      menuCountToCourseMap[menuCount].courses = [course];
      return;
    }
  })

  return Object.values(menuCountToCourseMap)
    .filter(({ maxPersonCount }) => maxPersonCount >= 2)
    .reduce((acc, { courses }) => {
      acc.push(...courses);
      return acc;
    }, [])
    .sort();
}