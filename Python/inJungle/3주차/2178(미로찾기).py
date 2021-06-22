import sys
import copy
from collections import deque
sys.setrecursionlimit(10**6)

sys.stdin = open("input.txt", "r")

end_y, end_x = map(int, sys.stdin.readline().split())

ary = []

for _ in range(end_y) :
	ary.append(list(map(int, sys.stdin.readline().strip())))

# print(ary)

cost_ary = [[100000] * end_x for _ in range(end_y)]

end_x = end_x - 1
end_y = end_y - 1

que = deque([[0, 0]])

dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(ary : list) : 
	y, x = que.pop()
	for i in range(4) :
		if 0 <= x+dx[i] <= end_x and 0 <= y+dy[i] <= end_y :
			if ary[y+dy[i]][x+dx[i]] == 1 :
				ary[y+dy[i]][x+dx[i]] = 0
				que.appendleft([y+dy[i], x+dx[i]])
	min_tmp = sys.maxsize
	for i in range(4) :
		if 0 <= x+dx[i] <= end_x and 0 <= y+dy[i] <= end_y :
			min_tmp = min(min_tmp, cost_ary[y+dy[i]][x+dx[i]])
	if min_tmp == 100000 :
		min_tmp = 0
	cost_ary[y][x] = min_tmp + 1
	if que :
		bfs(ary)


bfs(ary)
print(cost_ary[end_y][end_x])
