import sys

sys.stdin = open("input.txt", "r")

n_tree, n_want = map(int, sys.stdin.readline().split())

height_ary = list(map(int, sys.stdin.readline().split()))

height_ary.sort(reverse=True)



tmp = 0
tmp_list = []
for i in range(n_tree - 1) :
	tmp += (height_ary[i] - height_ary[i+1])*(i + 1)
	tmp_list.append(tmp)

tmp_cnt = 0
for i in range(len(tmp_list)) :
	if tmp_list[i] == 0 :
		tmp_cnt += 1

if tmp_cnt == len(tmp_list) :
	a = 0
	while True :
		if n_tree * a >= n_want : 
			print(a)
			break
		a += 1
	print(height_ary[0] - a)
	exit()


for i in range(len(tmp_list)) :
	if tmp_list[i] == n_want :
		if i == 0 :
			more_want = n_want - 0
			idx = 1
		else :
			more_want = 0
			idx = i + 2
		break
	if tmp_list[i] > n_want :
		if i == 0 :
			more_want = n_want - 0
		else :
			more_want = n_want - tmp_list[i-1] 
		idx = i + 1
		break

i = 0
while True :
	if idx * i >= more_want : 
		rowrow = i
		break
	i += 1

rst = height_ary[idx - 1] - rowrow 


print(rst)