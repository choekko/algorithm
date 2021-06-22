from sys import stdin

stdin = open("input.txt", "r")

num = int(stdin.readline())

nbr = []

a, b = map(int, stdin.readline().split(' '))
nbr.append(a)
nbr.append(b)

for _ in range(num - 1) :
	a, b = map(int, stdin.readline().split(' '))
	nbr.append(b)

ary = [[0] * num for _ in range(num)]

for distance in range(1, num) :
	
	for start in range(num - 1) :
		end = start + distance
		if end > num - 1 :
			continue

		tmp = 2**31 - 1
		for k in range(start, end) :
			tmp_tmp = ary[start][k] + ary[k+1][end] + nbr[start]*nbr[k+1]*nbr[end + 1]
			tmp = min(tmp, tmp_tmp)

		ary[start][end] = tmp 

print(ary[0][num - 1])



