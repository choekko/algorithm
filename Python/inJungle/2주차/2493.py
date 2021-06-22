import sys
from collections import deque

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

lazortop = list(map(int, sys.stdin.readline().split()))

tmp_idx = deque()
rst = [0] * num 
for i in range(num - 1, 0, -1) :
	tmp_idx.append(i)
	for j in range(len(tmp_idx)) :
		if lazortop[tmp_idx[-1]] < lazortop[i - 1] :
			rst[tmp_idx.pop()] = i
		else : break

for i in range(num) :
	print(rst[i], end = ' ')