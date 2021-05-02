import sys


sys.stdin = open("input.txt", "r")

lst = list(sys.stdin.readline().strip())

lst.reverse()

cnt = len(lst)
tmp = []
value = 0
value_tmp = 0
rst = 0
while len(tmp) != cnt :
	if lst[-1] == '(' :
		tmp.append(lst.pop())
		value += 1
	elif lst[-1] == ')' :
		value -= 1
		if tmp[-1] == '(' :
			rst += value + value_tmp
			value_tmp = 0
		elif tmp[-1] == ')' :
			value_tmp += 1
		tmp.append(lst.pop())
rst += value_tmp
print (rst)



