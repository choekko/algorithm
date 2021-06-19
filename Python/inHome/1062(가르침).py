from sys import stdin
from itertools import combinations

stdin = open("input.txt", "r")

wordNum, letterNum = map(int, stdin.readline().rstrip().split(' '))

if letterNum < 5 :
    print(0)
    exit(0)

base = {'a', 'n', 't', 'i', 'c'}
other = "bdefghjklmopqrsuvwxyz"
other = list(other)

wordSets = []
allSet = set({})
for _ in range(wordNum) :
    wordSet = set(stdin.readline().rstrip())
    wordSets.append(wordSet)
    allSet |= wordSet

otherSet = allSet - base

otherSetLen = len(otherSet)
if otherSetLen <= letterNum - 5 :
    print(wordNum)
    exit(0)
else :
    candidates = combinations(otherSet, len(otherSet) - (letterNum - 5))

result = 0
for candidate in candidates :
    tmpSet = allSet - set(candidate)
    cnt = 0
    for wordSet in wordSets :
        if wordSet <= tmpSet :
            cnt += 1
    if result < cnt :
        result = cnt

print(result)


'''
 아래꺼는 시간초과로 안 된다. 신기방기


from sys import stdin
from itertools import combinations

stdin = open("input.txt", "r")

wordNum, letterNum = map(int, stdin.readline().rstrip().split(' '))

if letterNum < 5 :
    print(0)
    exit(0)

base = {'a', 'n', 't', 'i', 'c'}
other = "bdefghjklmopqrsuvwxyz"
other = list(other)

wordSets = []
allSet = set({})
for _ in range(wordNum) :
    wordSet = set(stdin.readline().rstrip()) - base
    wordSets.append(wordSet)
    allSet |= wordSet

otherSet = allSet - base

otherSetLen = len(otherSet)
if otherSetLen <= letterNum - 5 :
    print(wordNum)
    exit(0)
else :
    candidates = combinations(otherSet, len(otherSet) - (letterNum - 5))

result = 0
for candidate in candidates :
    cnt = 0
    for wordSet in wordSets :
        if wordSet <= otherSet - set(candidate) :
            cnt += 1
    if result < cnt :
        result = cnt

print(result)

'''
