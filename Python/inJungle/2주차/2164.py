import sys
from collections import deque

sys.stdin = open("input.txt", "r")

nbr = int(sys.stdin.readline())


de = deque()

for i in range(1, nbr + 1) :
	de.appendleft(i)

while len(de) != 1 :
	de.pop()
	de.appendleft(de.pop())

print(de[0])