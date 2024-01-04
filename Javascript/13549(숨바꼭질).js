const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [start, end] = input[0].split(' ').map(Number);

const solution = (start, end) => {

}