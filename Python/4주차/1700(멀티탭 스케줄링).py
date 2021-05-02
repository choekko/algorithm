from sys import stdin
from collections import deque
import heapq

stdin = open("input.txt", "r")

tap_num, max_nbr = map(int, stdin.readline().split(' '))

check = [deque([]) for _ in range(max_nbr + 1)]

order = list(map(int, stdin.readline().split()))

for i in range(len(order)) :
	check[order[i]].append(i)

for i in range(max_nbr + 1) :
	check[i].append(max_nbr)

order.reverse()

multi_tap = []
heap = []

idx = 0
while True :
	tmp = order.pop()

	if check[tmp][0] == max_nbr :
		if tmp in multi_tap : 
			heapq.heappush(heap, (-max_nbr, tmp, multi_tap.index(tmp)))
		else : heapq.heappush(heap, (-max_nbr, tmp, idx))
	else :
		check[tmp].popleft()
		if tmp in multi_tap : 
			heapq.heappush(heap, (-check[tmp][0], tmp, multi_tap.index(tmp)))
		else : heapq.heappush(heap, (-check[tmp][0], tmp, idx))

	if not tmp in multi_tap :
		multi_tap.append(tmp)
		idx += 1 

	if len(multi_tap) == tap_num or not order:
		break

if not order :
	print(0)
	exit()

cnt = 0
while True :
	tmp = order.pop()

	if tmp in multi_tap :
		check[tmp].popleft()
		idx = multi_tap.index(tmp)

		if check[tmp][0] == max_nbr :
			heapq.heappush(heap, (-max_nbr, tmp, idx))
		else :
			heapq.heappush(heap, (-check[tmp][0], tmp, idx))

	else :
		tmp_check, tmp_tmp, tmp_idx  = heapq.heappop(heap)
		tmp_check = -tmp_check

		while check[tmp_tmp][0] != tmp_check :
			tmp_check, tmp_tmp, tmp_idx  = heapq.heappop(heap)
			tmp_check = -tmp_check

		multi_tap[tmp_idx] = tmp

		if check[tmp][0] == max_nbr :
			heapq.heappush(heap, (-max_nbr, tmp, tmp_idx))
		else :
			check[tmp].popleft()
			heapq.heappush(heap, (-check[tmp][0], tmp, tmp_idx))

		cnt += 1

	if not order :
		break


print(cnt)


