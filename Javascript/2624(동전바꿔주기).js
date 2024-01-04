const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const target = Number(input[0]);
const coins = input.slice(2).map(line => {
  const [coin, count] = line.split(' ').map(Number);
  return { coin, count }
})

const solution = (target, coins) => {
  const d = {'0': 1}
  coins.sort((a, b) => a.coin - b.coin);

  const increaseValue = (obj, key, value) => {
    if (!obj[key]) {
      obj[key] = value;
      return;
    }
    obj[key] += value;
  }

  for (const {coin, count} of coins) {
    const newD = {'0': 1}

    let c = 0;
    let prevTmpD = d;
    let tmpD = {}
    while (c < count) {
      const prevTmpDEntries = Object.entries(prevTmpD);

      for (const [key, value] of prevTmpDEntries) {
        const _coin = Number(key);
        const newCoin = coin + _coin;

        if (newCoin > target) break;
        increaseValue(tmpD, newCoin, value);
        increaseValue(newD, newCoin, value);
      }

      prevTmpD = tmpD;
      tmpD = {}
      c++;
    }

    for (const [key, value] of Object.entries(newD)) {
      if (key === '0') continue;
      increaseValue(d, key, value);
    }
  }

  return d[target] ?? 0;
}

console.log(solution(target, coins));