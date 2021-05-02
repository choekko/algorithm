import sys

sys.stdin = open("input.txt", "r")

marble_cnt, compare_cnt = map(int, sys.stdin.readline().split())

cresendo = [[] for _ in range(marble_cnt + 1)]
decresendo = [[] for _ in range(marble_cnt + 1)]
cnt_ary = [[0] * 2 for _ in range(marble_cnt + 1)]

# print(visit_ary)

for _ in range(compare_cnt) :
	a, b = map(int, sys.stdin.readline().split())
	cresendo[b].append(a)
	decresendo[a].append(b)

# print(cresendo,"\n", decresendo)


for i in range(1, marble_cnt + 1) :
	stk = []

	visit_ary = [0] * (marble_cnt + 1)
	cnt = 0
	for value in cresendo[i] :
		if not visit_ary[value] :
			stk.append(value)
			cnt += 1
			visit_ary[value] = 1
	while stk :
		tmp = stk.pop()
		for value in cresendo[tmp] :
			if visit_ary[value] == 0 :
				stk.append(value)
				cnt += 1
				visit_ary[value] = 1
	cnt_ary[i][1] = cnt 

	visit_ary = [0] * (marble_cnt + 1)
	cnt = 0
	for value in decresendo[i] :
		if not visit_ary[value] :
			stk.append(value)
			cnt += 1
			visit_ary[value] = 1
	while stk :
		tmp = stk.pop()
		for value in decresendo[tmp] :
			if visit_ary[value] == 0 :
				stk.append(value)
				cnt += 1
				visit_ary[value] = 1
	cnt_ary[i][0] = cnt 

# print(cnt_ary)

rst = 0

for i in range(1, marble_cnt + 1) :
	if cnt_ary[i][1] >= (marble_cnt + 1) // 2  :
		rst += 1
	if cnt_ary[i][0] >= (marble_cnt + 1) // 2 :
		rst += 1
print(rst)

