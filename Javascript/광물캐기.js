const solution = (picks, minerals) => {
  const COST_MATRIX = {
    diamond: {
      diamond: 1,
      iron: 1,
      stone: 1,
    },
    iron: {
      diamond: 5,
      iron: 1,
      stone: 1
    },
    stone: {
      diamond: 25,
      iron: 5,
      stone: 1,
    }
  }

  const infoPerFiveMineral = [];

  let bucket = { diamondCount: 0, ironCount: 0, stoneCount: 0, weight: 0 };
  for (let i = 0; i < minerals.length; i++) {
    const mineral = minerals[i];
    bucket[`${mineral}Count`] += 1;
    bucket.weight += COST_MATRIX.stone[mineral];

    if (i % 5 === 4 || i === minerals.length - 1) {
      infoPerFiveMineral.push({ ...bucket });
      bucket = { diamondCount: 0, ironCount: 0, stoneCount: 0, weight: 0 };
    }
  }

  infoPerFiveMineral.sort((a, b) => b.weight - a.weight);

  let result = 0;
  let picksIdx = 0;

  for (const info of infoPerFiveMineral) {
    const { diamondCount, ironCount, stoneCount } = info;

    while (!picks[picksIdx] && picksIdx < 3) {
      picksIdx += 1;
    }

    if (picksIdx >= 3) {
      return result;
    }

    picks[picksIdx] -= 1;

    const pick = picksIdx === 0
      ? 'diamond'
      : picksIdx === 1
        ? 'iron'
        : 'stone';

    result += COST_MATRIX[pick].diamond * diamondCount + COST_MATRIX[pick].iron * ironCount + COST_MATRIX[pick].stone * stoneCount;
  }

  return result
}

console.log(solution([1, 1, 0], ["iron", "iron", "iron", "iron", "iron", "diamond"])) // 12
