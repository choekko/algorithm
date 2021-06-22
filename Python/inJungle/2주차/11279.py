import sys
from collections import deque
import heapq

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

heap = []

for _ in range(num) :
	tmp = int(sys.stdin.readline())
	if tmp == 0 :
		if not heap : print(0)
		else :
			print(heapq.heappop(heap)[1])
	else :
		heapq.heappush(heap, (-tmp, tmp))