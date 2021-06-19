from sys import stdin
import bisect

stdin = open("input.txt", "r")

haveNum = int(stdin.readline())
haveList = sorted(list(map(int, stdin.readline().rstrip().split(' '))))
candidatesNum = int(stdin.readline())
candidates = list(map(int, stdin.readline().rstrip().split(' ')))

for candidate in candidates :
    where = bisect.bisect_left(haveList, candidate)
    if where < len(haveList) and haveList[where] == candidate :
        print(1, end=' ')
    else :
        print(0, end=' ')


