import sys

from collections import deque

sys.stdin = open("input.txt", "r")

string = str(sys.stdin.readline().rstrip())

dq = deque()
count = 0
for strs in string:
    if strs == '(':
        dq.append(strs)
    else:
        if dq and dq[-1]=='(':
            dq.pop()
            dq.append(1)
            for i in range(len(dq)-1,-1,-1):
                if dq[i]=='(':
                    count += 1
        else:
            while True:
                if dq.pop()=='(':break
            dq.append(1)
            count += 1
        

print(count)
