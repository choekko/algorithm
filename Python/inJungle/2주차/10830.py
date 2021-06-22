import sys

sys.stdin = open("input.txt", "r")

size, cnt = map(int, sys.stdin.readline().split())

ary = []

for i in range(size) :
	ary.append(list(map(int, sys.stdin.readline().split())))

def ary_divi(size : int, ary : list, divi_num : int) :
	for i in range(size) :
		for j in range(size) :
			ary[i][j] %= divi_num
	return ary

def ary_multi(ary1 : list, ary2 : list,  size: int) :
	tmp = []
	for i in range(size) :
		tmp.append([0] * size)
	for i in range(size) :
		for j in range(size) :
			for k in range(size) :
				tmp[i][j] += ary1[i][k] * ary2[k][j]
	return tmp

					

def ary_pow(cnt : int, ary : list, size : int) :
	if cnt == 1 :
		return ary_divi(size, ary, 1000)
	else :
		tmp = ary_pow(cnt//2, ary, size)
	if cnt % 2 == 0 :
		return ary_divi(size, ary_multi(tmp, tmp, size), 1000)
	else :
		return ary_divi(size, ary_multi(ary_multi(tmp, tmp, size), ary, size), 1000)

rst = ary_pow(cnt, ary, size)

for i in range(size) :
	for j in range(size) :
		print(rst[i][j], end=' ')
	print('')
