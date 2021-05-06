const n = 5;
const lost = [2, 4];
const reserve = [1, 3, 5];

const solution1 = (n, lost, reserve) => {

    // 사람 번호를 인덱스 번호로 쓰기 위해서 사람수 + 1 의 빈 배열 만듬
    let array = new Array(n + 1);
    
    // 기본 체육복 수인 1로 초기화 (0 인덱스는 제외)
    array.fill(1);
    array[0] = 0;

    lost.map((lostPerson) => array[lostPerson]--);
    reserve.map((reservePerson) => array[reservePerson]++);

    for (let i = 1; i <= n; i++) {
        if (array[i] === 0) {
            if (array[i - 1] === 2) {
                array[i - 1]--;
                array[i]++;
            }
            else if (i != n && array[i + 1] === 2) {
                array[i + 1]--;
                array[i]++;
            }
        }
    }

    return array.reduce((before, current) => {
                            return current >= 1 ? before + 1 : before }, 0);
}

const solution2 = (n, lost, reserve) => {
    // 자바스크립트는 for를 기피하므로 안 쓰는 방법으로 만들어보자.

    // 사람 번호를 인덱스 번호로 쓰기 위해서 사람수 + 1 의 빈 배열 만듬
    let array = new Array(n + 1);
    
    // 기본 체육복 수인 1로 초기화 (0 인덱스는 제외)
    array.fill(1);
    array[0] = 0;

    lost.map((lostPerson) => array[lostPerson]--);
    reserve.map((reservePerson) => array[reservePerson]++);

    array.splice(0, 1);

    array.map((clothCount, index, array) => {
        if (clothCount === 0) {
            if (index != 0 && array[index - 1] === 2) {
                array[index - 1]--;
                array[index]++;
                return;
            }
            if (index != n - 1 && array[index + 1] === 2) {
                array[index + 1]--;
                array[index]++;
                return;
            }
        }
    })

    return array.reduce((before, current) => {
                            return current >= 1 ? before + 1 : before }, 0);
}

console.log(solution2(n, lost, reserve));