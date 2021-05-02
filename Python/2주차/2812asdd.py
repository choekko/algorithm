from collections import deque
import sys

sys.stdin = open("input.txt", "r")

cnt, del_cnt = map(int, sys.stdin.readline().split())

nbr_str = sys.stdin.readline().strip()

nbr = []
for i in range(cnt) :
	nbr.append(int(nbr_str[i]))

de = deque()

de.appendleft(nbr.pop())
tmp = [de[-1]]

for i in range(cnt - del_cnt - 1) :
	de.appendleft(nbr.pop())
	if de[0] < de[1] :
		tmp.append(de[0])

print(tmp)

while nbr :
	tmp = nbr.pop()
	if tmp > de[0] :
		de.appendleft(tmp)
		if de[-2] > de[-1] : de.pop()
		else : del de[-2]

print(de)
