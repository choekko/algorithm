const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [itemCount, capacity] = input[0].split(' ').map(Number);
const items = [];
for (let i = 1; i <= itemCount; i++) {
  const [weight, worth] = input[i].split(' ').map(Number);
  items.push({ weight, worth });
}

const solution = (items, capacity) => {
  const matrix = Array.from({ length: items.length }, () => Array.from({ length: capacity + 1 }, () => null));
  items.sort((a, b) => a.weight - b.weight);

  for (let itemIdx = 0; itemIdx < items.length; itemIdx++) {
    for (let _capacity = 0; _capacity <= capacity; _capacity++) {
      const { weight, worth } = items[itemIdx];
      const otherWorth = matrix[itemIdx - 1]?.[_capacity - weight] ?? 0;
      const prevMaxWorthOnSameCapacity = matrix[itemIdx - 1]?.[_capacity] ?? 0
      matrix[itemIdx][_capacity] = weight <= _capacity ? Math.max(prevMaxWorthOnSameCapacity, otherWorth + worth) : prevMaxWorthOnSameCapacity;
    }
  }
  
  return matrix[items.length - 1][capacity];
}

console.log(solution(items, capacity));