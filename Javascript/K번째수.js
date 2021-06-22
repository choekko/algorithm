const array = [1, 5, 2, 6, 3, 7, 4];
const commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]];

const solution = (array, commands) => {
    let returnArray = [];

    for (let i = 0 ; i < commands.length ; i++) {
        const sortedArray = array.slice(commands[i][0] - 1, commands[i][1]).sort((a, b) => (a - b));
        returnArray.push(sortedArray[commands[i][2] - 1])
    }
    return returnArray;
}

console.log(solution(array, commands));