import sys

init = int(sys.stdin.readline())

a = [sys.stdin.readline() for i in range(1, init + 1)]

for i in range(0, init) :
	tmp = a[i].split()
	result = int(tmp[0]) + int(tmp[1])
	print(result)