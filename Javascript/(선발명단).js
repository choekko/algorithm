const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const testCaseCount = Number(input[0]);
const testCases = [];
for (let i = 0; i < testCaseCount; i++) {
  const bucket = [];

  for (let j = 0; j < 11; j++) {
    const abilities = input[1 + i * 11 + j].split(' ').map(Number);
    bucket.push(abilities);
  }

  testCases.push(bucket);
}

const solution = (testCases) => {
  const getMaxTeamAbility = (testCase) => {
    let maxTeamAbility = -Infinity;

    const traverse = (personIdx, bitFlag, teamAbility) => {
      if (personIdx === 11)  {
        maxTeamAbility = Math.max(teamAbility, maxTeamAbility);
        return;
      }

      for (let i = 0; i < 11; i++) {
        if (bitFlag & (1 << i)) continue;
        if (!testCase[personIdx][i]) continue;
        // bitFlag = bitFlag | (1 << i); 이 부분 진행 후 traverse에 bitFlag를 넣으려 했는데.. 답이 다르게 나온다?!
        traverse(personIdx + 1, bitFlag | (1 << i), teamAbility + testCase[personIdx][i]);
      }
    }

    traverse(0, 0, 0);

    return maxTeamAbility;
  }

  const result = [];

  testCases.forEach(testCase => {
    const maxTeamAbility = getMaxTeamAbility(testCase);
    result.push(maxTeamAbility);
  })

  return result.join('\n');
}

console.log(solution(testCases));