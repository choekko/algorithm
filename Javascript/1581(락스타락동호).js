const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.platform === "linux" ? process.stdin : fs.createReadStream('input.txt') ,
  output: process.stdout,
  terminal: false,
});
const input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const [ ff, fs, sf, ss ] = input[0].split(' ').map(Number);

  console.log(solution({ ff, fs, sf, ss }));
  process.exit();
});

const solution = (songCountMap) => {

  let REPEATABLE_PATTERN_INFOS = [
    { pattern: ['ff'], pad: { start: null, end: 2, middle: null }},
    { pattern: ['ss'], pad: { start: 'fs', end: 'sf', middle: null }},
    { pattern: ['fs', 'sf'], pad: { start: 0, end: 0, middle: 1 }},
  ]

  const getPatternCount = (patternInfo, songCountMap, hasPad ) => {
    const allSongCount = Object.values(songCountMap).reduce((acc, curr) => acc + curr, 0);
    // console.log(patternInfo.pattern[0] === 'ss', hasPad, (songCountMap['ff'] || songCountMap['fs']))
    if (patternInfo.pattern[0] === 'ss' && hasPad && (songCountMap['ff'] || songCountMap['fs'])) return 0;

    let count = 0;

    const { pattern, pad } = patternInfo;

    loop: while (true) {
      for (const song of pattern) {
        if (!songCountMap[song]) break loop;

        songCountMap[song]--;
        count++;
      }
    }

    const isMiddlePossible = count >= 1;

    if (hasPad) {
      if (pad.start !== null) {
        if (typeof pad.start === 'number' && songCountMap[REPEATABLE_PATTERN_INFOS[pad.start].pattern[0]]) {
          count += getPatternCount(REPEATABLE_PATTERN_INFOS[pad.start], songCountMap, false);
        } else if (songCountMap[pad.start]) {
          songCountMap[pad.start]--;
          count++;
        }
      }

      if (pad.middle !== null && isMiddlePossible) {
        if (typeof pad.middle === 'number' && songCountMap[REPEATABLE_PATTERN_INFOS[pad.middle].pattern[0]]) {
          count += getPatternCount(REPEATABLE_PATTERN_INFOS[pad.middle], songCountMap, false);
        } else if (songCountMap[pad.middle]) {
          songCountMap[pad.middle]--;
          count++;
        }
      }

      if (pad.end !== null) {
        if (typeof pad.end === 'number' &&  songCountMap[REPEATABLE_PATTERN_INFOS[pad.end].pattern[0]]) {
          count += getPatternCount(REPEATABLE_PATTERN_INFOS[pad.end], songCountMap, false);
        } else if (songCountMap[pad.end]) {
          songCountMap[pad.end]--;
          count++;
        }
      }
    }

    // console.log(count, '2')

    if (!count && allSongCount) {
      return 1;
    }
    return count;
  }

  let result = 0;

  for (const patternInfo of REPEATABLE_PATTERN_INFOS) {
    // console.log(patternInfo);
    result = Math.max(getPatternCount(patternInfo, { ...songCountMap }, true), result);
  }

  return result;
}

//999