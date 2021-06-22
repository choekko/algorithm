# [시간 초과]

import sys
# from collections import deque
sys.stdin = open("input.txt", "r") 
input = sys.stdin.readline

r,c = map(int,input().split())

board = [[int(x) for x in input().split()] for y in range(r)]

dx = [1,-1,0,0]
dy = [0,0,1,-1]
# stack = deque([0, 0])
stack = [[0,0]]

vis = [[0 for _ in range(c)] for _ in range(r)]

vis[0][0] = 1

cnt = 0

while stack:
    curX, curY = stack.pop()
    for dir in range(4):
        nx = curX + dx[dir]
        ny = curY + dy[dir]

        if nx < 0 or nx >= r or ny < 0 or ny >= c:
            continue
        if vis[nx][ny] != 0 or board[curX][curY] <= board[nx][ny]:
            continue
        
        if nx == r-1 and ny == c-1:
            cnt += 1
        stack.append([nx,ny])   
    if len(stack) == 1:
        vis = [[0 for _ in range(c)] for _ in range(r)]

print(cnt)