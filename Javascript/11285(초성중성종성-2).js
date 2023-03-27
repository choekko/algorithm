const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const [firstConsonant, middleVowel, lastConsonant] = input;

const solution = (firstConsonant, middleVowel, lastConsonant) => {
  const FIRST_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const LAST_CONSONANTS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  const VOWEL_DISTANCE = LAST_CONSONANTS.length;
  const FIRST_CONSONANT_DISTANCE = VOWELS.length * VOWEL_DISTANCE;

  const START_UNICODE = '가'.charCodeAt(0);

  const firstConsonantIdx = FIRST_CONSONANTS.findIndex(consonant => consonant === firstConsonant);
  const middleVowelIdx = VOWELS.findIndex(vowel => vowel === middleVowel);
  const lastConsonantIdx = LAST_CONSONANTS.findIndex(consonant => consonant === lastConsonant);

  return String.fromCharCode(START_UNICODE + firstConsonantIdx * FIRST_CONSONANT_DISTANCE + middleVowelIdx * VOWEL_DISTANCE + lastConsonantIdx);
}

console.log(solution(firstConsonant, middleVowel, lastConsonant))