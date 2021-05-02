import sys
sys.stdin = open("input.txt", "r")
def find(dataset, start):
    global visited
    global check
    visited[start] = True
    for val in dataset[start]:
        if not visited[val]:
            check+=1
            find(dataset, val)
N, M=map(int, input().split())
datas=list(tuple(map(int, input().split()))for i in range(M))
mid=(N+1)//2
more = [[] for i in range(N + 1)]
less = [[] for i in range(N + 1)]
for (a, b) in datas:
    more[b].append(a)
    less[a].append(b)
count = 0
check = 0
visited = None
for i in range(1, N + 1):
    visited = [False for i in range(N + 1)]
    check = 0
    find(more, i)
    if (check >= mid):
        count += 1
    check = 0
    find(less, i)
    if (check >= mid):
        count += 1
print(count)