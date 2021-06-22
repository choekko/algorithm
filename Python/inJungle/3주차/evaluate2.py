import sys
from collections import deque
input=sys.stdin.readline

n, k = map(int, input().split())
visited=[False]*100001
visited[n]=True
number=[0]*100001
q=deque()
q.append(n)

def num(start, next):
    global visited, q
    if 0 <= next < 100001:
        if number[start]+1 < number[next] or visited[next]==False:
            number[next] = number[start]+1
            q.append(next)
            visited[next]=True

def move():
    global q
    while q:
        start = q.popleft()
        if start == k:
            return number[start]
        num(start, start - 1)
        num(start, start + 1)
        num(start, start * 2)

print(move())