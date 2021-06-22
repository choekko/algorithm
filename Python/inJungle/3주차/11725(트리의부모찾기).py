import sys
import copy
from collections import deque

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

c_N_e = [[0, [0], 0] for _ in range(num + 1)]
#[nbr][0] : check
#[nbr][1] : edge_stack
#[nbr][2] : parent

for _ in range(1, num) :
	a, b = map(int, sys.stdin.readline().split())
	c_N_e[a][1].append(b)
	c_N_e[b][1].append(a)

print(c_N_e)

def dfs() :
	stack = [1]
	c_N_e[1][0] = 1
	while True :
		if c_N_e[stack[-1]][1][-1] != 0 and not c_N_e[c_N_e[stack[-1]][1][-1]][0] == 1 :
			nbr = c_N_e[stack[-1]][1].pop()
			c_N_e[nbr][2] = stack[-1]
			c_N_e[nbr][0] = 1
			stack.append(nbr)
		elif c_N_e[c_N_e[stack[-1]][1][-1]][0] == 1 :
			c_N_e[stack[-1]][1].pop()
		else :
			stack.pop()
			if not stack : return

print(c_N_e)
dfs()

for i in range(2, num + 1) :
	print(c_N_e[i][2])

