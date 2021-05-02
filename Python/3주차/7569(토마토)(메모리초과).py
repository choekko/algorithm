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

def init(ary : list) :
	global flag
	for z in range(end_z + 1) :
		for x in range(end_x + 1) :
			for y in range(end_y + 1) :
				if ary[z][x][y] == -2 :
					ary[z][x][y] = 0
				if ary[z][x][y] == 2 :
					flag = 1
					ary[z][x][y] = 1

def bfs(ary : list) :
	x, y, z = que.pop()
	for i in range(6) :
		if 0 <= x+dx[i] <= end_x and 0 <= y+dy[i] <= end_y and 0 <= z+dz[i] <= end_z :
			if ary[z+dz[i]][x+dx[i]][y+dy[i]] == 1 :
				ary[z][x][y] = 2
			elif ary[z+dz[i]][x+dx[i]][y+dy[i]] == 0 :
				que.appendleft([x+dx[i], y+dy[i], z+dz[i]])
				ary[z+dz[i]][x+dx[i]][y+dy[i]] = -2
	if que :
		bfs(ary)

cnt = 0

while True :
	flag = 0
	for z in range(end_z + 1) :
		for x in range(end_x + 1) :
			for y in range(end_y + 1) :
				if ary[z][x][y] == 0 :
					ary[z][x][y] = -2
					que.appendleft([x, y, z])
					bfs(ary)
	init(ary)
	cnt += 1
	if flag == 0 : break

for z in range(end_z + 1) :
	for x in range(end_x + 1) :
		for y in range(end_y + 1) :
			if ary[z][x][y] == 0 or ary[z][x][y] == -2 :
				print(-1)
				exit()

print(cnt - 1)
				
	
