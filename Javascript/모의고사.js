const answers = [1,3,1,4];

const score = (method, answers) => {
    const recursiveLength = method.length; 

    return answers.reduce((before, answer, index) => 
                answer === method[index % recursiveLength] ? before + 1 : before, 0)
}

const solution = (answers) => {
    const firstMethod = [1, 2, 3, 4, 5];
    const secondMethod = [2, 1, 2, 3, 2, 4, 2, 5];
    const thirdMethod = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    let scoreArray = [];
    scoreArray[0] = score(firstMethod, answers);
    scoreArray[1] = score(secondMethod, answers);
    scoreArray[2] = score(thirdMethod, answers);

    console.log(scoreArray)

    let maxScorePerson = [];
    scoreArray.reduce((maxScore, score, index) => {
        if (score > maxScore) {
            maxScorePerson = [index + 1];
            return score;
        }
        else if (score === maxScore)
            maxScorePerson = [...maxScorePerson, index + 1];
            
        return maxScore;
    }, 0)

    return maxScorePerson;
}

console.log(solution(answers));