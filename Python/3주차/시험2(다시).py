import sys
from collections import deque

sys.stdin = open("input.txt", "r")

sis, bro = map(int, sys.stdin.readline().split())

if bro <= sis : 
	print(sis - bro)
	exit()

check = [0 for _ in range(100001)]
check[sis] = 1

tmp = deque([(sis, 0)])


while tmp :
	sis, cnt = tmp.pop()
	if sis == bro:
		break

	if sis < bro and sis + 1 < 100001 and check[sis+1] != 1  :
		check[sis+1] = 1
		tmp.appendleft((sis + 1, cnt + 1))
	if 0 <= sis - 1 and check[sis-1] != 1 :
		check[sis-1] = 1
		tmp.appendleft((sis - 1, cnt + 1))
	if sis < bro and sis * 2 <= 100001 and check[sis*2] != 1 :
		check[sis*2] = 1
		tmp.appendleft((sis * 2, cnt + 1))


print(cnt)
