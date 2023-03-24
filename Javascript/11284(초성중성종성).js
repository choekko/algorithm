const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const letter = input[0];

const solution = (letter) => {
  const FIRST_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const LAST_CONSONANTS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  const VOWEL_DISTANCE = LAST_CONSONANTS.length;
  const FIRST_CONSONANT_DISTANCE = VOWELS.length * VOWEL_DISTANCE;

  const START_UNICODE = '가'.charCodeAt(0);

  const unicode = letter.charCodeAt(0);
  const firstConsonantIdx = Math.floor(((unicode - START_UNICODE) / FIRST_CONSONANT_DISTANCE));
  const vowelIdx = Math.floor(((unicode - START_UNICODE) % FIRST_CONSONANT_DISTANCE) / VOWEL_DISTANCE);
  const lastConsonantIdx =((unicode - START_UNICODE) % FIRST_CONSONANT_DISTANCE) % VOWEL_DISTANCE;

  return [
    FIRST_CONSONANTS[firstConsonantIdx],
    VOWELS[vowelIdx],
    LAST_CONSONANTS[lastConsonantIdx]
  ].join('\n');
}

console.log(solution(letter));