import sys
from collections import deque
from itertools import permutations

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

lst = []

for _ in range(num) :
	lst.append(list(map(int, sys.stdin.readline().split())))

lst.sort()

pl = 0
pr = num - 1
min_dis = 1000000

def lst_min(lst : list) :
	tmp_min = 10001
	tmp = list(permutations(lst, 2))
	for i in range(len(tmp)) :
		tmp_min = min(tmp_min, (tmp[i][0][0] - tmp[i][1][0])**2 + (tmp[i][0][1] - tmp[i][1][1])**2)

def howmany(pl : int, pr : int, lst : list) :
	global min_dis
	if pr - pl == 0 : return 0
	elif pr - pl == 1 : 
		return ((lst[pl][0] - lst[pr][0])**2 + (lst[pl][1] - lst[pr[1]])**2)
	pc = (pl + pr) // 2
	min_dis = min(howmany(pl, pc, lst), min_dis)
	min_dis = min(howmany(pc + 1, pr, lst), min_dis)
	tmp_pl = tmp_pr = pc 
	while lst[tmp_pl] <= lst[pc] - min_dis :
		tmp_pl -= 1
	tmp_pl += 1
	while lst[tmp_pr] >= lst[pc] + min_dis :
		tmp_pr += 1
	tmp_pr -= 1
	tmp = []
	for i in range(tmp_pl, tmp_pr + 1) :
		tmp.append(lst[i])
	tmp.sorted(key = lambda x : x[1])
	
