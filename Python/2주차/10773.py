import sys

sys.stdin = open("input.txt", "r")

num = int(sys.stdin.readline())


stack = []
for i in range(num) :
	tmp = int(sys.stdin.readline())
	if tmp != 0 :
		stack.append(tmp)
	else :
		stack.pop()


rst = 0
for i in range(len(stack)) :
	rst += stack[i]

print(rst)