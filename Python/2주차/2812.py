import sys
import copy

sys.stdin = open("input.txt", "r")

cnt, del_cnt = map(int, sys.stdin.readline().split())

nbr = list(sys.stdin.readline().strip())

nbr.reverse()

tmp_del = del_cnt
# print(nbr)
tmp_lst = []
while nbr :
	while tmp_lst and tmp_del != 0 and tmp_lst[-1] < nbr[-1] :
		tmp_lst.pop()
		tmp_del -= 1
	if len(tmp_lst) != cnt - del_cnt :
		tmp_lst.append(nbr.pop())
	else : nbr.pop()
	

print(''.join(tmp_lst))