import sys
from collections import deque

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())

lst = [int(sys.stdin.readline()) for _ in range(num)]
if num == 1 :
	print(lst[0])
	exit()
elif num == 2 :
	print(lst[0] + lst[1])
	exit()

check = [[0, 0] for _ in range(num)]
#check[num][0] == 연속 계단 1개로 최대 점수
#check[num][1] == 연속 계단 2개로 최대 점수

check[0][0] = lst[0]

check[1][0] = lst[1]
check[1][1] = lst[1] + lst[0]

for i in range(2, num) :
	check[i][0] = max(check[i-2][0], check[i-2][1]) + lst[i]
	check[i][1] = check[i-1][0] + lst[i]

print(max(check[num-1][0], check[num-1][1]))