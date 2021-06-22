const people = [70, 50, 80];
const limit = 100;

const solution = (people, limit) => {
    let sortedPeople = [...people].sort((a, b) => b - a);
    let boats = 0;
    while (sortedPeople.length) {
        const small = sortedPeople.pop();
        const pairIndex = sortedPeople.findIndex((e) => e + small <= limit);
        if (pairIndex != -1)
            sortedPeople.splice(pairIndex);
        boats++;
    }
    return boats;
}

console.log(solution(people, limit));