# from sys import stdin
# from collections import deque

# stdin = open("input.txt", "r")

# base = list(stdin.readline().rstrip())
# tnt = list(stdin.readline().rstrip())
# tntSize = len(tnt)

# rightStk = deque(base)
# leftStk = deque()

# def moveCursor(direction) :
#     if direction == "left" and leftStk :
#         rightStk.appendleft(leftStk.pop())
#     elif direction == "right" and rightStk :
#         leftStk.append(rightStk.popleft())
        
 
# while rightStk :
#     while rightStk and rightStk[0] != tnt[0] :
#         moveCursor("right")
#     if list(rightStk)[0:tntSize] == tnt :
#         for _ in range(0, tntSize) :
#             rightStk.popleft()
#         for _ in range(0, tntSize - 1) :
#             moveCursor("left")
#     else :
#         moveCursor("right")

# if len(leftStk) :
#     print(''.join(leftStk))
# else :
#     print("FRULA")

###############################################################

# from sys import stdin

# stdin = open("input.txt", "r")
# base = list(stdin.readline().rstrip())
# tnt = list(stdin.readline().rstrip())
# tntSize = len(tnt)
# baseSize = len(base)

# def getPi(tnt) :
#     tntSize = len(tnt)
#     pi = [0] * (tntSize + 1)
#     for i in range(1, tntSize + 1) :
#         piece = tnt[0:i]
#         prefix = []
#         suffix = []
#         for j in range(1, i) :
#             prefix.append(piece[0:j])
#             suffix.append(piece[-j:])
#         for k in range(i - 2, -1, -1) :
#             if prefix[k] in suffix :
#                 pi[i] = k + 1
#                 break
#     return pi


# def kmp(base, startIndex, tnt, pi) :
#     baseIndex = startIndex
#     tntIndex = 0
#     while True :
#         if tntIndex == tntSize :
#             return baseIndex - tntSize
#         if baseIndex == baseSize :
#             break
#         if base[baseIndex] == tnt[tntIndex] :
#             baseIndex += 1
#             tntIndex += 1
#         elif tntIndex > 1 :
#             baseIndex -= pi[tntIndex]
#             tntIndex = 0
#         else :
#             if tntIndex == 0 :
#                 baseIndex += 1
#             else :
#                 tntIndex = 0
#     return -1

# kmpStartIndex = 0
# pi = getPi(tnt)
# while True :
#     kmpIndex = kmp(base, kmpStartIndex, tnt, pi)
#     if kmpIndex == -1 :
#         break
#     del base[kmpIndex:kmpIndex + tntSize]
#     baseSize -= tntSize
#     kmpStartIndex = kmpIndex - tntSize if kmpIndex - tntSize >= 0 else 0

# if len(base) :
#     print(''.join(base))
# else :
#     print("FRULA")
        
# #########################################################################

# from sys import stdin

stdin = open("input.txt", "r")
base = list(stdin.readline().rstrip())
tnt = list(stdin.readline().rstrip())
tntSize = len(tnt)
tmpStk = []
for i in range(len(base)) :
    tmpStk.append(base[i])
    if len(tmpStk) >= tntSize and tmpStk[-tntSize:] == tnt :
        for _ in range(tntSize) :
            tmpStk.pop()

if len(tmpStk) :
    print(''.join(tmpStk))
else :
    print("FRULA")
