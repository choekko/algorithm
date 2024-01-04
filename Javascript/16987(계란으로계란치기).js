const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const infos = input.slice(1).map(line => line.split(' ').map(Number)).map(([durability, weight]) => ({ durability, weight }));

const solution = (infos) => {
  let result = 0;

  const dfs = (eggIdx, countOfBrokenEgg) => {
    const currentEggStatus = { ...infos[eggIdx] };

    for (let targetEggIdx = 0; targetEggIdx < infos.length; targetEggIdx++) {
      const targetEggStatus = { ...infos[targetEggIdx] };

      if (eggIdx === infos.length - 1 && targetEggIdx === infos.length - 1) {
        result = Math.max(result, countOfBrokenEgg);
        return;
      }
      if (targetEggIdx === eggIdx || targetEggStatus.durability <= 0) continue;

      if (currentEggStatus.durability <= 0) {
        if (eggIdx === infos.length - 1) {
          result = Math.max(result, countOfBrokenEgg);
          return;
        }

        dfs(eggIdx + 1, countOfBrokenEgg);
        return;
      }

      infos[eggIdx].durability -= targetEggStatus.weight;
      infos[targetEggIdx].durability -= currentEggStatus.weight;

      let brokenEggOffset = 0;
      if (infos[eggIdx].durability <= 0) {
        brokenEggOffset++;
      }
      if (infos[targetEggIdx].durability <= 0) {
        brokenEggOffset++;
      }

      countOfBrokenEgg += brokenEggOffset;

      if (eggIdx === infos.length - 1) {
        result = Math.max(result, countOfBrokenEgg);
      } else {
        dfs(eggIdx + 1, countOfBrokenEgg);
      }

      infos[eggIdx].durability = currentEggStatus.durability;
      infos[targetEggIdx].durability = targetEggStatus.durability;
      countOfBrokenEgg -= brokenEggOffset
    }

    result = Math.max(result, countOfBrokenEgg);
  }

  dfs(0, 0);

  return result;
}

console.log(solution(infos));