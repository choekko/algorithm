import sys
import copy
from collections import deque
sys.setrecursionlimit(10**6)

sys.stdin = open("input.txt", "r")

nbr_cnt, line_cnt, start_nbr = map(int, sys.stdin.readline().split())

line_ary = []

for _ in range(line_cnt) :
	tmp = list(map(int, sys.stdin.readline().split()))
	line_ary.append(tmp)
	tmp2 = list(tmp)
	tmp2.reverse()
	line_ary.append(tmp2)

line_ary.sort()

bfs_ary = [[0] * (nbr_cnt+1) for _ in range(nbr_cnt+1)]

for i in range(len(line_ary)) :
	bfs_ary[line_ary[i][0]][line_ary[i][1]] = 1

dfs_ary=copy.deepcopy(bfs_ary)

# for i in range(len(bfs_ary)) :
# 	print(bfs_ary[i])


def dfs(start_nbr : int, k : int) :
	if k > nbr_cnt : return
	for j in range(1, nbr_cnt + 1) :
		dfs_ary[j][start_nbr] = 0
	print(start_nbr, end=' ')
	for i in range(1, nbr_cnt + 1) :
		if dfs_ary[start_nbr][i] == 1 :
			dfs_ary[start_nbr][i] = 0
			dfs_ary[i][start_nbr] = 0
			dfs(i, k + 1)

dfs(start_nbr, 0)


print()
que = deque()
def bfs(start_nbr: int, flag : int) :
	print(start_nbr, end=' ')
	if flag == 0 :
		for j in range(1, nbr_cnt + 1) :
			bfs_ary[j][start_nbr] = 0
	for i in range(1, nbr_cnt + 1):
		if bfs_ary[start_nbr][i] == 1 :
			bfs_ary[start_nbr][i] = 0
			bfs_ary[i][start_nbr] = 0
			que.appendleft(i)
			for j in range(1, nbr_cnt + 1) :
				bfs_ary[j][i] = 0
	if que :
		bfs(que.pop(), 1)
	else : return

bfs(start_nbr, 0)