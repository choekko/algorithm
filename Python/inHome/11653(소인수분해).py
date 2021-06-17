from sys import stdin 
from collections import deque

stdin = open("input.txt", "r")

num = int(stdin.readline())
if num == 1 :
    exit(0)

stk = deque([[num, 0]])

while True:
    oldLen = len(stk)
    cnt = 0
    while cnt < oldLen :
        # print("여기", stk)
        # print("oldLen :: ",oldLen)
        [target, check] = stk.popleft()
        if check :
            stk.append([target, check])
            cnt += 1
            continue
        flag = 0
        # print("target ::", target)
        if target // 2 >= 2 :
            for i in range(2, target // 2 + 1) :
                if target % i == 0 and target != i:
                    stk.append([i, 0])
                    stk.append([target // i, 0])
                    flag = 1
                    break
        if flag == 0 :
            stk.append([target, 1])
        cnt += 1
    if oldLen == len(stk) :
        #print(stk)
        break

for i in stk :
    print(i[0])