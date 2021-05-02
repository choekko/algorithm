import sys
import heapq

sys.stdin = open("input.txt", "r")

where_num = int(sys.stdin.readline())

where_lst = []

for _ in range(where_num) :
	tmp = list(map(int, sys.stdin.readline().split()))
	if tmp[0] > tmp[1] :
		tmp[0], tmp[1] = tmp[1], tmp[0]
	where_lst.append(tmp)

where_lst = sorted(where_lst, key = lambda x : x[1])

length = int(sys.stdin.readline())


heap = []
i = 0
possible_max = 0
while i < where_num :
	cur_train = where_lst[i][1]
	heapq.heappush(heap, where_lst[i][0])
	while heap and heap[0] < cur_train - length :
		heapq.heappop(heap)
	possible_max = max(possible_max, len(heap))
	i += 1 

print(possible_max)

