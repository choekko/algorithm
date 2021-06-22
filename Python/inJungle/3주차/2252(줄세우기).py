import sys
from collections import deque

sys.stdin = open("input.txt", "r")

node_cnt, link_cnt = map(int, sys.stdin.readline().split())

solve_lst = [[0, []] for _ in range(node_cnt + 1)]
#solve_lst[nbr][0] : in_node_cnt
#solve_lst[nbr][1] : out_node_stack

for _ in range(link_cnt) :
	a, b = map(int, sys.stdin.readline().split())
	solve_lst[a][1].append(b)
	solve_lst[b][0] += 1

is_Zeroin = deque([])

def topological() :
	for i in range(1, node_cnt + 1) :
		if solve_lst[i][0] == 0 :
			is_Zeroin.append(i)

	while True :
		tmp = is_Zeroin.popleft()
		print(tmp, end=' ')
		while solve_lst[tmp][1] :
			tmp_tmp = solve_lst[tmp][1].pop()
			solve_lst[tmp_tmp][0] -= 1 
			if solve_lst[tmp_tmp][0] == 0 :
				is_Zeroin.append(tmp_tmp)
		if not is_Zeroin :
			return

topological()


