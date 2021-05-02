import sys

size = int(sys.stdin.readline())
height = []
for_rainheight = []
for i in range(size) :
	height.append(list(map(int, sys.stdin.readline().strip().split(' '))))
	for_rainheight.extend(height[i])

tmp = set(for_rainheight)
for_rainheight = list(tmp)
max_height = max(for_rainheight)

def makeflag(height: list, size : int, rainHeight : int) : 
	flag = [[-1 for i in range(size + 2)] for j in range(size + 2)]
	for i in range(size) :
		for j in range(size) :
			# print(f'높이는 {height[i][j]}')
			if height[i][j] <= rainHeight : flag[i+1][j+1] = 1
			else : flag[i+1][j+1] = 0
		# print(flag[i])
	return flag


def is_value(a: list, b: list) :
	for i in range(len(a)) :
		if a[i] in b : return True
	return False 

def makelink(flag : list, size : int) :
	# print("------Makelist 시작------")
	linklist = []
	for i in range(1, size + 1) :
		for j in range(1, size + 1) :
			cnt = 0
			if flag[i][j] == 1 : continue
			if flag[i-1][j] == 0 : 
				linklist.append([(i-1-1) * size + j, (i-1) * size + j])
				cnt += 1
			if flag[i][j-1] == 0 : 
				linklist.append([(i-1) * size + j - 1, (i-1) * size + j])
				cnt += 1
			if flag[i+1][j] == 0 : 
				linklist.append([(i-1) * size + j, (i) * size + j])
				cnt += 1
			if flag[i][j+1] == 0 : 
				linklist.append([(i-1) * size + j, (i-1) * size + j + 1])
				cnt += 1
			if cnt == 0 :
				linklist.append([(i-1) * size + j])
	# print(f'링크된 것들 {linklist}')
	# print("------Makelist 종료------")
	return linklist
	
def howmany(lst : list) :
	# print("------Howmany 시작------")
	pl = 0
	pr = pl + 1
	while True :
		if pl >= len(lst) - 1 or len(lst) == 1: break
		while True :
			if pr == len(lst) : break
			if is_value(lst[pl], lst[pr]) : 
				tmp_pl = lst[pl]
				tmp_pr = lst[pr]
				tmp = list(set(tmp_pl + tmp_pr))
				while tmp_pl in lst : lst.remove(tmp_pl)
				while tmp_pr in lst : lst.remove(tmp_pr)
				lst.append(tmp)
				pr = pl + 1
				continue
			pr += 1
		pl += 1
		pr = pl + 1
	# print(f'안전영역만들기 {lst}')
	# print("------Howmany 종료------")
	return len(lst)

max_safe = 0
for i in for_rainheight :
max_safe = max(max_safe, howmany(makelink(makeflag(height, size, i), size)))
print(max_safe)

# print(howmany(makelink(flag, size)))