import bisect

info = ["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"]

query = ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]

def solution(info, query):
    dic = {}
    for person in info :
        personOfList = person.split(' ')
        score = int(personOfList.pop())
        personOfTuple = tuple(personOfList)
        if dic.get(personOfTuple) == None :
            dic[personOfTuple] = [score]
        else :
            dic[personOfTuple].append(score)
            dic[personOfTuple].sort()
    result = []
    for queryItem in query :
        queryItemOfList = queryItem.split(' and ')
        queryItemOfList[3], wantScore = queryItemOfList[3].split(' ')
        queryItemOfList = [e for e in queryItemOfList if e != '-']
        cnt = 0
        for key in dic.keys() :
            queryItemOfSet = set(queryItemOfList)
            if set(key) & queryItemOfSet == queryItemOfSet :
                cnt += len(dic[key]) - bisect.bisect_left(dic[key], int(wantScore))
        result.append(cnt) 
    return result

print(solution(info,query))