import sys

init = list(map(int, sys.stdin.readline().split()))
tmp = list(map(int, sys.stdin.readline().split()))

n = init[0]
x = init[1]

for i in range(n) :
	if tmp[i] < x :
		print(tmp[i], end = ' ') #통과하긴 했지만 사실 이렇게 하면 마지막에 공백이 생긴다