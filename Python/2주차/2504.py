import sys
from collections import deque

sys.stdin = open("input.txt", "r")

lst = list(sys.stdin.readline().strip())

print(lst)

stack = deque()
def is_vps(lst : list) :
	for _ in range(len(lst)) :
		if lst[-1] == ')' :
			stack.appendleft(-2)
			lst.pop()
		elif lst[-1] == ']' :
			stack.appendleft(-3)
			lst.pop()
		elif lst[-1] == '(' :
			if -2 in stack :
				if stack[0] > 0 :
					tmp = 0
					while stack[0] > 0 :
						tmp += stack.popleft()
					stack.appendleft(tmp)					
					stack.appendleft(2 * stack.popleft())
					stack.remove(-2)
				elif stack[0] == -2 :
					stack.popleft()
					stack.appendleft(2)
				lst.pop()
			else : return 0	
		elif lst[-1] == '[' :
			if -3 in stack :
				if stack[0] > 0 :
					tmp = 0
					while stack[0] > 0 :
						tmp += stack.popleft()
					stack.appendleft(tmp)
					stack.appendleft(3 * stack.popleft())
					stack.remove(-3)
				elif stack[0] == -3 :
					stack.popleft()
					stack.appendleft(3)
				lst.pop()
			else : return 0
	if -3 in stack or -2 in stack : return 0
	return sum(stack)

print(is_vps(lst))