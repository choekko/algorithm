import sys
from sys import *
from collections import deque

setrecursionlimit(10 ** 6)

sys.stdin = open("input.txt", "r")

size = int(sys.stdin.readline())
height = []
for_rainheight = [0]
for i in range(size) :
	height.append(list(map(int, sys.stdin.readline().strip().split(' '))))
	for_rainheight.extend(height[i])

tmp = set(for_rainheight)
for_rainheight = list(tmp)
max_height = max(for_rainheight)

# num_ary = []
# for i in range(size) :
# 	for j in range(size) :


def makeflag(height: list, size : int, rainHeight : int) : 
	flag = [[-1 for i in range(size + 2)] for j in range(size + 2)]
	for i in range(size) :
		for j in range(size) :
			# print(f'높이는 {height[i][j]}')
			if height[i][j] <= rainHeight : flag[i+1][j+1] = 1
			else : flag[i+1][j+1] = 0
		# print(flag[i])
	return flag

global cnt
cnt = 0
visit = deque([])
val = 0

def howmany(flag : list, a : int, b : int) :
	global cnt
	global val
	if [a, b] in visit : 
		visit.append(-1)
		return
	if flag[a][b] == -1 or flag[a][b] == 1 : 
		visit.append(-1)
		return
	val = 1
	visit.append([a, b])
	howmany(flag, a + 1, b)
	if visit[-1] == -1 : visit.pop()
	howmany(flag, a - 1, b)
	if visit[-1] == -1 : visit.pop()
	howmany(flag, a, b + 1)
	if visit[-1] == -1 : visit.pop()
	howmany(flag, a, b - 1)
	if visit[-1] == -1 : visit.pop()


max_safe = 0
for rain in for_rainheight :
	flag = makeflag(height, size, rain)
	i = 1
	j = 1
	while flag[i][j] != -1 :
		while flag[i][j] != -1 :
			howmany(flag, i, j)
			if val == 1 : cnt += 1
			val = 0
			j += 1
		j = 1
		i += 1
	max_safe = max(max_safe, cnt)
	cnt = 0
	visit = deque([])

print(max_safe)