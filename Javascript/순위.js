const n = 5;
const results = [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]];
const myTestCase = [[2, 1], [3, 1], [4, 3], [4, 2], [5, 2], [5, 3], [5, 4]]; // 5번이 1위, 1번이 5위 (돌려보고 알았는데 4번이 2위)

const solution = (n, results) => {
    let nodeInfo = Array.from({length : n + 1}, () => [0, []]);
    // [0, []] : [내(index)가 몇번 졌는지, [내가 이긴 사람들]]
    nodeInfo[0] = undefined; // 0번 사람은 없으므로

    
    results.forEach((e) => {
        const [win, lose] = e;
        
        nodeInfo[win][1].push(lose);
        nodeInfo[lose][0]++;
    })

    nodeInfo.forEach((e, i, array) => {
        if (!e) return;

        let peopleWhoIWon = e[1];
        let winChecked = Array.from({length : n + 1});
        peopleWhoIWon.forEach((e) => { winChecked[e] = 1 });
        let dfsStack = [...peopleWhoIWon];
        
        while (dfsStack.length) {
            let currNode = dfsStack.pop();

            array[currNode][1].forEach((e) => {
                if (!winChecked[e]) {
                    winChecked[e] = 1;
                    array[e][0]++;
                    dfsStack.push(e);
                }
            })
        }

        array[i][1] = winChecked.reduce((resultWin, e, i) => {
            if (e === 1)
                return [...resultWin, i]
            else
                return resultWin;
        }, [])
    })
    return nodeInfo.slice(1).reduce((result, e) => e[0] + e[1].length === n - 1 ? result + 1 : result, 0);
}

console.log(solution(n, results));