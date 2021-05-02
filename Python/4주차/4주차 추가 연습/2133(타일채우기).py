from sys import stdin

stdin = open("input.txt", "r") 

num = int(stdin.readline())

if num % 2 == 1 :
	print(0)
	exit()

def solve(num) :
	lst = [3]
	for i in range(1, num//2) :
		rst = 3 * lst[-1]
		for j in range(i - 1) :
			rst += 2 * lst[j]
		lst.append(rst + 2)
	print(lst[-1])			

solve(num)
		
