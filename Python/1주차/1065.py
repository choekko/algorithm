import sys

nbr = int(sys.stdin.readline())

if nbr <= 99 : print(nbr)

a = 100
cnt = 0

if 100 <= nbr :
	while a <= nbr :
		lst = [a//100, (a//10)%10, a%10]
		if lst[0]-lst[1] == lst[1]-lst[2] : cnt += 1
		a += 1
		if a == 1000 : break
	print(cnt + 99)


