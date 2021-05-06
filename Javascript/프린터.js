const priorities = [1, 1, 9, 1, 1, 1];
const location = 0;

const solution = (priorities, location) => {
    let indexOfTarget = location;
    let orderOfTarget = 1;
    let orderArray = [...priorities];
    let currentDocument;

    while (true) {
        currentDocument = orderArray.shift();

        if (orderArray.findIndex((priority) => priority > currentDocument) != -1) {
            orderArray.push(currentDocument);
            if (indexOfTarget === 0) {
                indexOfTarget = orderArray.length - 1;
                continue;
            }
        }
        else {
            if (indexOfTarget === 0)
                return orderOfTarget;
            else
                orderOfTarget++;
        }
        indexOfTarget--;
    } 
}

console.log(solution(priorities, location));