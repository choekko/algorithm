const numbers = [1, 1, 1, 1, 1];
const target = 3;

const combination = (numberArray, length) => {
    if (length === 1)
        return numberArray.map((number) => [number]);

    let methodsArray = [];
    numberArray.forEach((number, index, array) => {
        let restArray = array.slice(index + 1) // 현재 숫자의 뒷 숫자들의 배열
        methodsArray = [...methodsArray, ...combination(restArray, length - 1).map((element) => [number, ...element])]
    })
    return methodsArray;
}

const solution = (numbers, target) => {
    let numbersCount = numbers.length;
    let methodsCount = 0;
    
    const combinationHelper = Array.from({length : numbersCount}, (_, i) => i);
    let candidateMethods = combinationHelper.map((number, _, array) => combination(array, number)).flat();
    candidateMethods.forEach((method) => {
        let numbersCopy = [...numbers];
        method.forEach((index) => numbersCopy[index] *= -1);
        let sumAllElement = numbersCopy.reduce((a, b) => a + b);
        if (sumAllElement === target)
            methodsCount++;
    })
    return methodsCount;
}

console.log(solution(numbers, target));
