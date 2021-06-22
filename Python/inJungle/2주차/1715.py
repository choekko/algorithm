import sys
import heapq

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

if num == 1 :
	print(0)
	exit()

heap = []

for _ in range(num) :
	heapq.heappush(heap, int(sys.stdin.readline()))

tmp = 0

tmp_lst = []
while len(heap) != 0 :
	tmp += heapq.heappop(heap)
	if len(heap) != 0 :
		tmp += heapq.heappop(heap)
		if len(heap) != 0 :
			heapq.heappush(heap, tmp)
	tmp_lst.append(tmp)
	tmp = 0

print(sum(tmp_lst))