
const participant = ["leo", "kiki", "eden"]
const completion = ["eden", "kiki"]

const solution = (participant, completion) => {
    let participantMap = new Map();

    for (let i = 0; i < participant.length; i++) {
        if (!participantMap.has(participant[i]))
            participantMap.set(participant[i], 1);
        else {
            const tmpValue1 = participantMap.get(participant[i]);
            participantMap.set(participant[i], tmpValue1 + 1);
        }
    }

    for (let j = 0; j < completion.length; j++) {
        const tmpValue2 = participantMap.get(completion[j]);
        participantMap.set(completion[j], tmpValue2 - 1);
    }

    for (let person of participantMap) {
        if (person[1] != 0)
            return person[0];
    }
}

console.log(solution(participant, completion));