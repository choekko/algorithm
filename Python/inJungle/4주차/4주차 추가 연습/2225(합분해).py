from sys import stdin

stdin = open("input.txt", "r") 

max_num, num_cnt = map(int, stdin.readline().split(' '))

ary = [[0] * (num_cnt + 1) for _ in range(max_num + 1)]

for i in range(max_num + 1) :
	ary[i][1] = 1

for i in range(1, num_cnt + 1) :
	ary[0][i] = 1

for i in range(2, num_cnt + 1) :
	for j in range(1, max_num + 1) :
		tmp = 0
		for k in range(j + 1) :
			tmp += ary[k][i - 1]
		ary[j][i] = tmp

print(ary[max_num][num_cnt] % 1000000000)
