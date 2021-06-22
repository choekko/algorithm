import sys

sys.stdin = open("input.txt", "r")

stack = []

num = int(sys.stdin.readline())

lst = []
for i in range(num) :
	tmp = list(map(str, sys.stdin.readline().strip().split()))
	lst.append(tmp)
	tmp = []

for i in range(num) :
	if lst[i][0] == 'push' :
		stack.append(int(lst[i][1]))
	elif lst[i][0] == 'top' :
		if not stack :
			print(-1)
		else :
			print(stack[-1])
	elif lst[i][0] == 'size' :
		print(len(stack))
	elif lst[i][0] == 'pop' :
		if not stack : 
			print(-1)
		else :
			print(stack.pop())
	elif lst[i][0] == 'empty' :
		if not stack :
			print(1)
		else :
			print(0)