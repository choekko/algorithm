from sys import stdin
from collections import deque

stdin = open("input.txt", "r")

col, row = map(int, stdin.readline().rstrip().split())

mat = []
for _ in range(row) :
    mat.append(list(stdin.readline().rstrip()))

check = [[0] * col for _ in range(row)]
scoreB = 0
scoreW = 0
cntB = 0
cntW = 0

bfsQue = deque()

def bfsAppend(y, x, curr) :
    global cntB
    global cntW
    if mat[y][x] == curr :
        check[y][x] = 1
        if curr == 'B' :
            cntB += 1
        else :
            cntW += 1
        bfsQue.appendleft((y, x, curr))
    else :
        return;
    
for i in range(row) :
    for j in range(col) :
        if check[i][j] == 0 :
            bfsAppend(i, j, mat[i][j])
        while bfsQue :
            y, x, curr = bfsQue.pop()
            if y + 1 < row and check[y + 1][x] == 0 :
                bfsAppend(y + 1, x, curr)
            if x + 1 < col and check[y][x + 1] == 0:
                bfsAppend(y, x + 1, curr)
            if y - 1 >= 0 and check[y - 1][x] == 0:
                bfsAppend(y - 1, x, curr)
            if x - 1 >= 0 and check[y][x - 1] == 0:
                bfsAppend(y, x - 1, curr)
        if curr == 'B' :
            scoreB += cntB ** 2
            cntB = 0
        elif curr == 'W' :
            scoreW += cntW ** 2
            cntW = 0

print(scoreW, scoreB)



