from sys import stdin
import math

stdin = open("input.txt", "r")

end_num, cant_num = map(int, stdin.readline().split(' '))

cant = [int(stdin.readline()) for _ in range(cant_num)]

cant.sort()

lst_max = math.ceil((math.sqrt(end_num)) * 3 / 2)

stk = []

for cur in range(end_num, 1, -1) :
	if cant and cur == cant[-1] : 
		stk.append([])
		cant.pop()
		continue
	tmp = [0]
	max_range = end_num - cur
	if max_range > lst_max :
		max_range = lst_max
	for jump_cnt in range(1, max_range + 1) :
		if cur + jump_cnt == end_num :
			tmp.append(1)
		else :
			stk_len = len(stk[-jump_cnt])
			if stk_len >= jump_cnt :
				min_tmp = end_num
				if stk[-jump_cnt][jump_cnt - 1] != 0 :
					min_tmp = stk[-jump_cnt][jump_cnt - 1]
				if stk_len >= jump_cnt + 1 :
					if stk[-jump_cnt][jump_cnt] != 0 :
						min_tmp = min(min_tmp, stk[-jump_cnt][jump_cnt])
				if stk_len >= jump_cnt + 2 :
					if stk[-jump_cnt][jump_cnt + 1] != 0 :
						min_tmp = min(min_tmp, stk[-jump_cnt][jump_cnt + 1])
				if min_tmp == end_num :
					tmp.append(0)
				else : 
					tmp.append(min_tmp + 1)
			else : 
				tmp.append(0)
	stk.append(tmp)

last_len = len(stk[-1])
if last_len == 0 :
	flag = 1
elif last_len == 1 :
	print(1)
	exit()
elif last_len == 2 :
	if stk[-1][1] != 0 :
		print(stk[-1][1] + 1 )
		exit()
	else :
		flag = 1
else :
	tmp = end_num
	if stk[-1][1] != 0 :
		tmp = stk[-1][1]
	if stk[-1][2] != 0:
		tmp = min(tmp, stk[-1][2])
	if tmp == 0 :
		flag = 1
	else :
		print(tmp + 1)
		exit()

if flag == 1 :
	 print(-1)