from collections import deque

tmp = "abracadabra"
lst = []

for i in range(len(tmp)) :
 	lst.append(tmp[i:i+2])

str_idx = sorted(range(len(lst)),key=lst.__getitem__)
lst.sort()

g = [0]

cnt = 1
i = 1

while(cnt < len(lst)) :
	if lst[cnt] == lst[cnt-1] : 
		g.append(i - 1)
		cnt += 1
	else :
		g.append(i)
		i += 1
		cnt += 1
# print(f'첫 lst : {lst}')
# print(f'첫 str_idx : {str_idx}')
# print(f'첫 g : {g}')

len_g = len(g)
# print(len_g)
global d
d = 2
while d < len_g :
	for i in range(1, len_g) :
		x = -1
		y = -1
		if str_idx[i-1] + d < len_g  : x = str_idx.index(str_idx[i-1]+d)
		if str_idx[i] + d < len_g : y = str_idx.index(str_idx[i]+d)
		if x == -1 and y == -1 : continue
		if g[i-1] == g[i] :
			if y == -1 or g[x] > g[y] :
				str_idx[i-1], str_idx[i] = str_idx[i], str_idx[i-1]
				c = i
				while c < len_g :
					g[c] += 1
					c += 1
			elif x == -1 or g[x] < g[y] :
				c = i
				while c < len_g :
					g[c] += 1
					c += 1
	d *= 2
	print(d)
	print(str_idx)
	print(g)


def lcp_cnt(a : str, b : str) :
	i = 0
	cnt = 0
	while (i < len(a) and i < len(b)) :
		if (a[i] == b[i]) : cnt += 1
		else : break
		i += 1
	return (cnt)

lcp = []
for i in range(len_g - 1) :
	lcp.append(lcp_cnt(tmp[str_idx[i]:], tmp[str_idx[i+1]:]))
	i += 1
rst1 = deque(lcp)
rst1.appendleft(x)
print(f'결과 str_idx : {str_idx}')
print(f'결과 g : {g}')
print(f'lcp : {lcp}')
	
