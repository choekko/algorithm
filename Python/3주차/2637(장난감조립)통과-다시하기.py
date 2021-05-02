import sys
from collections import deque

sys.stdin = open("input.txt", "r")

node_cnt = int(sys.stdin.readline())
link_cnt = int(sys.stdin.readline())

adj_mat = [[0 for _ in range(node_cnt)] for i in range(node_cnt)]

in_cnt = [0 for _ in range(node_cnt + 1)]
out_stack = [[] for _ in range(node_cnt + 1)]
direct_need = [0 for _ in range(node_cnt + 1)]

for _ in range(link_cnt) :
	out_node, in_node, need = map(int, sys.stdin.readline().split())
	adj_mat[in_node - 1][out_node - 1] = need
	in_cnt[out_node] += 1
	out_stack[in_node].append(out_node)

for i in range(1, node_cnt + 1) :
	out_stack[i].sort()

# print(out_stack)

start_que = deque([])

for i, v in enumerate(in_cnt) :
	if v == 0 :
		start_que.append(i)

start_que.popleft() # 0 인덱스 제거

# print(start_que)

tmp_que = []

for i in range(0, len(start_que)) :
	start = start_que[i]
	for i in range(len(out_stack[start]) - 1, -1, -1) :
		pop = out_stack[start][i]
		tmp_que.append((start, pop, adj_mat[start - 1][pop - 1]))
	rst = 0
	while tmp_que :
		cur_node, out_node, need = tmp_que[-1]
		if direct_need[out_node] == 0 :
			if out_node == node_cnt : 
				direct_need[cur_node] = need + rst
				tmp_que.pop()
				rst = 0
			else :
				direct_need[cur_node] += rst
				for i in range(len(out_stack[out_node]) - 1, -1, -1) : 
					tmp_que.append((out_node, out_stack[out_node][i], adj_mat[out_node-1][out_stack[out_node][i]-1]))
					# print(tmp_que[-1])
				rst = 0
		else :
			rst += need * direct_need[out_node]
			if tmp_que[0] != tmp_que[-1] :
				if cur_node != tmp_que[-2][0] : 
					direct_need[cur_node] += rst
					tmp_que.pop()
					rst = 0
				else : 
					tmp_que.pop()
			else :
				tmp_que.pop()
			if not tmp_que : 
				direct_need[cur_node] += rst

# print(direct_need)

for i in range(len(start_que)) :
	print(start_que[i], direct_need[start_que[i]])

		
	
		



	

	