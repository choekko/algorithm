import sys
import copy
from collections import deque

sys.stdin = open("input.txt", "r")

nbr_cnt = int(sys.stdin.readline())
line_cnt = int(sys.stdin.readline())

line_ary = []
for _ in range(line_cnt) :
	tmp = list(map(int, sys.stdin.readline().split()))
	line_ary.append(tmp)
	tmp2 = list(tmp)
	tmp2.reverse()
	line_ary.append(tmp2)

line_ary.sort()

ary = [[0] * (nbr_cnt+1) for _ in range(nbr_cnt+1)]


for i in range(len(line_ary)) :
	ary[line_ary[i][0]][line_ary[i][1]] = 1


cnt = 0
que = deque()
def bfs(start_nbr: int, flag : int) :
	global cnt
	cnt += 1
	if flag == 0 :
		for j in range(1, nbr_cnt + 1) :
			ary[j][start_nbr] = 0
	for i in range(1, nbr_cnt + 1):
		if ary[start_nbr][i] == 1 :
			ary[start_nbr][i] = 0
			ary[i][start_nbr] = 0
			que.appendleft(i)
			for j in range(1, nbr_cnt + 1) :
				ary[j][i] = 0
	if que :
		bfs(que.pop(), 1)
	else : return

bfs(1, 0)
print(cnt - 1)


