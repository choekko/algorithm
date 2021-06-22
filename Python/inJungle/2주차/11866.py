import sys
from collections import deque

sys.stdin = open("input.txt", "r")

nbr, seq = map(int, sys.stdin.readline().split())

de = deque()

for i in range(1, nbr + 1) :
	de.append(i)

print(de)

cnt = 0

print('<', end='')
idx = seq - 1
while cnt != nbr :
	if len(de) == 1 : break
	print(de[idx], end=', ')
	del de[idx]
	idx += seq - 1
	if idx > len(de) - 1 :
		while idx > len(de) - 1 :
			idx -= len(de)
print(de.pop(), end='')
print('>', end='')