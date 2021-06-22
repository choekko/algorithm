import sys
input=sys.stdin.readline

n=int(input())
tree = [[]for _ in range(n+1)]
indegree = [0 for _ in range(n+1)]
ans=[0 for _ in range(n+1)]
q=[]
numbers=[[0] for _ in range(n+1)]
maxmax=0

for _ in range(n-1):
    i, j, k = map(int, input().split())
    tree[j].append([i,k])
    indegree[i] +=1

for i in range(1, n+1):
    if indegree[i] ==0:
        q.append(i)

while q:
    i = q.pop()
    for j, k in tree[i]:
        indegree[j] -=1
        numbers[j].append(k+ans[i])
        ans[j] = max(ans[j], k + ans[i])
        if indegree[j] == 0:
            q.append(j)

        if sum(numbers[j]) > maxmax:
            maxmax = sum(numbers[j])

print(maxmax)