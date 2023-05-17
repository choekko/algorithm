// https://school.programmers.co.kr/learn/courses/30/lessons/131130

function solution(cards) {
  const checkingArray = Array(cards.length).fill(false);
  const counts = [];

  for (let i = 0; i < cards.length; i++) {
    if (checkingArray[i]) continue;
    checkingArray[i] = true;

    let currentNumber = cards[i];
    let count = 1;

    while (true) {
      if (checkingArray[currentNumber - 1]) break;
      checkingArray[currentNumber - 1] = true;
      count++;
      currentNumber = cards[currentNumber - 1];
    }
    counts.push(count);
  }

  if (counts.length === 1) return 0;

  counts.sort((a, b) => a - b);

  return counts.pop() * counts.pop();
}