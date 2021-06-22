import sys

def triple(s : str, n : int) :
	for i in range(n) :
		print(s, end = '')

n_T = int(sys.stdin.readline())

a = []

for i in range(n_T) :
	a.append(list(sys.stdin.readline().split()))
	a[i][0] = int(a[i][0])

for i in range(n_T) :
	for t in range(len(a[i][1])) :
		triple(a[i][1][t], a[i][0])
	print()


