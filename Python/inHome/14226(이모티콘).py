# from sys import stdin
# import sys
# from collections import deque

# stdin = open("input.txt", "r")

# target = int(stdin.readline())

# bfsQue = deque([(0, 1, 0), (0, 1, 0)])

# check = [0] * (target + 1000)

# def do (num, value, clipboard) :
#     if num == 1 :
#         clipboard = value
#     elif num == 2 :
#         value += clipboard
#     else :
#         value -= 1
#     return (value, clipboard)

# cnt = 0

# while bfsQue :
#     for _ in range(len(bfsQue)) :
#         a, b, c = bfsQue.pop()
#         for i in range(1, 4) :
#             curr, value, clipboard = a, b, c
#             if clipboard == 0 and i == 2 :
#                 continue
#             if curr == 1 and i == 1 :
#                 continue
#             if value > target and (i == 1 or i == 2) :
#                 continue
#             if value == 0 and i != 2 :
#                 continue
#             value, clipboard = do(i, value, clipboard)
#             if i != 1 and check[value] and check[value] != cnt + 1 :
#                 continue
#             if value == target :
#                 print(cnt + 1)
#                 exit(0)
#             bfsQue.appendleft((i, value, clipboard))
#             check[value] = cnt + 1
#     cnt += 1


from sys import stdin
from collections import deque

stdin = open("input.txt", "r")

target = int(stdin.readline())

check = dict()
check[(1, 0)] = 0



bfsQue = deque([(1, 0)])


while bfsQue : 
    value, clipboard = bfsQue.pop()
    cnt = check[(value, clipboard)]
    if value == target :
        print(cnt)
        exit(0)

    if value != clipboard and (value, value) not in check.keys() :
        bfsQue.appendleft((value, value))
        check[(value, value)] = cnt + 1
    if clipboard != 0 and (value + clipboard, clipboard) not in check.keys() :
        bfsQue.appendleft((value + clipboard, clipboard))
        check[(value + clipboard, clipboard)] = cnt + 1
    if value != 0 and (value - 1, clipboard) not in check.keys() :
        bfsQue.appendleft((value - 1, clipboard))
        check[(value - 1, clipboard)] = cnt + 1
    
        