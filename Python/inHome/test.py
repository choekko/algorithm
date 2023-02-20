from re import sub


def getMaximumRemovals(order, source, target):
    # Write your code here
    lastMaximumRemovals = 0
    lenOrder = len(order)
    
    while True:
        if lenOrder < lastMaximumRemovals:
            break
        checkArray = [False for _ in range(len(source))]
        subOrderNum = (lastMaximumRemovals + lenOrder) // 2
        print(lastMaximumRemovals, lenOrder, subOrderNum)

        if subOrderNum == 0:
          return
        count = 0
        len_source = len(source)

        while count < subOrderNum:
            checkArray[order[count] - 1] = True
            count += 1
        currentTargetIdx = 0
        for i in range(len_source):
            if checkArray[i]:
              continue
            letter = source[i]
            if letter == target[currentTargetIdx]:
                currentTargetIdx += 1
            if currentTargetIdx == len(target):
                break
        if lenOrder == subOrderNum or lastMaximumRemovals == subOrderNum: 
          break
        if currentTargetIdx == len(target):
            lastMaximumRemovals = subOrderNum
            continue
        lenOrder = subOrderNum
    print(lastMaximumRemovals)
    return lastMaximumRemovals

getMaximumRemovals([1, 2, 3, 4], "abcd", "abcd")