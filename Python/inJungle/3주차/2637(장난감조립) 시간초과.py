import sys
from collections import deque

sys.stdin = open("input.txt", "r")

node_cnt = int(sys.stdin.readline())
link_cnt = int(sys.stdin.readline())

adj_mat = [[0 for _ in range(node_cnt)] for i in range(node_cnt)]

in_cnt = [0 for _ in range(node_cnt + 1)]
out_stack = [[] for _ in range(node_cnt + 1)]

for _ in range(link_cnt) :
	out_node, in_node, need = map(int, sys.stdin.readline().split())
	adj_mat[in_node - 1][out_node - 1] = need
	in_cnt[out_node] += 1
	out_stack[in_node].append(out_node)

start_que = deque([])

for i, v in enumerate(in_cnt) :
	if v == 0 :
		start_que.append(i)

start_que.popleft() # 0 인덱스 제거

print(start_que)

tmp_que = []

for i in range(len(start_que) - 1, -1 , -1) :
	start = start_que[i]
	for i in range(len(out_stack[start]) - 1, -1, -1) :
		pop = out_stack[start][i]
		tmp_que.append((start, pop, adj_mat[start - 1][pop - 1]))

print(tmp_que)


cur_nbr = tmp_que[-1][0]
rst = 0
while True :
	start, cur_node, need = tmp_que.pop()
	if cur_node == node_cnt and start == cur_nbr :
		rst += need 
		if not tmp_que :
			print(start, rst)
			break
		continue 
	if start != cur_nbr :
		print(cur_nbr, rst)
		cur_nbr = start
		rst = 0
	if cur_node == node_cnt :
		rst += need 
		continue
	for i in range(len(out_stack[cur_node]) - 1, -1, -1) :
		pop = out_stack[cur_node][i]
		tmp_que.append((start, pop, need * adj_mat[cur_node - 1][pop - 1]))
		



	

	