import sys

nbr = int(sys.stdin.readline())

def pactorial(a : int, tmp : int):
	rst = tmp
	rst *= a
	if a == 0 : return 1
	if a == 1 :
		return rst
	rst = (pactorial(a-1, rst))
	return rst

print(pactorial(nbr, 1))