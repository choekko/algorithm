import sys
import copy
from collections import deque
sys.setrecursionlimit(10**6)

sys.stdin = open("input.txt", "r")

end_y, end_x, end_z = map(int, sys.stdin.readline().split())


end_x = end_x - 1
end_y = end_y - 1
end_z = end_z - 1


dx = [-1, 1, 0, 0, 0, 0]
dy = [0, 0, -1, 1, 0, 0]
dz = [0, 0, 0, 0, -1, 1]


ary = []


for _ in range(end_z + 1) :
	tmp = []
	for _ in range(end_x + 1) :
		tmp.append(list(map(int, sys.stdin.readline().strip().split(' '))))
	ary.append(tmp)

tmp = []

que = deque()

for z in range(end_z + 1) :
	for x in range(end_x + 1) :
		for y in range(end_y + 1) :
			if ary[z][x][y] == 1 :
				que.append([x, y, z])


cnt = 0
def bfs(ary : list) :
	global cnt
	global que
	tmp = deque() 
	while que :
		for _ in range(len(que)) :
			x, y, z = que.pop()
			for i in range(6) :
				if 0 <= x+dx[i] <= end_x and 0 <= y+dy[i] <= end_y and 0 <= z+dz[i] <= end_z :
					if ary[z+dz[i]][x+dx[i]][y+dy[i]] == 0 :
						ary[z+dz[i]][x+dx[i]][y+dy[i]] = 1
						tmp.appendleft([x+dx[i], y+dy[i], z+dz[i]])
		cnt += 1
		bfs(ary)
	else : return


bfs(ary)

for z in range(end_z + 1) :
	for x in range(end_x + 1) :
		for y in range(end_y + 1) :
			if ary[z][x][y] == 0 :
				print(-1)
				exit()
print(cnt)