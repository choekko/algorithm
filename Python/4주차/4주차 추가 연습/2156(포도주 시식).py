from sys import stdin

stdin = open("input.txt", "r") 

num = int(stdin.readline())

lst = list(int(stdin.readline()) for _ in range(num))

dp = []

dp.append(lst[0])
dp.append(lst[0]+lst[1])
dp.append(max(lst[0]+lst[2], lst[0]+lst[1], lst[1]+lst[2]))

for i in range(3, num) :
	dp.append(max(dp[-1], lst[i] + lst[i-1] + dp[-3], lst[i] + dp[-2]))

print(dp[-1])