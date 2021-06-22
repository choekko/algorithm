from sys import stdin

stdin = open("input.txt", "r")

num = int(stdin.readline())

ary = [[0] * num for _ in range(10)]


for i in range(10) :
	ary[i][0] = 1

for j in range(1, num) :
	for k in range(10):
		tmp = 0
		if k - 1 >= 0 :
			tmp += ary[k-1][j-1]
		if k + 1 < 10 :
			tmp += ary[k+1][j-1] 
		ary[k][j] = tmp


rst = 0
for w in range(1, 10) :
	rst += ary[w][num - 1]

print(rst%1000000000) 

