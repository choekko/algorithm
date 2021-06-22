import sys

tmp = [0] * 10001

input = sys.stdin.readline

num = int(input())

for i in range(num) :
	tmp[int(input())] += 1

for i in range(1, 10001) :
	for j in range(tmp[i]) : print(i)