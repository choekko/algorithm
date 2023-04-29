const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');
const matrix = input.slice(1).map(line => line.split(' ').map(Number));


const solution = (matrix) => {
  const size = matrix.length;
  let minDifference = Infinity;

  const getTeamStat = (arr) => {
    let spec = 0;
    for(let i = 0; i<arr.length; i++){
      const x = arr[i];
      for(let j = 0; j <arr.length; j++){
        if(i===j) continue;
        const y = arr[j]
        spec+=matrix[x][y]
      }
    }
    return spec
  }

  const check = (n) => {
    const target = Math.floor(size / 2)
    let cnt = 0;
    while (n > 0){
      if (n & 1){
        cnt++;
      }
      n = n >> 1;
    }
    if (cnt <= target) return true;
    return false;
  }

  for ( let i = 0; i < ( 1 << size ); i++) {
    if(check(i)){
      let value = i
      const start = [];
      const link = [];

      // 팀나누고.
      for(let j = 0; j < size; j++){
        if(value & 1){
          start.push(j)
        }else{
          link.push(j)
        }
        value = value >> 1
      }

      const specStart = getTeamStat(start)
      const specLink = getTeamStat(link)

      minDifference = Math.min(Math.abs(specLink - specStart), minDifference);
    }
  }

  return minDifference
}

console.log(solution(matrix))
