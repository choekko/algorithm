import sys

tmp = [0] * 10001

input = sys.stdin.readline

num = int(input())

for i in range(num) :
	tmp[int(input()) + 1000000] += 1

for i in range(1, 10001) :
	for j in range(tmp[i]) : 
		rst = i - 1000000
		print(rst)