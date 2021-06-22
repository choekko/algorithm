import sys
from collections import deque

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

lst = list(map(int, sys.stdin.readline().split()))

value = [1]
visit = [0]

if num == 1 :
	print(1)
	exit()

for i in range(num-2, -1, -1) :
	for j in range(i + 1, num) :
		if lst[j] > lst[i] : 
			 visit.append(value[num - 1 - j])
	value.append(max(visit) + 1)
	visit = [0]

print(value)
print(max(value))
		
	