const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [size, winCount] = input[0].split(' ').map(Number);
const matrix = [];

input.slice(1, 1 + size).forEach(line => {
  matrix.push(line.split(' ').map(Number));
})

const orders = {
  second: input[1 + size].split(' ').map(Number),
  third: input[2 + size].split(' ').map(Number)
}

const permutation = (arr, n) => {
  if (n === 1) return arr.map(value => [value]);

  const result = [];

  arr.forEach((value) => {
    const candidates = permutation(arr.filter(_value => _value !== value), n - 1).map((candidate) => [value, ...candidate]);
    result.push(...candidates);
  })

  return result;
}
const solution = (matrix, size, winCount, orders) => {
  if (size < winCount) return 0;

  const checkIsWin = (firstOrders) => {
    const reversedOrders = {
      first: firstOrders.reverse(),
      second: [...orders.second].reverse(),
      third: [...orders.third].reverse(),
    }

    const winCountMap = { first: 0, second: 0, third: 0 };
    let gameOrder = ['first', 'second'];
    let nextUser = 'third';

    while (true) {

      let winner;
      const gameFirst = gameOrder[0];
      const gameSecond = gameOrder[1];

      const gameFirstProposal = reversedOrders[gameFirst].pop();
      const gameSecondProposal = reversedOrders[gameSecond].pop();

      if (!gameFirstProposal || !gameSecondProposal) return false;

      switch (matrix[gameFirstProposal - 1][gameSecondProposal - 1]) {
        case 2:
          winner = gameFirst;
          break;
        case 1:
          // 'first' < 'second' < 'third'
          winner = [gameFirst, gameSecond].sort((a, b) => b > a ? 1 : -1)[0];
          break;
        default:
          winner = gameSecond;
          break
      }

      winCountMap[winner] += 1;

      if (winCountMap[winner] === winCount) {
        return winner === 'first';
      }

      let _nextUser;
      gameOrder = gameOrder.filter(order => {
        if (order !== winner) {
          _nextUser = order;
          return false;
        }
        return true;
      });
      gameOrder.push(nextUser)
      nextUser = _nextUser;
    }
  }

  return permutation(Array.from({ length: size }, (_, idx) => idx + 1), winCount)
    .some(checkIsWin) ? 1 : 0;


}

console.log(solution(matrix, size, winCount, orders));
