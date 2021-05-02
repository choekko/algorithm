import sys

# sys.stdin = open("input.txt", "r")

height_ary = []

while True :
	a = list(map(int, sys.stdin.readline().split()))
	if a == [0] : break
	else :
		del a[0]
		print(a)
		height_ary.append(a)

cnt = 0

def maketree(height_ary_i : list) :
	global cnt
	tmp = len(height_ary_i)

	while 2**cnt < tmp :
		cnt += 1 

	# print(cnt)
	tree = [-1] * (2**cnt) * 2
	# print(tree)
	for i in range(len(height_ary_i)) :
		tree[2**cnt+i] = i
	for i in range(2**cnt - 1, 0, -1) :
		if tree[i*2] == -1 or tree[i*2+1] == -1 : continue
		if height_ary_i[tree[i * 2]] <= height_ary_i[tree[i*2+1]] :
			tree[i] = tree[i*2]
		else :
			tree[i] = tree[i*2 + 1]
	return tree

ret = 1000000001
min_idx = -1

def query(tree : list, pl : int, pr : int, height_ary_i : list) :
	global min_idx
	global ret
	if pl == pr :
		if ret > height_ary_i[tree[pl]] :
			ret = height_ary_i[tree[pl]]
			min_idx = tree[pl]
	if pl % 2 == 1 :
		if ret > height_ary_i[tree[pl]] :
			ret = height_ary_i[tree[pl]]
			min_idx = tree[pl]
		pl += 1
	if pr % 2 == 0 :
		if ret > height_ary_i[tree[pr]] :
			ret = height_ary_i[tree[pr]]
			min_idx = tree[pr]
		pr -= 1
	if pl > pr : return
	pl = pl // 2 
	pr = pr // 2
	query(tree, pl, pr, height_ary_i)

# print(height_ary[1])

# query(maketree(height_ary[1]), 2**cnt + 0, 2**cnt + 0, height_ary[1])


def getmax(start : int, end : int, height_ary_i : list, tree : list) :
	# print(tree)
	global ret
	global min_idx
	global cnt
	query(tree, 2**cnt + start, 2**cnt + end, height_ary_i)
	m = min_idx
	# print(m)
	area = (end - start + 1) * height_ary_i[m]
	# print(f'아리아 {area}')

	if start <= m - 1 :
		min_idx = -1
		ret = 1000000001
		tmp = getmax(start, m - 1, height_ary_i, tree)
		area = max(area, tmp)
		
	
	if m + 1 <= end :
		min_idx = -1
		ret = 1000000001
		tmp = getmax(m + 1, end, height_ary_i, tree)
		area = max(area, tmp)
	
	return area

ret = 1000000001
min_idx = -1
cnt = 0
for i in range(len(height_ary)) :
	print(getmax(0, len(height_ary[i]) - 1, height_ary[i], maketree(height_ary[i])))
	cnt = 0
	ret = 1000000001
	min_idx = -1


