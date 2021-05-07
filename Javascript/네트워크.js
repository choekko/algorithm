const n = 3;
const computers = [[1, 1, 0], [1, 1, 0], [0, 0, 1]];

const solution = (n, computers) => {
    let numArray = Array.from({length : n}, (_, i) => [i, i]);
    let checked = Array.from({length : n});
    let result = 0;
    let currStartNum = -1;
    
    while (true) {
        const [currNum, startNum] = numArray.pop();

        if (!checked[startNum] && startNum != currStartNum) {
            result++;
            currStartNum = startNum;
        }

        computers.forEach((row, i) => {
            if (i != currNum && row[currNum] === 1 && !checked[i]) {
                numArray.push([i, startNum]);
                checked[i] = 1;
            }
        })

        if (numArray.length === 0)
            return result;
    }
} 

console.log(solution(n, computers));