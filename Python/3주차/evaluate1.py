import sys
input=sys.stdin.readline

n=int(input())
zone=[list(map(int, list(input().rstrip()))) for _ in range(n)]

ans=0
answer=[]
dx=[-1,1,0,0]
dy=[0,0,-1,1]
ice=[]
for i in range(n):
    for j in range(n):
        if zone[i][j]==1:
            ice.append([i,j])

visited=[[False]*n for _ in range(n)]

def concheck(y,x):
    global n, visited
    visited[y][x]=True
    c = []
    c.append([y,x])
    con=1
    while c:
        y, x=c.pop()
        for i in range(4):
            ny=y+dy[i]
            nx=x+dx[i]
            if 0<=ny<n and 0<=nx<n:
                if not visited[ny][nx] and zone[ny][nx]!=0:
                    c.append([ny,nx])
                    visited[ny][nx]=True
                    con+=1
    return con

while len(ice) != ans:
    for i in range(n):
        for j in range(n):
            if zone[i][j] == 1 and not visited[i][j]:
                a= concheck(i,j)
                ans += a
                answer.append(a)

answer.sort()
print(len(answer))
for i in range(len(answer)):
    print(answer[i])
