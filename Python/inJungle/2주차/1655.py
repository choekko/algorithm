import sys
from collections import deque
import heapq

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

min_heap = []
max_heap = []

for _ in range(num) :
	tmp = int(sys.stdin.readline())
	if len(min_heap) == len(max_heap) :
		heapq.heappush(max_heap, (-tmp, tmp))
	else :
		heapq.heappush(min_heap, tmp)
	if min_heap :
		if max_heap[0][1] > min_heap[0] :
			tmp_1 = max_heap[0][1]
			tmp_2 = heapq.heappop(min_heap)
			heapq.heappop(max_heap)
			heapq.heappush(max_heap, (-tmp_2, tmp_2))
			heapq.heappush(min_heap, tmp_1)
	print(max_heap[0][1])
