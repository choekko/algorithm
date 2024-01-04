const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const sands = input[1].split(' ').map(Number);
const orders = input.slice(2).map(line => {
  const [start, end, amount] = line.split(' ').map(Number);
  return { start, end, amount };
})

const solution = (sands, orders) => {
  sands.unshift(0); // 패딩
  const diffs = Array.from({ length: sands.length + 2 }, () => 0); // 양 끝 패딩

  orders.forEach(({ start, end, amount }) => {
    diffs[start] += amount;
    diffs[end + 1] -= amount;
  })

  let diffSum = 0;
  for (let i = 1; i < sands.length; i++) {
    diffSum += diffs[i];
    sands[i] += diffSum;
  }

  return sands.slice(1, sands.length).join(' ');
}

console.log(solution(sands, orders));