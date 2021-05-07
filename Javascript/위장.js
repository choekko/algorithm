const clothes1 = [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]];
const clothes2 = [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]];

const solution = (clothes) => {
    let clothesObject = {};
    clothes.forEach((e) => {
        if (clothesObject[e[1]])
            clothesObject[e[1]].push(e[0])
        else 
            clothesObject[e[1]] = [e[0]];
    });
    return Object.values(clothesObject).reduce((result, items) => (items.length + 1) * result, 1) - 1;
}

console.log(solution(clothes2));