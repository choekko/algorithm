import itertools
import sys
from itertools import chain
from collections import deque

sys.stdin = open("input.txt", "r")

cnt, del_cnt = map(int, sys.stdin.readline().split())

nbr = list(sys.stdin.readline().strip())

tmp_lst = []
del_cnt_tmp = del_cnt
for i in range(10) :
	tmp_lst.append([])

for i in range(cnt - 1, -1, -1) :
	tmp_lst[int(nbr[i])].append(i)

# print(tmp_lst)

# for i in range(len(tmp_lst)) :
# 	if not tmp_lst[i] : continue 
# 	else :
# 		while tmp_lst[i] and del_cnt_tmp != 0 :
# 			tmp_lst[i].pop()
# 			del_cnt_tmp -= 1
# 	if del_cnt_tmp == 0 : break

rst = []

pr = 0 
pl = del_cnt
i = 0
while i != cnt - del_cnt :
	# print("--")
	for j in range(9, -1, -1) :
		if not tmp_lst[j] : continue
		# print(f'tmp:{tmp_lst}')
		# print(f'{tmp_lst[j][-1]}')
		# print(f'pr = {pr}, pl = {pl}')
		for k in range(len(tmp_lst[j]) - 1, -1, -1) :
			if pr <= tmp_lst[j][k] <= pl :
				rst.append(tmp_lst[j][k])
				del tmp_lst[j][k]
				pr = rst[-1]
				pl = pl + 1
				flag = 1
				break
		if flag == 1 :
			flag = 0
			break
	i += 1

# print(rst)

for i in range(cnt - del_cnt) :
	print(nbr[rst[i]], end = '')

