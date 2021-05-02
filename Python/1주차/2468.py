import sys
#from sys import *
from collections import deque

#setrecursionlimit(10 ** 6)
# sys.stdin = open("input.txt", "r")

size = 5
height = [
			[6, 8, 2, 6, 2],
			[3, 2, 3, 4, 6],
			[6, 7, 3, 3, 2],
			[7, 2, 5, 3, 6],
			[8, 9, 5, 2, 7]
]

# size = int(sys.stdin.readline())
# height = []
for_rainheight = [0, 2, 3, 4, 6, 7, 8, 9]
# for i in range(size) :
# 	height.append(list(map(int, sys.stdin.readline().strip().split(' '))))
# 	for_rainheight.extend(height[i])

# tmp = set(for_rainheight)
# for_rainheight = list(tmp)
# max_height = max(for_rainheight)

# num_ary = []
# for i in range(size) :
# 	for j in range(size) :


notvisit = deque([])

def makeflag(height: list, size : int, rainHeight : int) : 
	flag = [[0 for i in range(size)] for j in range(size)]
	for i in range(size) :
		for j in range(size) :
			# print(f'높이는 {height[i][j]}')
			if height[i][j] <= rainHeight : flag[i][j] = 1
		# print(flag[i])
	return flag

def bfs(x : int, y : int, flag : list) :
	flag[x][y] = 1
	nx = [1, -1, 0, 0]
	ny = [0, 0, 1, -1]
	for i in range(4) :
		if x+nx[i] == -1 or y+ny[i] == -1 or x+nx[i] == size or y+ny[i] == size : continue
		if flag[x+nx[i]][y+ny[i]] == 0 and not (x+nx[i], y+ny[i]) in notvisit : 
			notvisit.appendleft((x+nx[i], y+ny[i]))
	if notvisit :
		tu = notvisit.pop() 
		a = tu[0]
		b = tu[1]
		bfs(a, b, flag)

def howmany(flag : list) :
	cnt = 0
	for i in range(size) :
		for j in range(size) :
			if flag[i][j] == 1 : continue
			cnt += 1
			bfs(i, j, flag)
	return cnt

max_safe = 0
for i in for_rainheight :
	max_safe = max(max_safe, howmany(makeflag(height, size, i)))
print(max_safe)




