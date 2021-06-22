import sys
sys.setrecursionlimit(10**6)

sys.stdin = open("input.txt", "r") 

num = int(sys.stdin.readline())

lst = [0] * 1000001

lst[1] = 1
lst[2] = 2

for i in range(3, num + 1) :
	lst[i] = (lst[i-1] + lst[i-2]) % 15746

print(lst[num])