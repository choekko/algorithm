import sys
import copy
from collections import deque

sys.stdin = open("input.txt", "r")

num, want = map(int, sys.stdin.readline().split())

value = []
for _ in range(num) :
	value.append(int(sys.stdin.readline()))


check = [0 for _ in range(want + 1)]
value = set(value)
# print(value)


tmp = deque()

for _ in value :
	if _ > want : continue
	tmp.append([_, 1])
	check[_] = 1

# print(tmp)

flag =  0
while tmp :
	nbr, cnt = tmp.pop()
	if nbr == want :
		flag = 1
		break
	
	for coin in value : 
		if nbr + coin > want : continue
		if check[nbr+coin] == 1 : continue
		else :
			check[nbr+coin] = 1
			tmp.appendleft([nbr+coin, cnt + 1])

if flag == 1 : print(cnt)
else : print(-1)

