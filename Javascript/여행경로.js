const tickets = [["ICN", "SFO"], ["ICN", "ATL"], ["SFO", "ATL"], ["ATL", "ICN"], ["ATL","SFO"]]

const solutions = (tickets) => {
    let ticketList = {};
    tickets.forEach((e) => {
        const [start, end] = e;
        if (!ticketList[start])
            ticketList[start] = [end];
        else
            ticketList[start].push(end);
    })
    ticketList = Object.entries(ticketList).sort().map((e) => {e[1].sort(); return e});
    
    let indexPair = {}
    ticketList.forEach((e, i) => {
        indexPair[e[0]] = i;
    })

    let indexingList = ticketList.map((e) => e[1].map((item) => indexPair[item]));
    // console.log(indexingList)

    let dfsStack = Array.from({length : indexingList.length}, (_, i) => [i, 1 << i]).reverse();
    console.log(dfsStack)
    while (true) {

    }
}

solutions(tickets);