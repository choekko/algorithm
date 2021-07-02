from itertools import combinations


orders = ["XYZ", "XWY", "WXA"]
course = [2,3,5]



def solution(orders, course):
    dic = {}
    for order in orders :
        for number in course :
            for candidate in combinations(sorted(order), number) :
                if dic.get(candidate) == None : 
                    dic[candidate] = 1
                else :
                    dic[candidate] += 1
    print(dic)
    tmp = list(dic.items())
    lastInfo = {}
    while tmp :
        menu, cnt = tmp.pop()
        menuLen = len(menu)
        if cnt >= 2 :
            if lastInfo.get(menuLen) == None or lastInfo[menuLen][0] < cnt : 
                lastInfo[menuLen] = [cnt, [''.join(menu)]]
            elif lastInfo[menuLen][0] == cnt : 
                lastInfo[menuLen][1].append(''.join(menu))
    result = []
    for value in lastInfo.values() :
        result.extend(value[1])
    result.sort()
    return result

print(solution(orders, course))