// https://school.programmers.co.kr/learn/courses/30/lessons/12902

function solution(n) {
  const dp = [0n, 0n, 3n, 0n, 11n];
  const NUMBER_OF_IRREPLACABLE_PER_WIDTH = 2n;
  // 4이상 짝수 width 별로 약수 width 들의 배치 조합으로는 대체할 수 없는 배치가 2개씩 있다.

  for (let i = 5; i <= n; i++) {
    if (i % 2) {
      dp.push(0n);
      continue;
    }
    let value = NUMBER_OF_IRREPLACABLE_PER_WIDTH;

    for (let j = i - 2; j >= 2; j -= 2) {
      if (j === i - 2) {
        value += dp[j] * dp[2];
        continue;
      }
      value += dp[j] * NUMBER_OF_IRREPLACABLE_PER_WIDTH;
    }
    dp.push(value);
  }

  return dp[n] % 1000000007n
}