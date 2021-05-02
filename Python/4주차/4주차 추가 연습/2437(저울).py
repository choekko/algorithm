import sys
from collections import deque

sys.stdin = open("input.txt", "r") 

num = int(sys.stdin.readline())

lst = list(map(int, sys.stdin.readline().split()))

lst.sort()

lst = deque(lst)

if lst[0] != 1 : 
	print(1)
	exit()

max_tmp = lst.popleft()

while True : 
	flag = 0
	if not lst : break
	if lst[0] == max_tmp + 1 :
		max_tmp += lst.popleft()
		continue
	while lst[0] <= max_tmp :
		flag = 1
		max_tmp += lst.popleft()
		if not lst : break
	if flag == 0 : break
	
print(max_tmp + 1)

