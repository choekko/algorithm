import sys

sys.stdin = open("input.txt", "r")

lst = []

num = int(sys.stdin.readline())

if num == 0 : 
	print('NO')
	exit()

for i in range(num) :
	lst.append(list(sys.stdin.readline().strip()))

print(lst)

stack = []
def is_vps(a : list) :
	if not a : return False
	while True :
		if a : 
			if a[-1] == ')' :
				stack.append(a.pop())
			else :
				if not stack : return False
				else :
					a.pop()
					stack.pop()
		elif not a and not stack : return True
		else : return False 

for i in range(num) : 
	if is_vps(lst[i]) == True :
		print('YES')
	else :
		print('NO')
	stack = []
