import sys

tmp1 = sys.stdin.readline().strip()
tmp2 = sys.stdin.readline().strip()

def find(tmp1 : str, tmp2 : str) :
	i1 = 0
	i2 = 0
	cnt = 0
	rst_size = 0
	idx = 0
	c = 0
	while (i1 < len(tmp1)) :
		while (i2 < len(tmp2)) :
			if tmp1[i1] == tmp2[i2] :
				while i2 < len(tmp2) and i1 + c < len(tmp1) and tmp1[i1 + c] == tmp2[i2] :
					cnt += 1
					i2 += 1
					c += 1
				if cnt >= rst_size : 
					rst_size = cnt
					idx = i2 - cnt
			i2 = i2 - cnt + 1
			cnt = 0
			c = 0
		i1 += 1
		i2 = 0
	lst = [rst_size, idx]
	return lst

lst = find(tmp1, tmp2)
print(lst[0])
a = lst[1]
while lst[1] < (a + lst[0]) :
	print(tmp2[lst[1]], end = '')
	lst[1] += 1


